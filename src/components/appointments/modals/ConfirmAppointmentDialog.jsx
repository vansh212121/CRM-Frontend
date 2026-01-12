import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, CheckCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function ConfirmAppointmentModal({
  request,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}) {
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      setDate(undefined);
      setTime("");
      setNotes("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!date || !time) return;
    onConfirm({ date, time, notes: notes || undefined });
  };

  const isValid = date && time;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/10 p-2 border border-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-foreground">
                    Confirm Appointment
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                    Schedule appointment for patient request
                  </DialogDescription>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Patient Info Card */}
            {request && (
              <div className="rounded-lg border border-border/30 p-4 bg-muted/5">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 border border-accent/20 text-xs font-semibold text-accent">
                        {request.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {request.patientName}
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                          {request.email}
                        </p>
                      </div>
                    </div>
                    {request.preferences && (
                      <div className="mt-3 space-y-1">
                        <p className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-wide">
                          Patient Preferences
                        </p>
                        <p className="text-xs text-foreground leading-relaxed">
                          {request.preferences}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Inputs */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <CalendarIcon className="h-4 w-4 text-accent/70" />
                Schedule Details
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isLoading}
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal rounded-lg border-border/40 hover:border-accent/50",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "MMM d, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 rounded-lg border border-border/50"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Time *</Label>
                  <Select
                    value={time}
                    onValueChange={setTime}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="h-10 rounded-lg border-border/40 hover:border-accent/50">
                      <Clock className="mr-2 h-4 w-4 text-accent/70" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-border/50 h-48">
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot} className="text-sm">
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Admin Notes{" "}
                  <span className="text-xs text-muted-foreground/80 font-normal ml-1">
                    (Optional)
                  </span>
                </Label>
                <Textarea
                  placeholder="Add any internal notes about this appointment..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isLoading}
                  rows={2}
                  className="rounded-lg border-border/40 focus:border-accent/50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="h-10 rounded-lg border-border/40 hover:border-accent/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isLoading}
              className="h-10 rounded-lg bg-success hover:bg-success/90 transition-colors gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {isLoading ? "Confirming..." : "Confirm Appointment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, RefreshCw, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export function RescheduleModal({
  appointment,
  open,
  onOpenChange,
  onReschedule,
  isLoading,
}) {
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");

  // Pre-fill data
  useEffect(() => {
    if (appointment && open) {
      const isoString =
        appointment.appointment_date || appointment.confirmedDate;

      if (isoString) {
        const rawString = isoString
          .replace("Z", "")
          .replace(/\+\d{2}(:\d{2})?$/, "");

        const dateObj = new Date(rawString);

        setDate(dateObj);

        setTime(format(dateObj, "HH:mm"));
      }
    }
  }, [appointment, open]);

  const handleSubmit = () => {
    if (!date || !time) return;
    onReschedule({ date, time });
  };

  const isValid = date && time;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Reschedule Appointment
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                  Update schedule for{" "}
                  <strong>{appointment?.patientName}</strong>
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <RefreshCw className="h-4 w-4 text-accent/70" />
                New Schedule
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Date Picker */}
                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={isLoading}
                        className={cn(
                          "justify-start text-left font-normal h-10 rounded-lg border-border/40 hover:border-accent/50",
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

                {/* Time Select */}
                <div className="grid gap-2">
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
              className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isLoading ? "Updating..." : "Update Schedule"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

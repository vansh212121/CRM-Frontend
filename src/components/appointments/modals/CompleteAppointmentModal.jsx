import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function CompleteAppointmentModal({
  request,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}) {
  const [notes, setNotes] = useState("");

  const handleComplete = (e) => {
    e.preventDefault();
    onConfirm(notes);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden gap-0">
        {/* 1. Full-width Green Header Strip */}
        <div className="bg-green-50 border-b border-green-100 px-6 py-4 flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 border border-green-200 shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Mark as Complete
            </h2>
            <p className="text-sm text-muted-foreground">
              Finalize this appointment record
            </p>
          </div>
        </div>

        {/* 2. Main Content Area */}
        <div className="px-6 py-6 space-y-6">
          {/* Warning/Info Box */}
          <div className="rounded-lg border border-green-200 bg-green-50/50 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold text-foreground">
                Confirm Completion
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This will mark the appointment for{" "}
                <span className="font-medium text-foreground">
                  {request?.patientName || "this patient"}
                </span>{" "}
                as successfully completed. This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Optional Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="complete-notes" className="text-sm font-medium">
              Completion Notes
              <span className="text-xs text-muted-foreground font-normal ml-1">
                (Optional)
              </span>
            </Label>
            <Textarea
              id="complete-notes"
              placeholder="Add any final remarks regarding this appointment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
              className="resize-none focus-visible:ring-green-500/20"
              rows={3}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="button"
              // Pass the notes back to the parent handler
              onClick={handleComplete}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-600 gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {isLoading ? "Completing..." : "Complete Appointment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

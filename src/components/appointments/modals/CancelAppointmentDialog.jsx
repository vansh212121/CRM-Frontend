import { useState } from "react";
import { XCircle, AlertTriangle, User, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function CancelAppointmentDialog({
  request,
  open,
  onOpenChange,
  onConfirm, // Generic name to handle both Cancel and Reject
  isLoading, // ✅ Added Loading State
}) {
  const [reason, setReason] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!reason) return;
    onConfirm(reason);
    // Note: We do NOT clear reason or close here; Parent handles success/failure
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setReason("");
    }
  };

  const isValid = reason.trim().length > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 overflow-hidden sm:max-w-lg">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header - Preserved styling */}
          <div className="border-b border-destructive/20 bg-destructive/5 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2 border border-destructive/20">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <AlertDialogTitle className="text-lg font-semibold text-foreground">
                    Cancel Appointment
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                    Decline patient appointment request
                  </AlertDialogDescription>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClose}
                disabled={isLoading}
                className="h-8 w-8 rounded-lg hover:bg-destructive/10"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              {/* Patient Info Card - Preserved styling */}
              {request && (
                <div className="rounded-lg border border-border/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {request.patientName}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-muted-foreground/80">
                          {request.phone}
                        </span>
                        <span className="text-xs text-muted-foreground/80">
                          ID: {request.id.toString().slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Warning Message - Preserved styling */}
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">
                      This will notify the patient
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      Provide a reason that will be shared with the patient.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason Input */}
              <div className="space-y-2.5">
                <Label htmlFor="reason" className="text-sm font-medium">
                  Reason for Cancellation
                  <span className="text-xs text-muted-foreground/80 font-normal ml-1">
                    *
                  </span>
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Example: No availability at requested time, please try another slot..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={isLoading} // ✅ Disabled on load
                  className="min-h-[100px] rounded-lg border-border/40 focus:border-destructive/50 focus:ring-destructive/20 transition-all resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground/80">
                  This message will be included in the cancellation
                  notification.
                </p>
              </div>

              {/* Quick Reasons Badges */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground/80">
                  Common reasons:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "No availability",
                    "Center full",
                    "Specialist unavailable",
                    "Scheduling Conflict",
                  ].map((txt) => (
                    <Badge
                      key={txt}
                      variant="outline"
                      onClick={() => !isLoading && setReason(txt)}
                      className={`text-xs px-3 py-1 border-border/40 hover:border-destructive/30 hover:bg-destructive/5 cursor-pointer transition-colors ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {txt}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Integrated Loading State */}
          <div className="border-t border-border/30 px-6 py-4">
            <AlertDialogFooter className="flex items-center justify-between gap-3">
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  disabled={isLoading}
                  onClick={handleClose}
                  className="h-10 rounded-lg border-border/40 hover:border-accent/30 mt-0"
                >
                  Keep Appointment
                </Button>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button
                  onClick={handleConfirm}
                  disabled={!isValid || isLoading}
                  className="h-10 rounded-lg bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 shadow-sm hover:shadow transition-all gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {isLoading ? "Processing..." : "Confirm Cancellation"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

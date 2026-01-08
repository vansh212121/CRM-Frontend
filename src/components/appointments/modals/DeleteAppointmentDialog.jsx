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
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

export function DeleteAppointmentDialog({
  appointment,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}) {
  if (!appointment) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 overflow-hidden sm:max-w-md">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-destructive/20 bg-destructive/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2 border border-destructive/20">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <AlertDialogTitle className="text-lg font-semibold text-foreground">
                  Delete Record
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                  Permanently remove this appointment
                </AlertDialogDescription>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="rounded-lg border border-border/30 p-4 bg-muted/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Are you absolutely sure?
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    This action cannot be undone. This will permanently delete
                    the appointment record for{" "}
                    <strong>{appointment.patientName}</strong> from the
                    database.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4 flex justify-between gap-3">
            <AlertDialogCancel asChild>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="h-10 rounded-lg border-border/40 hover:border-accent/30"
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                onClick={() => onConfirm(appointment.id)}
                disabled={isLoading}
                className="h-10 rounded-lg bg-destructive hover:bg-destructive/90 transition-colors gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isLoading ? "Deleting..." : "Delete Record"}
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

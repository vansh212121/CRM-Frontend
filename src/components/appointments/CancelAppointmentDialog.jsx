// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// export function CancelAppointmentDialog({
//   appointment,
//   open,
//   onOpenChange,
//   onCancel,
// }) {
//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to cancel the appointment for{" "}
//             <strong>{appointment?.patientName}</strong>? This action cannot be
//             undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onCancel}
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//           >
//             Cancel Appointment
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }








import { XCircle, Calendar, User, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CancelAppointmentDialog({
  appointment,
  open,
  onOpenChange,
  onCancel,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
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
                    Confirm appointment cancellation
                  </AlertDialogDescription>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-lg hover:bg-destructive/10"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              {/* Appointment Info Card */}
              {appointment && (
                <div className="rounded-lg border border-border/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {appointment.patientName}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground/60" />
                          <span className="text-xs text-muted-foreground/80">
                            {appointment.confirmedDate ? new Date(appointment.confirmedDate).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-1 border-accent/30 text-accent bg-accent/10"
                        >
                          {appointment.confirmedTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Warning Message */}
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">
                      This action cannot be undone
                    </p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground/80">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        Appointment will be marked as cancelled
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        Patient will receive a cancellation notification
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        Time slot will become available for other patients
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Confirmation Prompt */}
              <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  <p className="text-sm font-medium text-foreground">
                    Please confirm cancellation
                  </p>
                </div>
                <p className="text-sm text-muted-foreground/80">
                  This will permanently cancel the appointment for <span className="font-medium text-foreground">{appointment?.patientName}</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4">
            <AlertDialogFooter className="flex items-center justify-between">
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="h-10 rounded-lg border-border/40 hover:border-accent/30"
                >
                  Keep Appointment
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={onCancel}
                  className="h-10 rounded-lg bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 shadow-sm hover:shadow transition-all"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}






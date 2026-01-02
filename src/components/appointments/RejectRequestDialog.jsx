// import { useState } from "react";
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
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// export function RejectRequestDialog({ request, open, onOpenChange, onReject }) {
//   const [reason, setReason] = useState("");

//   const handleReject = () => {
//     onReject(reason || undefined);
//     setReason("");
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Reject Request</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to reject the appointment request from{" "}
//             <strong>{request?.patientName}</strong>?
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <div className="my-4 grid gap-2">
//           <Label htmlFor="reason">Reason (Optional)</Label>
//           <Textarea
//             id="reason"
//             placeholder="Provide a reason for rejection..."
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             rows={3}
//           />
//         </div>

//         <AlertDialogFooter>
//           <AlertDialogCancel onClick={() => setReason("")}>
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             onClick={handleReject}
//             className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//           >
//             Reject Request
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }








































import { useState } from "react";
import { XCircle, AlertTriangle, User } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function RejectRequestDialog({ request, open, onOpenChange, onReject }) {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    onReject(reason || undefined);
    setReason("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setReason("");
  };

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
                    Reject Appointment Request
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
                className="h-8 w-8 rounded-lg hover:bg-destructive/10"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              {/* Patient Info Card */}
              <div className="rounded-lg border border-border/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                    <User className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {request?.patientName}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted-foreground/80">
                        {request?.phone}
                      </span>
                      <span className="text-xs text-muted-foreground/80">
                        ID: {request?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">
                      This will notify the patient their request was declined
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      Optionally provide a reason that will be shared with the patient.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason Input */}
              <div className="space-y-2.5">
                <Label htmlFor="reason" className="text-sm font-medium">
                  Reason for Rejection
                  <span className="text-xs text-muted-foreground/80 font-normal ml-1">
                    (Optional)
                  </span>
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Example: No availability at requested time, please try another slot..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[100px] rounded-lg border-border/40 focus:border-destructive/50 focus:ring-destructive/20 transition-all resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground/80">
                  This message will be included in the rejection notification.
                </p>
              </div>

              {/* Quick Reasons */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground/80">Common reasons:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="outline" 
                    onClick={() => setReason("No availability at requested time")}
                    className="text-xs px-3 py-1 border-border/40 hover:border-destructive/30 hover:bg-destructive/5 cursor-pointer transition-colors"
                  >
                    No availability
                  </Badge>
                  <Badge 
                    variant="outline" 
                    onClick={() => setReason("Center currently at full capacity")}
                    className="text-xs px-3 py-1 border-border/40 hover:border-destructive/30 hover:bg-destructive/5 cursor-pointer transition-colors"
                  >
                    Center full
                  </Badge>
                  <Badge 
                    variant="outline" 
                    onClick={() => setReason("Requested specialist not available")}
                    className="text-xs px-3 py-1 border-border/40 hover:border-destructive/30 hover:bg-destructive/5 cursor-pointer transition-colors"
                  >
                    Specialist unavailable
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4">
            <AlertDialogFooter className="flex items-center justify-between">
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="h-10 rounded-lg border-border/40 hover:border-accent/30"
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={handleReject}
                  className="h-10 rounded-lg bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 shadow-sm hover:shadow transition-all"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Request
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}






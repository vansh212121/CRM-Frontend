import { AlertTriangle, X, Trash2, Shield } from "lucide-react";
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

export function DeleteCenterDialog({ center, open, onOpenChange, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-destructive/20 bg-destructive/5 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2 border border-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <AlertDialogTitle className="text-lg font-semibold text-foreground">
                    Delete Center
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                    Confirm permanent deletion
                  </AlertDialogDescription>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 rounded-lg hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Warning Content */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              {/* Center Info Card */}
              <div className="rounded-lg border border-border/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {center?.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted-foreground/80">
                        {center?.district}
                      </span>
                      <span className="text-xs text-muted-foreground/80">
                        ID: {center?.id}
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
                      This action is permanent and cannot be undone
                    </p>
                    <ul className="space-y-1.5 text-sm text-muted-foreground/80">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        All center data will be permanently deleted
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        Associated appointments may be affected
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive/60 mt-1.5" />
                        Patients assigned to this center will need reassignment
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
                    Please confirm deletion
                  </p>
                </div>
                <p className="text-sm text-muted-foreground/80">
                  Type{" "}
                  <span className="font-mono text-destructive font-semibold">
                    DELETE
                  </span>{" "}
                  to confirm
                </p>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Type DELETE here"
                    className="w-full h-10 rounded-lg border border-border/40 focus:border-destructive/50 focus:ring-destructive/20 px-3 text-sm transition-all"
                    id="confirmation-input"
                  />
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
                  onClick={() => onOpenChange(false)}
                  className="h-10 rounded-lg border-border/40 hover:border-accent/30"
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={onConfirm}
                  className="h-10 rounded-lg bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 shadow-sm hover:shadow transition-all"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Center
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

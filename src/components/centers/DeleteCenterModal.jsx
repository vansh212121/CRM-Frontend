import { useState, useEffect } from "react";
import { AlertTriangle, X, Trash2, Building2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeleteCenterDialog({
  center,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}) {
  const [confirmText, setConfirmText] = useState("");

  // Reset input when modal opens/closes
  useEffect(() => {
    if (open) setConfirmText("");
  }, [open]);

  const isConfirmed = confirmText === "DELETE";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-0 overflow-hidden sm:max-w-[440px] gap-0">
        <div className="flex flex-col bg-card">
          {/* Header */}
          <div className="p-6 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="rounded-full bg-destructive/10 p-3 h-12 w-12 flex items-center justify-center shrink-0 border border-destructive/20">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div className="space-y-1">
                  <AlertDialogTitle className="text-lg font-semibold text-foreground">
                    Delete Center?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground text-sm">
                    This action cannot be undone. This will permanently delete
                    the center and remove its data from our servers.
                  </AlertDialogDescription>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 -mt-2 -mr-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Center Preview Card */}
          <div className="px-6 py-6">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-background p-2 border border-border/40 shadow-sm">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {center?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {center?.district || "No district specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Type <span className="font-bold text-destructive">DELETE</span>{" "}
                to confirm
              </label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="font-mono placeholder:font-sans"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 bg-muted/10 px-6 py-4">
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isLoading}
                className="border-border/40"
              >
                Cancel
              </AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={!isConfirmed || isLoading}
                onClick={onConfirm}
                className="gap-2"
              >
                {isLoading ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Center
                  </>
                )}
              </Button>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

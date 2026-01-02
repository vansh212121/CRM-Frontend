import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  X,
  Navigation,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CenterViewModal({ center, open, onOpenChange }) {
  if (!center) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-accent/15 to-purple-300/15 p-2.5 border border-accent/20">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-foreground">
                    {center.name}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground/80 mt-0.5">
                    Center Details
                  </p>
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-accent/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-6">
            {/* Status & Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    center.active ? "bg-success animate-pulse" : "bg-muted"
                  }`}
                />
                <Badge
                  variant={center.active ? "default" : "outline"}
                  className={`text-xs font-medium px-2.5 py-1 ${
                    center.active
                      ? "bg-gradient-to-r from-success/15 to-success/5 text-success border border-success/20"
                      : "bg-secondary/20 text-muted-foreground border-border/40"
                  }`}
                >
                  {center.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                {center.patientCount && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground/80">Patients</p>
                    <p className="text-base font-semibold text-foreground">
                      {center.patientCount}
                    </p>
                  </div>
                )}
                {center.appointmentCount && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground/80">
                      Appointments
                    </p>
                    <p className="text-base font-semibold text-accent">
                      {center.appointmentCount}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Location Card */}
            <div className="rounded-xl border border-border/30 bg-gradient-to-r from-card/50 to-card/30 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Location Details
                    </h3>
                    <span className="text-xs text-muted-foreground/80 font-mono bg-secondary/20 px-2 py-1 rounded">
                      PIN: {center.pincode}
                    </span>
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {center.district}
                  </p>
                  {center.address && (
                    <p className="text-sm text-muted-foreground/80 mt-2 flex items-start gap-1">
                      <Navigation className="h-3.5 w-3.5 text-accent/70 shrink-0 mt-0.5" />
                      {center.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Contact Information
              </h3>

              <div className="rounded-lg border border-border/30 p-3.5 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/80 mb-1">
                      Primary Email
                    </p>
                    <a
                      href={`mailto:${center.email}`}
                      className="text-sm text-foreground hover:text-accent hover:underline transition-colors"
                    >
                      {center.email}
                    </a>
                  </div>
                </div>
              </div>

              {center.phone && (
                <div className="rounded-lg border border-border/30 p-3.5 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <Phone className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground/80 mb-1">
                        Phone Number
                      </p>
                      <a
                        href={`tel:${center.phone}`}
                        className="text-sm text-foreground hover:text-accent hover:underline transition-colors"
                      >
                        {center.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Row */}
            {(center.patientCount || center.appointmentCount) && (
              <div className="grid grid-cols-2 gap-4">
                {center.patientCount && (
                  <div className="rounded-lg border border-border/30 p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                        <Users className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/80">
                          Total Patients
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {center.patientCount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {center.appointmentCount && (
                  <div className="rounded-lg border border-border/30 p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                        <Calendar className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/80">
                          Appointments Today
                        </p>
                        <p className="text-lg font-semibold text-accent">
                          {center.appointmentCount}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <h3 className="text-sm font-semibold text-foreground">
                  Additional Information
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground/80">Center ID</p>
                  <p className="font-mono text-foreground font-medium">
                    {center.id}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground/80">Created</p>
                  <p className="text-foreground font-medium">
                    {center.createdAt
                      ? new Date(center.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

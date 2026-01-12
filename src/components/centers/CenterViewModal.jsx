import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Navigation,
  Map,
  Stethoscope,
  Landmark,
  ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CenterViewModal({ center, open, onOpenChange }) {
  if (!center) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="flex flex-col max-h-[85vh] rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4 flex-shrink-0">
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
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1">
            <div className="px-6 py-5 space-y-6">
              {/* Services Section */}
              {center.services && center.services.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">
                      Available Services
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {center.services.map((service, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/10 text-accent hover:bg-accent/15 border-accent/20 px-2.5 py-1"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Card */}
              <div className="rounded-xl border border-border/30 bg-gradient-to-r from-card/50 to-card/30 overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20 shrink-0">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">
                          Location Details
                        </h3>
                        {center.pincode && (
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            PIN: {center.pincode}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-foreground font-medium">
                        {center.location || center.district}
                      </p>

                      {center.address && (
                        <p className="text-sm text-muted-foreground/90 flex items-start gap-1.5 mt-2">
                          <Navigation className="h-3.5 w-3.5 text-accent/70 shrink-0 mt-0.5" />
                          {center.address}
                        </p>
                      )}

                      {center.landmark && (
                        <p className="text-sm text-muted-foreground/80 flex items-center gap-1.5">
                          <Landmark className="h-3.5 w-3.5 text-accent/70 shrink-0" />
                          Near {center.landmark}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Google Maps Button */}
                  {center.google_map_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full h-9 border-border/40 hover:bg-accent/5 hover:text-accent group"
                      asChild
                    >
                      <a
                        href={center.google_map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Map className="mr-2 h-3.5 w-3.5 group-hover:text-accent transition-colors" />
                        View on Google Maps
                        <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Contact Information
                </h3>

                <div className="grid gap-3">
                  {/* Email */}
                  <div className="rounded-lg border border-border/30 p-3 hover:border-accent/30 transition-colors bg-card/50">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                        <Mail className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs text-muted-foreground/80 mb-0.5">
                          Email Address
                        </p>
                        <a
                          href={`mailto:${center.email}`}
                          className="text-sm text-foreground hover:text-accent hover:underline transition-colors truncate block"
                        >
                          {center.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  {center.contact && (
                    <div className="rounded-lg border border-border/30 p-3 hover:border-accent/30 transition-colors bg-card/50">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                          <Phone className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground/80 mb-0.5">
                            Contact Number
                          </p>
                          <a
                            href={`tel:${center.contact}`}
                            className="text-sm text-foreground hover:text-accent hover:underline transition-colors"
                          >
                            {center.contact}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Website / Clinic URL */}
                  {center.clinic_url && (
                    <div className="rounded-lg border border-border/30 p-3 hover:border-accent/30 transition-colors bg-card/50">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                          <Globe className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs text-muted-foreground/80 mb-0.5">
                            Website
                          </p>
                          <a
                            href={center.clinic_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-foreground hover:text-accent hover:underline transition-colors truncate block"
                          >
                            {center.clinic_url.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

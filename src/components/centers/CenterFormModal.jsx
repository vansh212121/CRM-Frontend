import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  PlusCircle,
  Save,
  MapPin,
  Globe,
  Stethoscope,
  Link as LinkIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CenterFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  isLoading,
}) {
  // --- STATE MANAGEMENT ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");

  const [clinicUrl, setClinicUrl] = useState("");
  const [services, setServices] = useState("");

  // --- POPULATE DATA ON EDIT ---
  useEffect(() => {
    if (initialData && open) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setContact(initialData.contact || "");

      setDistrict(initialData.district || "");
      setPincode(initialData.pincode || "");
      setLocation(initialData.location || "");
      setLandmark(initialData.landmark || "");
      setAddress(initialData.address || "");
      setGoogleMapUrl(initialData.google_map_url || "");

      setClinicUrl(initialData.clinic_url || "");
      setServices(
        Array.isArray(initialData.services)
          ? initialData.services.join(", ")
          : ""
      );
    } else if (!open) {
      // Reset
      setName("");
      setEmail("");
      setContact("");
      setDistrict("");
      setPincode("");
      setLocation("");
      setLandmark("");
      setAddress("");
      setGoogleMapUrl("");
      setClinicUrl("");
      setServices("");
    }
  }, [initialData, open]);

  // --- SUBMIT HANDLER ---
  const handleSubmit = () => {
    if (!name || !district || !email || !pincode) return;

    const servicesArray = services
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onSubmit({
      name,
      email,
      contact: contact || undefined,
      district,
      pincode,
      location: location || undefined,
      landmark: landmark || undefined,
      address: address || undefined,
      google_map_url: googleMapUrl || undefined,
      clinic_url: clinicUrl || undefined,
      services: servicesArray,
    });
  };

  const isValid =
    name && district && services && pincode && contact && address && location;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden flex flex-col h-[85vh]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col h-full bg-card"
        >
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold text-foreground">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                    {initialData
                      ? "Update center details"
                      : "Add a new medical center"}
                  </DialogDescription>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <ScrollArea className="flex-1">
            <div className="px-6 py-6">
              <div className="space-y-8">
                {/* 1. IDENTITY SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 uppercase tracking-wider">
                    Identity
                    <div className="h-px bg-border/40 flex-1 ml-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs font-medium uppercase text-muted-foreground"
                      >
                        Center Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="e.g., NeuroFlow Downtown Clinic"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 border-border/40 focus:border-accent/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="clinic@neuroflow.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-10 border-border/40 focus:border-accent/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="contact"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          Contact Number *
                        </Label>
                        <Input
                          id="contact"
                          placeholder="+1 (555) 000-0000"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="h-10 border-border/40 focus:border-accent/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. LOCATION SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 uppercase tracking-wider">
                    <MapPin className="h-4 w-4 text-accent" /> Location
                    <div className="h-px bg-border/40 flex-1 ml-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="district"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          District *
                        </Label>
                        <Input
                          id="district"
                          placeholder="e.g. Central"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="h-10 border-border/40 focus:border-accent/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="pincode"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          Pincode *
                        </Label>
                        <Input
                          id="pincode"
                          placeholder="10001"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="h-10 font-mono border-border/40 focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          Area / Location *
                        </Label>
                        <Input
                          id="location"
                          placeholder="e.g. Downtown"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="h-10 border-border/40 focus:border-accent/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="landmark"
                          className="text-xs font-medium uppercase text-muted-foreground"
                        >
                          Landmark
                        </Label>
                        <Input
                          id="landmark"
                          placeholder="e.g. Near Central Park"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          className="h-10 border-border/40 focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-xs font-medium uppercase text-muted-foreground"
                      >
                        Full Address *
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="123 Medical Plaza, Suite 400"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="min-h-[60px] resize-none border-border/40 focus:border-accent/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="googleMapUrl"
                        className="text-xs font-medium uppercase text-muted-foreground flex items-center gap-2"
                      >
                        <LinkIcon className="h-3 w-3" /> Google Map URL
                      </Label>
                      <Input
                        id="googleMapUrl"
                        placeholder="http://googleusercontent.com/maps..."
                        value={googleMapUrl}
                        onChange={(e) => setGoogleMapUrl(e.target.value)}
                        className="h-10 text-xs border-border/40 focus:border-accent/50"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. DIGITAL & SERVICES SECTION */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/90 uppercase tracking-wider">
                    <Globe className="h-4 w-4 text-accent" /> Digital & Services
                    <div className="h-px bg-border/40 flex-1 ml-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="clinicUrl"
                        className="text-xs font-medium uppercase text-muted-foreground flex items-center gap-2"
                      >
                        <LinkIcon className="h-3 w-3" /> Clinic Website URL
                      </Label>
                      <Input
                        id="clinicUrl"
                        placeholder="https://myclinic.com"
                        value={clinicUrl}
                        onChange={(e) => setClinicUrl(e.target.value)}
                        className="h-10 text-xs border-border/40 focus:border-accent/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="services"
                        className="text-xs font-medium uppercase text-muted-foreground flex items-center gap-2"
                      >
                        <Stethoscope className="h-3 w-3" /> Services *
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="services"
                          placeholder="MRI, CT Scan, X-Ray, Neurology Consultation..."
                          value={services}
                          onChange={(e) => setServices(e.target.value)}
                          className="min-h-[80px] resize-none border-border/40 focus:border-accent/50"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Separate services with commas (e.g. MRI, X-Ray)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Validation Hint (Restored!) */}
                <div className="rounded-lg border border-border/30 bg-muted/20 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isValid ? "bg-accent" : "bg-muted-foreground/60"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground/80">
                      {isValid
                        ? "Ready to submit"
                        : "Fill all required fields (*)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4 shrink-0 bg-card">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-10 rounded-lg border-border/40 hover:border-accent/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors"
              >
                {isLoading ? (
                  "Saving..."
                ) : initialData ? (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Update Center
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Center
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

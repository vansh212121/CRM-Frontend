import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, X, PlusCircle, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CenterFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
}) {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (initialData && open) {
      setName(initialData.name);
      setDistrict(initialData.district);
      setEmail(initialData.email);
      setPincode(initialData.pincode);
      setPhone(initialData.phone || "");
      setAddress(initialData.address || "");
    } else if (!open) {
      setName("");
      setDistrict("");
      setEmail("");
      setPincode("");
      setPhone("");
      setAddress("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (!name || !district || !email || !pincode) return;
    onSubmit({
      name,
      district,
      email,
      pincode,
      phone: phone || undefined,
      address: address || undefined,
    });
  };

  const isValid = name && district && email && pincode;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card shadow-sm"
        >
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4">
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
                      ? "Update center information"
                      : "Add a new medical center"}
                  </DialogDescription>
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

          {/* Form */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              {/* Center Name */}
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-sm font-medium">
                  Center Name <span className="text-accent">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., NeuroFlow Downtown Clinic"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
              </div>

              {/* Location Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label htmlFor="district" className="text-sm font-medium">
                    District <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="district"
                    placeholder="e.g., Central District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="pincode" className="text-sm font-medium">
                    Pincode <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="pincode"
                    placeholder="e.g., 10001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-10 rounded-lg border-border/40 focus:border-accent/50 font-mono"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Contact Email <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., clinic@neuroflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone{" "}
                  <span className="text-muted-foreground/80 text-xs">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="phone"
                  placeholder="e.g., +1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address{" "}
                  <span className="text-muted-foreground/80 text-xs">
                    (Optional)
                  </span>
                </Label>
                <Input
                  id="address"
                  placeholder="e.g., 123 Medical Plaza, Suite 400"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
              </div>

              {/* Validation Hint */}
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

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4">
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
                disabled={!isValid}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors"
              >
                {initialData ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Center
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Center
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

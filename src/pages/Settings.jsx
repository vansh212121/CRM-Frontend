import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Shield, 
  Lock, 
  LogOut, 
  Trash2, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff,
  Save,
  X,
  AlertTriangle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Chen",
    email: "sarah.chen@neuroflow.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "Neurology",
    notifications: true,
    twoFactor: false
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Delete account state
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleProfileUpdate = () => {
    console.log("Updating profile:", profile);
    // API call would go here
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Updating password");
    // API call would go here
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }
    console.log("Deleting account");
    // API call would go here
  };

  const handleLogout = () => {
    console.log("Logging out");
    // Logout logic here
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-muted-foreground/80">
                Manage your account preferences and security
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Settings</CardTitle>
                <CardDescription className="text-sm">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 p-2">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    activeSection === "profile"
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    activeSection === "security"
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveSection("danger")}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    activeSection === "danger"
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Danger Zone</span>
                </button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border/40 mt-6">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <Badge variant="outline" className="text-xs border-accent/30 text-accent bg-accent/10">
                      {profile.role}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      <span className="text-xs text-success">Active</span>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full h-9 rounded-lg border-border/40 hover:border-accent/30 hover:bg-accent/5 gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Middle Column - Active Section Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Section */}
            {activeSection === "profile" && (
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <User className="h-5 w-5 text-accent" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Update your personal and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="h-10 rounded-lg border-border/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-accent/70" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="h-10 rounded-lg border-border/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-accent/70" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="h-10 rounded-lg border-border/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-sm font-medium">
                        Department
                      </Label>
                      <Input
                        id="department"
                        value={profile.department}
                        onChange={(e) => setProfile({...profile, department: e.target.value})}
                        className="h-10 rounded-lg border-border/40"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Email Notifications</Label>
                          <p className="text-xs text-muted-foreground/80">
                            Receive updates about appointments and system alerts
                          </p>
                        </div>
                        <Switch
                          checked={profile.notifications}
                          onCheckedChange={(checked) => setProfile({...profile, notifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                          <p className="text-xs text-muted-foreground/80">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={profile.twoFactor}
                          onCheckedChange={(checked) => setProfile({...profile, twoFactor: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleProfileUpdate}
                      className="h-10 rounded-lg bg-accent hover:bg-accent/90 gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Lock className="h-5 w-5 text-accent" />
                    Update Password
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Change your account password for enhanced security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm font-medium">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                          className="h-10 rounded-lg border-border/40 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            className="h-10 rounded-lg border-border/40 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            className="h-10 rounded-lg border-border/40 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
                      <p className="text-sm font-medium text-foreground mb-2">Password Requirements</p>
                      <ul className="space-y-1 text-xs text-muted-foreground/80">
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
                          Minimum 8 characters
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
                          At least one uppercase letter
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
                          At least one number
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1" />
                          At least one special character
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handlePasswordUpdate}
                      className="h-10 rounded-lg bg-accent hover:bg-accent/90 gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Danger Zone Section */}
            {activeSection === "danger" && (
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-destructive">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Delete Account */}
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
                    <div className="flex items-start gap-3">
                      <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Delete Account</h3>
                        <p className="text-sm text-muted-foreground/80 mb-4">
                          Once you delete your account, there is no going back. All your data will be permanently removed.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">
                              Type <span className="font-mono text-destructive">DELETE</span> to confirm
                            </Label>
                            <Input
                              value={deleteConfirmation}
                              onChange={(e) => setDeleteConfirmation(e.target.value)}
                              placeholder="Type DELETE here"
                              className="h-10 rounded-lg border-destructive/40 focus:border-destructive/50"
                            />
                          </div>
                          <Button
                            onClick={handleDeleteAccount}
                            disabled={deleteConfirmation !== "DELETE"}
                            className="h-10 rounded-lg bg-gradient-to-r from-destructive to-destructive/90 hover:from-destructive/90 hover:to-destructive/80 gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logout Everywhere */}
                  <div className="rounded-lg border border-border/30 p-5">
                    <div className="flex items-start gap-3">
                      <LogOut className="h-5 w-5 text-accent mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Logout from All Devices</h3>
                        <p className="text-sm text-muted-foreground/80 mb-4">
                          This will log you out from all devices and invalidate all active sessions.
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleLogout}
                          className="h-10 rounded-lg border-border/40 hover:border-accent/30 hover:bg-accent/5 gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout Everywhere
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
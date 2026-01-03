import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Lock,
  LogOut,
  Trash2,
  Mail,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useChangeMyPasswordMutation,
  useDeleteMyAccountMutation,
  useGetMeQuery,
  useUpdateMyAccountMutation,
} from "@/features/api/userApi";
import { handleError } from "@/lib/handleError";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLogoutMutation } from "@/features/api/authApi";
import { selectRefreshToken } from "@/features/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const { data: currentUser, isLoading: isLoadingUser } = useGetMeQuery();
  // Profile state
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Delete account state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Logout
  const refreshToken = useSelector(selectRefreshToken);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

  // APIS
  const [updateMyProfile, { isLoading: isUpdatingProfile }] =
    useUpdateMyAccountMutation();
  const [changeMyPassword, { isLoading: isChangingPassword }] =
    useChangeMyPasswordMutation();
  const [deleteMyAccount, { isLoading: isDeleting }] =
    useDeleteMyAccountMutation();

  // Populate data
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  // --- Handlers ---
  const handleProfileInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  // Submit Methods
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const changedData = Object.keys(profileData).reduce((acc, key) => {
      if (profileData[key] !== currentUser[key]) acc[key] = profileData[key];
      return acc;
    }, {});

    if (Object.keys(changedData).length === 0) {
      toast.info("No profile changes to save.");
      return;
    }

    toast.promise(updateMyProfile(changedData).unwrap(), {
      loading: "Updating your profile...",
      success: "Profile updated successfully!",
      error: (err) => handleError(err, "Failed to update profile."),
    });
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match.");
      return;
    }
    const promise = changeMyPassword({
      current_password: passwordData.current_password,
      new_password: passwordData.new_password,
    }).unwrap();

    toast.promise(promise, {
      loading: "Changing your password...",
      success: () => {
        setPasswordData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        return "Password changed successfully! You are being logged out for security.";
      },
      error: (err) => handleError(err, "Failed to change password."),
    });
  };
  const handleDeleteAccount = async () => {
    try {
      await deleteMyAccount().unwrap();
      toast.success("Account deleted successfully!");
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Deactivation failed:", err);
      toast.error("Failed to delete account. Logging out locally.");
      setShowDeleteDialog(false);
    }
  };
  const handleLogout = () => {
    if (refreshToken) {
      const promise = logout({ refresh_token: refreshToken }).unwrap();

      toast.promise(promise, {
        loading: "Signing out...",
        success: () => {
          navigate("/login");
          return "You have been signed out successfully!";
        },
        error: () => {
          navigate("/login");
          return "Logout failed on the server, but you are now signed out.";
        },
      });
    }
  };

  // --- Loading State ---
  if (isLoadingUser) {
    return (
      <div className="p-8 flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

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
                <CardTitle className="text-lg font-semibold">
                  Settings
                </CardTitle>
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
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
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
                      disabled={isLoggingOut}
                      className="w-full h-9 rounded-lg border-border/40 hover:border-accent/30 hover:bg-accent/60 hover:text-white gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "Logging out..." : "Logout"}
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
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={handleProfileInputChange}
                          className="h-10 rounded-lg border-border/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium flex items-center gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5 text-accent/70" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileInputChange}
                          className="h-10 rounded-lg border-border/40"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="h-10 rounded-lg bg-accent hover:bg-accent/90 gap-2"
                      >
                        {isUpdatingProfile ? (
                          "Saving..."
                        ) : (
                          <div className="flex gap-2">
                            <Save className="h-4 w-4" /> Save Changes
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
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
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-sm font-medium"
                        >
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="current_password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            value={passwordData.current_password}
                            onChange={handlePasswordInputChange}
                            required
                            className="h-10 rounded-lg border-border/40 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="new_password"
                            className="text-sm font-medium"
                          >
                            New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="new_password"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.new_password}
                              onChange={handlePasswordInputChange}
                              placeholder="Enter new password"
                              required
                              className="h-10 rounded-lg border-border/40 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="confirm_password"
                            className="text-sm font-medium"
                          >
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirm_password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirm_password}
                              onChange={handlePasswordInputChange}
                              placeholder="Confirm new password"
                              required
                              className="h-10 rounded-lg border-border/40 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border/30 bg-muted/20 p-4">
                        <p className="text-sm font-medium text-foreground mb-2">
                          Password Requirements
                        </p>
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
                        type="submit"
                        disabled={isChangingPassword}
                        className="h-10 rounded-lg bg-accent hover:bg-accent/90 gap-2"
                      >
                        {isChangingPassword ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Changing...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Change Password
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Danger Zone Section */}
            {activeSection === "danger" && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible and destructive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Once you delete your account, there is no going back.
                        All your data will be permanently removed. Please be
                        certain.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Delete Account Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all of your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4">
              <Label htmlFor="delete-confirm" className="text-sm">
                Type <span className="font-mono font-bold">DELETE</span> to
                confirm
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="mt-2 focus-ring"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}

import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Building2,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { selectCurrentUser, selectRefreshToken } from "@/features/authSlice";
import { useLogoutMutation } from "@/features/api/authApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const navItems = [
  { to: "/appointments", label: "Appointments", icon: Calendar },
  { to: "/centers", label: "Centers", icon: Building2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

// Static user data
const mockUser = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@neuroflow.com",
  role: "Administrator",
  avatarBg: "bg-gradient-to-br from-accent to-purple-400",
};

export function AppSidebar() {
  const currentUser = useSelector(selectCurrentUser);
  const refreshToken = useSelector(selectRefreshToken);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar flex flex-col"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border/50 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-purple-300/20 border border-accent/30">
          <Brain className="h-5 w-5 text-accent" />
        </div>
        <div>
          <span className="text-lg font-semibold text-sidebar-foreground tracking-tight">
            NeuroFlow
          </span>
          <p className="text-xs text-sidebar-accent-foreground/60 -mt-0.5">
            Clinical
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <RouterNavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-accent/10 to-purple-300/10 border border-accent/20 text-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-foreground border border-transparent"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "h-4.5 w-4.5 transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </>
              )}
            </RouterNavLink>
          </motion.div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border/50 p-4">
        <div className="space-y-3">
          {/* User info */}
          <div className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white",
                mockUser.avatarBg
              )}
            >
              {getInitials(currentUser.name)}
            </div>

            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-sidebar-accent-foreground/70 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
                 text-destructive hover:bg-destructive/10 transition
                 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "Logging out..." : "Sign out"}
          </button>
        </div>

        {/* Status */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-sidebar-border/30 bg-sidebar/50 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-sidebar-accent-foreground/70">
            System operational
          </span>
        </div>
      </div>
    </motion.aside>
  );
}

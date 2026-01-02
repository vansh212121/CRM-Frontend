import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Building2,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Home,
  Activity,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
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
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </span>
                </>
              )}
            </RouterNavLink>
          </motion.div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border/50 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 hover:bg-sidebar-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring/30 border border-sidebar-border/40 hover:border-sidebar-border/60"
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-sm",
                  mockUser.avatarBg
                )}
              >
                {getInitials(mockUser.name)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {mockUser.name}
                </p>
                <p className="text-xs text-sidebar-accent-foreground/70 truncate">
                  {mockUser.role}
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-sidebar-foreground/40 transition-transform group-data-[state=open]:rotate-180" />
            </motion.button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="top"
            className="w-56 rounded-xl border border-sidebar-border bg-sidebar shadow-lg"
          >
            <div className="px-3 py-2.5 border-b border-sidebar-border/30">
              <p className="text-sm font-semibold text-sidebar-foreground">
                {mockUser.name}
              </p>
              <p className="text-xs text-sidebar-accent-foreground/70 mt-0.5">
                {mockUser.email}
              </p>
            </div>

            <div className="p-1">
              <DropdownMenuItem className="gap-2 cursor-pointer text-sm rounded-lg px-3 py-2.5 hover:bg-accent/10">
                <User className="h-4 w-4 text-accent" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer text-sm rounded-lg px-3 py-2.5 hover:bg-accent/10">
                <Settings className="h-4 w-4 text-accent" />
                Preferences
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-sidebar-border/30" />

            <div className="p-1">
              <DropdownMenuItem
                onClick={handleLogout}
                className="gap-2 cursor-pointer text-sm rounded-lg px-3 py-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Indicator */}
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

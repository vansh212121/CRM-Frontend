import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Building2,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Calendar,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function CentersTable({ centers, onView, onEdit, onDelete }) {
  if (centers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-accent/20 bg-gradient-to-br from-card to-card/50 p-12 backdrop-blur-sm"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple-300/10 blur-xl rounded-full" />
          <div className="relative rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 p-5 border border-accent/20">
            <Building2 className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          No centers yet
        </h3>
        <p className="text-sm text-muted-foreground/80 text-center max-w-sm">
          Start by adding your first clinical center to manage appointments and
          resources
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm"
    >
      {/* Table Header with Stats */}
      <div className="border-b border-border/30 bg-gradient-to-r from-card to-card/95 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
              <Building2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Clinical Centers
              </h2>
              <p className="text-sm text-muted-foreground/80">
                Manage all your healthcare facilities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">Total Centers</p>
              <p className="text-xl font-semibold text-foreground">
                {centers.length}
              </p>
            </div>
            <div className="h-10 w-px bg-border/30" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">Active Today</p>
              <p className="text-xl font-semibold text-accent">
                {centers.filter((c) => c.active).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Subtle decorative gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/30 via-purple-300/20 to-transparent" />

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/30">
              <TableHead className="py-4 pl-7 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Center Details
              </TableHead>
              <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </TableHead>
              <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contact Info
              </TableHead>
              <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="py-4 pr-6 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centers.map((center, index) => (
              <motion.tr
                key={center.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.015 }}
                className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/2 hover:to-transparent transition-all duration-300"
              >
                <TableCell className="py-5 pl-7">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-purple-300/10">
                      <AvatarFallback className="bg-gradient-to-br from-accent/15 to-purple-300/15 text-accent font-semibold">
                        {center.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                          {center.name}
                        </p>
                        {center.featured && (
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0.5 border-accent/30 text-accent bg-accent/10"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/80">
                          <Users className="h-3 w-3" />
                          {center.patientCount || 0} patients
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/80">
                          <Calendar className="h-3 w-3" />
                          {center.appointmentCount || 0} appointments
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-accent/70" />
                      <span className="text-sm text-foreground">
                        {center.district}
                      </span>
                    </div>
                    <div className="pl-5">
                      <span className="text-xs text-muted-foreground/80 font-mono bg-secondary/20 px-2 py-1 rounded">
                        PIN: {center.pincode}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-accent/70" />
                      <a
                        href={`mailto:${center.email}`}
                        className="text-sm text-muted-foreground hover:text-accent hover:underline transition-colors"
                      >
                        {center.email}
                      </a>
                    </div>
                    {center.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-accent/70" />
                        <span className="text-sm text-muted-foreground">
                          {center.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-5">
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
                    {center.busy && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-1 border-warning/30 text-warning bg-warning/10"
                      >
                        Busy
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-5 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    {/* Desktop buttons */}
                    <div className="hidden sm:flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onView(center)}
                            className="h-9 w-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-accent/5 transition-all"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
                          View details
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(center)}
                            className="h-9 w-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-accent/5 transition-all"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
                          Edit center
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDelete(center)}
                            className="h-9 w-9 rounded-lg border-border/40 hover:border-destructive/50 hover:bg-destructive/5 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
                          Delete center
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Mobile dropdown */}
                    <div className="sm:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 w-9 rounded-lg border-border/40"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-xl border border-border/50"
                        >
                          <DropdownMenuItem
                            onClick={() => onView(center)}
                            className="text-sm gap-2 rounded-lg hover:bg-accent/10"
                          >
                            <Eye className="h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEdit(center)}
                            className="text-sm gap-2 rounded-lg hover:bg-accent/10"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit center
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(center)}
                            className="text-sm gap-2 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete center
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-border/30 bg-gradient-to-r from-card/80 to-card/50 px-6 py-3.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground/80">
                <span className="font-medium text-accent">
                  {centers.filter((c) => c.active).length}
                </span>{" "}
                active centers
              </span>
            </div>
            <div className="h-3 w-px bg-border/30" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground/80">
                All systems operational
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">
                Last synchronized
              </p>
              <p className="text-xs font-medium text-foreground">Just now</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

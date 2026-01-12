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
  Pin,
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
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROWS = 6;

export function CentersTable({ centers, onView, onEdit, onDelete, isLoading }) {
  // EMPTY STATE
  if (!isLoading && centers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-accent/20 bg-gradient-to-br from-card to-card/50 p-12 backdrop-blur-sm min-h-[400px]"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple-300/10 blur-xl rounded-full" />
          <div className="relative rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 p-5 border border-accent/20">
            <Building2 className="h-8 w-8 text-accent" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2">
          No centers found
        </h3>
        <p className="text-sm text-muted-foreground/80 text-center max-w-sm">
          Try adjusting your search filters or add a new center to get started.
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
      {/* HEADER */}
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

          {!isLoading && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">Total Centers</p>
              <p className="text-xl font-semibold text-foreground">
                {centers.length}
              </p>
            </div>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/30">
            <TableHead className="py-4 pl-7 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Center Details
            </TableHead>
            <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              District
            </TableHead>
            <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Contact Info
            </TableHead>
            <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Pincode
            </TableHead>
            <TableHead className="py-4 pr-6 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <TableRow key={i} className="border-b border-border/20">
                  <TableCell className="py-5 pl-7">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>

                  <TableCell className="py-5">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>

                  <TableCell className="py-5 pr-6">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-9 rounded-lg" />
                      <Skeleton className="h-9 w-9 rounded-lg" />
                      <Skeleton className="h-9 w-9 rounded-lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : centers.map((center, index) => (
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
                          {center.name?.substring(0, 2).toUpperCase()}
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
                          <span className="inline-flex items-center gap-1 text-sm text-foreground/80">
                            <Pin className="h-3 w-3 text-foreground/80" />
                            {center.location || center.district}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-accent/70" />
                      <span className="text-sm text-foreground">
                        {center.district}
                      </span>
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
                      {center.contact && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-accent/70" />
                          <span className="text-sm text-muted-foreground">
                            {center.contact}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <Badge className="bg-accent/70 hover:bg-accent/70 cursor-default">
                      PIN: {center.pincode}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-5 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <div className="hidden sm:flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onView(center)}
                              className="h-9 w-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-blue-400 transition-all"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs px-2 py-1 bg-accent">
                            View details
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onEdit(center)}
                              className="h-9 w-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-green-400 transition-all"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs px-2 py-1 bg-accent">
                            Edit center
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDelete(center)}
                              className="h-9 w-9 rounded-lg border-border/40 hover:border-destructive/50 hover:bg-destructive transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="text-xs px-2 py-1 bg-accent">
                            Delete center
                          </TooltipContent>
                        </Tooltip>
                      </div>

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
                            <DropdownMenuItem onClick={() => onView(center)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(center)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit center
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDelete(center)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
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
    </motion.div>
  );
}

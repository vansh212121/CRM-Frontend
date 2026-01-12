import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  XCircle,
  Trash2,
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
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteAppointmentDialog } from "@/components/appointments/modals/DeleteAppointmentDialog";
import { formatRawTime } from "@/lib/formatTime";
import { formatRawDate } from "@/lib/formatDate";

const SKELETON_ROWS = 6;

export function RejectedTable({
  appointments,
  onDelete,
  isDeleting,
  isLoading,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [deletingApt, setDeletingApt] = useState(null);

  // EMPTY STATE
  if (!isLoading && appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/40 bg-gradient-to-b from-card/30 to-card/10 py-16"
      >
        <div className="rounded-full bg-destructive/10 p-4 border border-destructive/20 mb-4">
          <XCircle className="h-8 w-8 text-destructive/60" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          No rejected appointments
        </h3>
        <p className="text-xs text-muted-foreground/80">
          Rejected requests will appear here
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="border-b border-border/40 bg-gradient-to-r from-card to-card/95 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2 border border-destructive/20">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Rejected Appointments
              </h3>
              {!isLoading && (
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {appointments.length} records found
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40">
                <TableHead className="py-4 pl-7 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patient Details
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contact Info
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Declined Time
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Reason
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
              {isLoading
                ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                    <TableRow key={i} className="border-b border-border/20">
                      <TableCell className="py-5 pl-7">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-3 w-36" />
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-2 max-w-[200px]">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </TableCell>

                      <TableCell className="py-5 pr-6">
                        <div className="flex justify-end">
                          <Skeleton className="h-9 w-9 rounded-lg" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : appointments.map((apt, index) => (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-destructive/5 hover:via-destructive/2 hover:to-transparent transition-all duration-300"
                    >
                      <TableCell className="py-5 pl-7">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-muted/50 to-muted border border-border/50 text-sm font-semibold text-muted-foreground">
                            {apt.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-destructive transition-colors">
                              {apt.patientName}
                            </p>
                            <p className="text-xs text-muted-foreground/80 mt-0.5">
                              ID: {apt.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {apt.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <a
                              href={`mailto:${apt.email}`}
                              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                            >
                              {apt.email}
                            </a>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-1">
                          {/* Date Line */}
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm text-foreground">
                              {/* ✅ Raw Date Format */}
                              {formatRawDate(apt.completedDate)}
                            </span>
                          </div>

                          {/* Time Line (Badge Style) */}
                          <div className="pl-5">
                            <span className="text-xs text-muted-foreground/80 bg-secondary/20 px-2 py-1 rounded">
                              {/* ✅ Raw Time Format */}
                              {formatRawTime(apt.completedDate)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="max-w-[200px]">
                          <p
                            className={`text-sm text-muted-foreground leading-relaxed ${
                              expandedId === apt.id ? "" : "line-clamp-2"
                            }`}
                          >
                            {apt.cancellationReason || "No reason provided"}
                          </p>
                          {apt.cancellationReason &&
                            apt.cancellationReason.length > 50 && (
                              <button
                                onClick={() =>
                                  setExpandedId(
                                    expandedId === apt.id ? null : apt.id
                                  )
                                }
                                className="mt-1 flex items-center gap-1 text-[10px] font-medium text-destructive hover:text-destructive/80 transition-colors"
                              >
                                {expandedId === apt.id ? (
                                  <>
                                    <ChevronUp className="h-3 w-3" /> Show less
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="h-3 w-3" /> Read
                                    more
                                  </>
                                )}
                              </button>
                            )}
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <Badge
                          variant="outline"
                          className={`
                            text-xs capitalize border-destructive/20 text-destructive bg-destructive/10
                            ${
                              apt.status === "rejected"
                                ? "border-orange-500/20 text-orange-600 bg-orange-500/10"
                                : ""
                            }
                          `}
                        >
                          {apt.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-5 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setDeletingApt(apt)}
                                className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs px-2 py-1">
                              Delete record
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-t border-border/40 bg-gradient-to-r from-card/80 to-card/50 px-6 py-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-accent">
                    {appointments.length}
                  </span>{" "}
                  rejected requests
                </span>
              </div>
              <p className="text-xs text-muted-foreground/80">
                Updated: Just now
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Delete Modal */}
      {deletingApt && (
        <DeleteAppointmentDialog
          appointment={deletingApt}
          open={!!deletingApt}
          isLoading={isDeleting}
          onOpenChange={(open) => !open && setDeletingApt(null)}
          onConfirm={async (id) => {
            try {
              await onDelete(id);
              setDeletingApt(null);
            } catch (e) {}
          }}
        />
      )}
    </>
  );
}

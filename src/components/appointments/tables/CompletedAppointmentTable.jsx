import { useState } from "react";
import { format, isValid } from "date-fns";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Calendar,
  Clock,
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

import { DeleteAppointmentDialog } from "@/components/appointments/modals/DeleteAppointmentDialog";

export function CompletedAppointmentTable({
  appointments,
  onDelete,
  isDeleting,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [deletingApt, setDeletingApt] = useState(null);

  // --- EMPTY STATE ---
  if (appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/40 bg-gradient-to-b from-card/30 to-card/10 py-16"
      >
        <div className="rounded-full bg-success/10 p-4 border border-success/20 mb-4">
          <CheckCircle2 className="h-8 w-8 text-success/60" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          No completed appointments
        </h3>
        <p className="text-xs text-muted-foreground/80">
          History of successful appointments will appear here
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
        {/* Table Header */}
        <div className="border-b border-border/40 bg-gradient-to-r from-card to-card/95 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2 border border-success/20">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Completed Appointments
                </h3>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {appointments.length} records in history
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-xs px-2.5 py-1 border-success/30 text-success bg-success/10"
            >
              History
            </Badge>
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
                  Completed At
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Doctor/Staff Notes
                </TableHead>
                <TableHead className="py-4 pr-6 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt, index) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-success/5 hover:via-success/2 hover:to-transparent transition-all duration-300"
                >
                  {/* 1. Patient Details */}
                  <TableCell className="py-5 pl-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-success/15 to-emerald-300/15 border border-success/20 text-sm font-semibold text-success">
                        {apt.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-success transition-colors">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-0.5">
                          ID: {apt.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* 2. Contact Info */}
                  <TableCell className="py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-success/70" />
                        <span className="text-sm text-foreground">
                          {apt.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-success/70" />
                        <a
                          href={`mailto:${apt.email}`}
                          className="text-sm text-muted-foreground hover:text-success hover:underline transition-colors"
                        >
                          {apt.email}
                        </a>
                      </div>
                    </div>
                  </TableCell>

                  {/* 3. Completed Time (using updated_at mapping) */}
                  <TableCell className="py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-success/70" />
                        <span className="text-sm text-foreground">
                          {apt.completedDate &&
                          isValid(new Date(apt.completedDate))
                            ? format(new Date(apt.completedDate), "MMM d, yyyy")
                            : "N/A"}
                        </span>
                      </div>
                      <div className="pl-5">
                        <span className="text-xs text-muted-foreground/80 bg-secondary/20 px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <Clock className="h-3 w-3" />
                          {apt.completedDate &&
                          isValid(new Date(apt.completedDate))
                            ? format(new Date(apt.completedDate), "h:mm a")
                            : "--:--"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* 4. Notes */}
                  <TableCell className="py-5">
                    <div className="max-w-md">
                      <p
                        className={`text-sm text-muted-foreground leading-relaxed ${
                          expandedId === apt.id ? "" : "line-clamp-2"
                        }`}
                      >
                        {apt.notes || "No notes recorded"}
                      </p>
                      {apt.notes && apt.notes.length > 80 && (
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === apt.id ? null : apt.id)
                          }
                          className="mt-2 flex items-center gap-1 text-xs font-medium text-success hover:text-success/80 transition-colors"
                        >
                          {expandedId === apt.id ? (
                            <>
                              <ChevronUp className="h-3 w-3" /> Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3" /> Read more
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </TableCell>

                  {/* 5. Actions (Delete) */}
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
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-border/40 bg-gradient-to-r from-card/80 to-card/50 px-6 py-3.5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-success">
                    {appointments.length}
                  </span>{" "}
                  completed
                </span>
              </div>
            </div>
          </div>
        </motion.div>
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
            } catch (e) {
              // Stay open on error
            }
          }}
        />
      )}
    </>
  );
}

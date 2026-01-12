import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
  CalendarDays,
  CheckCheckIcon,
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

// Modals
import { RescheduleModal } from "../modals/RescheduleModal";
import { CancelAppointmentDialog } from "../modals/CancelAppointmentDialog";
import { formatRawDate } from "@/lib/formatDate";
import { formatRawTime } from "@/lib/formatTime";
import { CompleteAppointmentModal } from "../modals/CompleteAppointmentModal";

const SKELETON_ROWS = 6;

export function UpcomingAppointmentTable({
  appointments,
  onReschedule,
  onCancel,
  onComplete,
  isRescheduling,
  isCancelling,
  isLoading,
  isCompleting,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [reschedulingApt, setReschedulingApt] = useState(null);
  const [cancellingApt, setCancellingApt] = useState(null);
  const [completingApt, setCompletingApt] = useState(null);

  // EMPTY STATE
  if (!isLoading && appointments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/40 bg-gradient-to-b from-card/30 to-card/10 py-16"
      >
        <div className="rounded-full bg-accent/10 p-4 border border-accent/20 mb-4">
          <CalendarDays className="h-8 w-8 text-accent/60" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          No upcoming appointments
        </h3>
        <p className="text-xs text-muted-foreground/80">
          Scheduled appointments will appear here
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                <CalendarDays className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Upcoming Schedule
                </h3>
                {!isLoading && (
                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                    {appointments.length} confirmed appointments
                  </p>
                )}
              </div>
            </div>
            <Badge
              variant="outline"
              className="text-xs px-2.5 py-1 border-accent/30 text-accent bg-accent/10"
            >
              Active
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
                  Appointment Time
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Notes
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
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="space-y-2 max-w-md">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </TableCell>

                      <TableCell className="py-5 pr-6">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-9 w-28 rounded-lg" />
                          <Skeleton className="h-9 w-24 rounded-lg" />
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
                      className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/2 hover:to-transparent transition-all duration-300"
                    >
                      <TableCell className="py-5 pl-7">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 border border-accent/20 text-sm font-semibold text-accent">
                            {apt.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
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
                            <Phone className="h-3.5 w-3.5 text-accent/70" />
                            <span className="text-sm text-foreground">
                              {apt.phone}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-accent/70" />
                            <a
                              href={`mailto:${apt.email}`}
                              className="text-sm text-muted-foreground hover:text-accent hover:underline transition-colors"
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
                            <CalendarIcon className="h-3.5 w-3.5 text-accent/70" />
                            <span className="text-sm text-foreground">
                              {formatRawDate(apt.confirmedDate)}
                            </span>
                          </div>

                          {/* Time Line */}
                          <div className="flex items-center gap-2 pl-5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                            <span className="text-xs text-muted-foreground/90">
                              {formatRawTime(apt.confirmedDate)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-5">
                        <div className="max-w-md">
                          <p
                            className={`text-sm text-muted-foreground leading-relaxed ${
                              expandedId === apt.id ? "" : "line-clamp-2"
                            }`}
                          >
                            {apt.notes || "No additional notes"}
                          </p>
                          {apt.notes && apt.notes.length > 80 && (
                            <button
                              onClick={() =>
                                setExpandedId(
                                  expandedId === apt.id ? null : apt.id
                                )
                              }
                              className="mt-2 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
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

                      <TableCell className="py-5 pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setReschedulingApt(apt)}
                                className="h-9 rounded-lg border-border/40 hover:border-accent/50 bg-accent/70 hover:bg-accent/90 text-white hover:text-white transition-all gap-2"
                              >
                                <CalendarIcon className="h-3.5 w-3.5" />
                                Reschedule
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs px-2 py-1">
                              Change date or time
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                onClick={() => setCompletingApt(apt)}
                                className="h-9 rounded-lg bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80 shadow-xs hover:shadow-sm transition-all gap-2"
                              >
                                <CheckCheckIcon className="h-3.5 w-3.5" />
                                Complete
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs px-2 py-1">
                              Mark this appointment as Complete
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setCancellingApt(apt)}
                                className="h-9 rounded-lg border-border/40 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all gap-2"
                              >
                                <X className="h-3.5 w-3.5" />
                                Cancel
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="text-xs px-2 py-1">
                              Cancel this appointment
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
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-accent">
                    {appointments.length}
                  </span>{" "}
                  upcoming requests
                </span>
              </div>
              <p className="text-xs text-muted-foreground/80">
                Updated: Just now
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Modals */}
      {reschedulingApt && (
        <RescheduleModal
          appointment={reschedulingApt}
          open={!!reschedulingApt}
          isLoading={isRescheduling}
          onOpenChange={(open) => !open && setReschedulingApt(null)}
          onReschedule={async (data) => {
            try {
              await onReschedule(reschedulingApt.id, data);
              setReschedulingApt(null);
            } catch (error) {}
          }}
        />
      )}

      {cancellingApt && (
        <CancelAppointmentDialog
          request={cancellingApt}
          open={!!cancellingApt}
          isLoading={isCancelling}
          onOpenChange={(open) => !open && setCancellingApt(null)}
          onConfirm={async (reason) => {
            try {
              await onCancel(cancellingApt.id, reason);
              setCancellingApt(null);
            } catch (error) {}
          }}
        />
      )}

      {completingApt && (
        <CompleteAppointmentModal
          request={completingApt}
          open={!!completingApt}
          isLoading={isCompleting}
          onOpenChange={(open) => !open && setCompletingApt(null)}
          onConfirm={async (notes) => {
            try {
              await onComplete(completingApt.id, notes);
              setCompletingApt(null);
            } catch (error) {
              // handle error
            }
          }}
        />
      )}
    </>
  );
}

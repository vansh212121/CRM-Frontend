import { useState } from "react";
import { format, isValid } from "date-fns";
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

// Modals
import { RescheduleModal } from "../modals/RescheduleModal";
import { CancelAppointmentDialog } from "../modals/CancelAppointmentDialog";

export function UpcomingAppointmentTable({
  appointments,
  onReschedule,
  onCancel,
  isRescheduling,
  isCancelling,
}) {
  const [expandedId, setExpandedId] = useState(null);

  // Reschedule Appointment API
  const [reschedulingApt, setReschedulingApt] = useState(null);

  // Modal States
  const [cancellingApt, setCancellingApt] = useState(null);

  // --- EMPTY STATE ---
  if (appointments.length === 0) {
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
        {/* Table Header */}
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
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {appointments.length} confirmed appointments
                </p>
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
              {appointments.map((apt, index) => (
                <motion.tr
                  key={apt.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/2 hover:to-transparent transition-all duration-300"
                >
                  {/* 1. Patient Details */}
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

                  {/* 2. Contact Info */}
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

                  {/* 3. Appointment Time (Use confirmedDate) */}
                  <TableCell className="py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-3.5 w-3.5 text-accent/70" />
                        <span className="text-sm text-foreground">
                          {apt.confirmedDate &&
                          isValid(new Date(apt.confirmedDate))
                            ? format(new Date(apt.confirmedDate), "MMM d, yyyy")
                            : "Date pending"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-5">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
                        <span className="text-xs text-muted-foreground/90">
                          {apt.confirmedTime || "Time pending"}
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
                        {apt.notes || "No additional notes"}
                      </p>
                      {apt.notes && apt.notes.length > 80 && (
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === apt.id ? null : apt.id)
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

                  {/* 5. Actions */}
                  <TableCell className="py-5 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setReschedulingApt(apt)}
                            className="h-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-accent/5 hover:text-accent transition-all gap-2"
                          >
                            <CalendarIcon className="h-3.5 w-3.5" />
                            Reschedule
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
                          Change date or time
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
                        <TooltipContent
                          side="top"
                          className="text-xs px-2 py-1"
                        >
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
      </motion.div>

      {/* --- MODALS --- */}
      {/* Reschedule Modal */}
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

      {/* Cancel Modal */}
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
            } catch (error) {
              
            }
          }}
        />
      )}
    </>
  );
}

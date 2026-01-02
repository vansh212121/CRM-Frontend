// import { useState } from "react";
// import { format } from "date-fns";
// import { motion } from "framer-motion";
// import { RefreshCw, XCircle, Calendar, MapPin } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { RescheduleModal } from "./RescheduleModal";
// import { CancelAppointmentDialog } from "./CancelAppointmentDialog";

// const statusConfig = {
//   active: {
//     label: "Active",
//     className: "status-active",
//   },
//   completed: {
//     label: "Completed",
//     className: "bg-muted text-muted-foreground border border-border",
//   },
//   cancelled: {
//     label: "Cancelled",
//     className: "status-cancelled",
//   },
// };

// export function ConfirmedScheduleTable({
//   appointments,
//   centers,
//   onReschedule,
//   onCancel,
// }) {
//   const [reschedulingAppointment, setReschedulingAppointment] = useState(null);
//   const [cancellingAppointment, setCancellingAppointment] = useState(null);

//   if (appointments.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
//         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
//           <Calendar className="h-5 w-5 text-muted-foreground" />
//         </div>
//         <p className="mt-4 text-sm font-medium text-foreground">
//           No appointments found
//         </p>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Confirmed appointments will appear here
//         </p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="table-container">
//         <Table>
//           <TableHeader>
//             <TableRow className="hover:bg-transparent border-b border-border/60">
//               <TableHead className="w-[220px] font-medium text-foreground/70">
//                 Patient
//               </TableHead>
//               <TableHead className="w-[180px] font-medium text-foreground/70">
//                 Date & Time
//               </TableHead>
//               <TableHead className="w-[200px] font-medium text-foreground/70">
//                 Center
//               </TableHead>
//               <TableHead className="w-[110px] font-medium text-foreground/70">
//                 Status
//               </TableHead>
//               <TableHead className="w-[180px] text-right font-medium text-foreground/70">
//                 Actions
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {appointments.map((appointment, index) => {
//               const status = statusConfig[appointment.status];
//               return (
//                 <motion.tr
//                   key={appointment.id}
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.03 }}
//                   className="group border-b border-border/40 transition-colors hover:bg-muted/30"
//                 >
//                   <TableCell className="py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-sm font-semibold text-primary">
//                         {appointment.patientName
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </div>
//                       <div>
//                         <p className="font-medium text-foreground">
//                           {appointment.patientName}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {appointment.email}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-4">
//                     <div className="flex items-start gap-2">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
//                         <Calendar className="h-4 w-4" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-foreground">
//                           {format(appointment.confirmedDate, "EEE, MMM d")}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           {appointment.confirmedTime}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-4">
//                     <div className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm text-foreground">
//                         {appointment.centerName}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-4">
//                     <Badge className={`${status.className} font-medium`}>
//                       {status.label}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="py-4 text-right">
//                     {appointment.status === "active" && (
//                       <div className="flex items-center justify-end gap-2">
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 setReschedulingAppointment(appointment)
//                               }
//                               className="gap-1.5 border-border/60 hover:bg-muted/50"
//                             >
//                               <RefreshCw className="h-3.5 w-3.5" />
//                               Reschedule
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             Change date, time or center
//                           </TooltipContent>
//                         </Tooltip>

//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() =>
//                                 setCancellingAppointment(appointment)
//                               }
//                               className="gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
//                             >
//                               <XCircle className="h-3.5 w-3.5" />
//                               Cancel
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             Cancel this appointment
//                           </TooltipContent>
//                         </Tooltip>
//                       </div>
//                     )}
//                     {appointment.status !== "active" && (
//                       <span className="text-xs text-muted-foreground">—</span>
//                     )}
//                   </TableCell>
//                 </motion.tr>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Reschedule Modal */}
//       <RescheduleModal
//         appointment={reschedulingAppointment}
//         centers={centers}
//         open={!!reschedulingAppointment}
//         onOpenChange={(open) => !open && setReschedulingAppointment(null)}
//         onReschedule={(data) => {
//           if (reschedulingAppointment) {
//             onReschedule(reschedulingAppointment.id, data);
//             setReschedulingAppointment(null);
//           }
//         }}
//       />

//       {/* Cancel Dialog */}
//       <CancelAppointmentDialog
//         appointment={cancellingAppointment}
//         open={!!cancellingAppointment}
//         onOpenChange={(open) => !open && setCancellingAppointment(null)}
//         onCancel={() => {
//           if (cancellingAppointment) {
//             onCancel(cancellingAppointment.id);
//             setCancellingAppointment(null);
//           }
//         }}
//       />
//     </>
//   );
// }

























import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { RefreshCw, XCircle, Calendar, MapPin, Clock, User, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RescheduleModal } from "./RescheduleModal";
import { CancelAppointmentDialog } from "./CancelAppointmentDialog";

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "bg-gradient-to-r from-accent/15 to-accent/5 text-accent border border-accent/20",
  },
  active: {
    label: "Active",
    className: "bg-gradient-to-r from-success/15 to-success/5 text-success border border-success/20",
  },
  completed: {
    label: "Completed",
    className: "bg-gradient-to-r from-muted/20 to-muted/10 text-muted-foreground border border-border/40",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-gradient-to-r from-destructive/15 to-destructive/5 text-destructive border border-destructive/20",
  },
};

export function ConfirmedScheduleTable({
  appointments,
  centers,
  onReschedule,
  onCancel,
}) {
  const [reschedulingAppointment, setReschedulingAppointment] = useState(null);
  const [cancellingAppointment, setCancellingAppointment] = useState(null);

  if (appointments.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/40 bg-gradient-to-b from-card/30 to-card/10 py-16"
      >
        <div className="rounded-full bg-accent/10 p-4 border border-accent/20 mb-4">
          <CheckCircle className="h-8 w-8 text-accent/60" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">No appointments scheduled</h3>
        <p className="text-xs text-muted-foreground/80">Confirmed appointments will appear here</p>
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
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Confirmed Appointments</h3>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {appointments.filter(a => a.status === 'scheduled' || a.status === 'active').length} upcoming appointments
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-2.5 py-1 border-accent/30 text-accent bg-accent/10">
              All Scheduled
            </Badge>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-success/30 via-accent/20 to-transparent" />
          
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border/40">
                <TableHead className="py-4 pl-7 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patient Details
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Appointment Details
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Center Location
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
              {appointments.map((appointment, index) => {
                const status = statusConfig[appointment.status] || statusConfig.scheduled;
                return (
                  <motion.tr
                    key={appointment.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/2 hover:to-transparent transition-all duration-300"
                  >
                    <TableCell className="py-5 pl-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 border border-accent/20 text-sm font-semibold text-accent">
                          {appointment.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {appointment.patientName}
                          </p>
                          <p className="text-xs text-muted-foreground/80 mt-0.5">
                            {appointment.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-accent/70" />
                          <span className="text-sm font-semibold text-foreground">
                            {format(appointment.confirmedDate, "EEE, MMM d")}
                          </span>
                        </div>
                        <div className="pl-5">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-accent/70" />
                            <span className="text-sm text-foreground">
                              {appointment.confirmedTime}
                            </span>
                          </div>
                          <div className="mt-1">
                            <span className="text-xs text-muted-foreground/80 bg-secondary/20 px-2 py-1 rounded">
                              Duration: {appointment.duration || '30 min'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-accent/70" />
                          <span className="text-sm text-foreground">{appointment.centerName}</span>
                        </div>
                        {appointment.centerAddress && (
                          <div className="pl-5">
                            <p className="text-xs text-muted-foreground/80 truncate max-w-[200px]">
                              {appointment.centerAddress}
                            </p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          appointment.status === 'scheduled' || appointment.status === 'active' 
                            ? 'bg-accent animate-pulse' 
                            : appointment.status === 'completed'
                            ? 'bg-success'
                            : 'bg-destructive'
                        }`} />
                        <Badge className={`${status.className} text-xs font-medium px-2.5 py-1`}>
                          {status.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {(appointment.status === 'scheduled' || appointment.status === 'active') ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setReschedulingAppointment(appointment)}
                                  className="h-9 rounded-lg border-border/40 hover:border-accent/50 hover:bg-accent/5 transition-all gap-2"
                                >
                                  <RefreshCw className="h-3.5 w-3.5" />
                                  Reschedule
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs px-2 py-1">
                                Change date, time or center
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setCancellingAppointment(appointment)}
                                  className="h-9 rounded-lg border-border/40 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all gap-2"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  Cancel
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs px-2 py-1">
                                Cancel this appointment
                              </TooltipContent>
                            </Tooltip>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground/80">No actions available</span>
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-accent">
                    {appointments.filter(a => a.status === 'scheduled' || a.status === 'active').length}
                  </span> upcoming
                </span>
              </div>
              <div className="h-3 w-px bg-border/30" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-success">
                    {appointments.filter(a => a.status === 'completed').length}
                  </span> completed
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">
                Next appointment: {appointments.filter(a => a.status === 'scheduled' || a.status === 'active')[0]?.confirmedTime || 'None'}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <RescheduleModal
        appointment={reschedulingAppointment}
        centers={centers}
        open={!!reschedulingAppointment}
        onOpenChange={(open) => !open && setReschedulingAppointment(null)}
        onReschedule={(data) => {
          if (reschedulingAppointment) {
            onReschedule(reschedulingAppointment.id, data);
            setReschedulingAppointment(null);
          }
        }}
      />

      <CancelAppointmentDialog
        appointment={cancellingAppointment}
        open={!!cancellingAppointment}
        onOpenChange={(open) => !open && setCancellingAppointment(null)}
        onCancel={() => {
          if (cancellingAppointment) {
            onCancel(cancellingAppointment.id);
            setCancellingAppointment(null);
          }
        }}
      />
    </>
  );
}
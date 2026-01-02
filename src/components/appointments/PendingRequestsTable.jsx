// import { useState } from "react";
// import { format, formatDistanceToNow } from "date-fns";
// import { motion } from "framer-motion";
// import { Check, X, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { ConfirmAppointmentModal } from "./ConfirmAppointmentDialog";
// import { RejectRequestDialog } from "./RejectRequestDialog";

// export function PendingRequestsTable({
//   requests,
//   centers,
//   onConfirm,
//   onReject,
// }) {
//   const [expandedId, setExpandedId] = useState(null);
//   const [confirmingRequest, setConfirmingRequest] = useState(null);
//   const [rejectingRequest, setRejectingRequest] = useState(null);

//   if (requests.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
//         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
//           <MessageSquare className="h-5 w-5 text-muted-foreground" />
//         </div>
//         <p className="mt-4 text-sm font-medium text-foreground">
//           No pending requests
//         </p>
//         <p className="mt-1 text-sm text-muted-foreground">
//           New patient requests will appear here
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
//                 Contact
//               </TableHead>
//               <TableHead className="w-[140px] font-medium text-foreground/70">
//                 Submitted
//               </TableHead>
//               <TableHead className="font-medium text-foreground/70">
//                 Preferences
//               </TableHead>
//               <TableHead className="w-[180px] text-right font-medium text-foreground/70">
//                 Actions
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {requests.map((request, index) => (
//               <motion.tr
//                 key={request.id}
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2, delay: index * 0.03 }}
//                 className="group border-b border-border/40 transition-colors hover:bg-muted/30"
//               >
//                 <TableCell className="py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/10 text-sm font-semibold text-accent">
//                       {request.patientName
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </div>
//                     <span className="font-medium text-foreground">
//                       {request.patientName}
//                     </span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="py-4">
//                   <div className="space-y-0.5">
//                     <p className="text-sm text-foreground">{request.phone}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {request.email}
//                     </p>
//                   </div>
//                 </TableCell>
//                 <TableCell className="py-4">
//                   <div className="space-y-0.5">
//                     <p className="text-sm text-foreground">
//                       {format(request.submissionDate, "MMM d, yyyy")}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {formatDistanceToNow(request.submissionDate, {
//                         addSuffix: true,
//                       })}
//                     </p>
//                   </div>
//                 </TableCell>
//                 <TableCell className="py-4">
//                   <div className="max-w-md">
//                     <p
//                       className={`text-sm text-muted-foreground leading-relaxed ${
//                         expandedId === request.id ? "" : "line-clamp-2"
//                       }`}
//                     >
//                       {request.preferences}
//                     </p>
//                     {request.preferences.length > 80 && (
//                       <button
//                         onClick={() =>
//                           setExpandedId(
//                             expandedId === request.id ? null : request.id
//                           )
//                         }
//                         className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
//                       >
//                         {expandedId === request.id ? (
//                           <>
//                             <ChevronUp className="h-3 w-3" /> Show less
//                           </>
//                         ) : (
//                           <>
//                             <ChevronDown className="h-3 w-3" /> Show more
//                           </>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </TableCell>
//                 <TableCell className="py-4 text-right">
//                   <div className="flex items-center justify-end gap-2">
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="sm"
//                           onClick={() => setConfirmingRequest(request)}
//                           className="gap-1.5 shadow-soft hover:shadow-medium transition-shadow"
//                         >
//                           <Check className="h-3.5 w-3.5" />
//                           Confirm
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>Schedule this appointment</TooltipContent>
//                     </Tooltip>

//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => setRejectingRequest(request)}
//                           className="gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
//                         >
//                           <X className="h-3.5 w-3.5" />
//                           Reject
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent>Decline this request</TooltipContent>
//                     </Tooltip>
//                   </div>
//                 </TableCell>
//               </motion.tr>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Confirm Modal */}
//       <ConfirmAppointmentModal
//         request={confirmingRequest}
//         centers={centers}
//         open={!!confirmingRequest}
//         onOpenChange={(open) => !open && setConfirmingRequest(null)}
//         onConfirm={(data) => {
//           if (confirmingRequest) {
//             onConfirm(confirmingRequest.id, data);
//             setConfirmingRequest(null);
//           }
//         }}
//       />

//       {/* Reject Dialog */}
//       <RejectRequestDialog
//         request={rejectingRequest}
//         open={!!rejectingRequest}
//         onOpenChange={(open) => !open && setRejectingRequest(null)}
//         onReject={(reason) => {
//           if (rejectingRequest) {
//             onReject(rejectingRequest.id, reason);
//             setRejectingRequest(null);
//           }
//         }}
//       />
//     </>
//   );
// }



















import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, MessageSquare, User, Phone, Mail, Clock, Calendar } from "lucide-react";
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
import { ConfirmAppointmentModal } from "./ConfirmAppointmentDialog";
import { RejectRequestDialog } from "./RejectRequestDialog";

export function PendingRequestsTable({
  requests,
  centers,
  onConfirm,
  onReject,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [confirmingRequest, setConfirmingRequest] = useState(null);
  const [rejectingRequest, setRejectingRequest] = useState(null);

  if (requests.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/40 bg-gradient-to-b from-card/30 to-card/10 py-16"
      >
        <div className="rounded-full bg-accent/10 p-4 border border-accent/20 mb-4">
          <MessageSquare className="h-8 w-8 text-accent/60" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">No pending requests</h3>
        <p className="text-xs text-muted-foreground/80">New appointment requests will appear here</p>
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
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Pending Appointment Requests</h3>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {requests.length} requests awaiting confirmation
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-2.5 py-1 border-accent/30 text-accent bg-accent/10">
              Action Required
            </Badge>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/30 via-purple-300/20 to-transparent" />
          
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
                  Submission Time
                </TableHead>
                <TableHead className="py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Patient Notes
                </TableHead>
                <TableHead className="py-4 pr-6 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="group border-b border-border/20 last:border-b-0 hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/2 hover:to-transparent transition-all duration-300"
                >
                  <TableCell className="py-5 pl-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/15 to-purple-300/15 border border-accent/20 text-sm font-semibold text-accent">
                        {request.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                          {request.patientName}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-0.5">
                          ID: {request.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-accent/70" />
                        <span className="text-sm text-foreground">{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-accent/70" />
                        <a href={`mailto:${request.email}`} className="text-sm text-muted-foreground hover:text-accent hover:underline transition-colors">
                          {request.email}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-accent/70" />
                        <span className="text-sm text-foreground">
                          {format(request.submissionDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="pl-5">
                        <span className="text-xs text-muted-foreground/80 bg-secondary/20 px-2 py-1 rounded">
                          {formatDistanceToNow(request.submissionDate, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="max-w-md">
                      <p
                        className={`text-sm text-muted-foreground leading-relaxed ${
                          expandedId === request.id ? "" : "line-clamp-2"
                        }`}
                      >
                        {request.preferences || "No additional notes"}
                      </p>
                      {request.preferences && request.preferences.length > 80 && (
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === request.id ? null : request.id
                            )
                          }
                          className="mt-2 flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
                        >
                          {expandedId === request.id ? (
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
                            onClick={() => setConfirmingRequest(request)}
                            className="h-9 rounded-lg bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success/80 shadow-xs hover:shadow-sm transition-all gap-2"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Confirm
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs px-2 py-1">
                          Schedule this appointment
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setRejectingRequest(request)}
                            className="h-9 rounded-lg border-border/40 hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive transition-all gap-2"
                          >
                            <X className="h-3.5 w-3.5" />
                            Reject
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs px-2 py-1">
                          Decline this request
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
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  <span className="font-medium text-accent">{requests.length}</span> pending requests
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground/80">
                Updated: Just now
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <ConfirmAppointmentModal
        request={confirmingRequest}
        centers={centers}
        open={!!confirmingRequest}
        onOpenChange={(open) => !open && setConfirmingRequest(null)}
        onConfirm={(data) => {
          if (confirmingRequest) {
            onConfirm(confirmingRequest.id, data);
            setConfirmingRequest(null);
          }
        }}
      />

      <RejectRequestDialog
        request={rejectingRequest}
        open={!!rejectingRequest}
        onOpenChange={(open) => !open && setRejectingRequest(null)}
        onReject={(reason) => {
          if (rejectingRequest) {
            onReject(rejectingRequest.id, reason);
            setRejectingRequest(null);
          }
        }}
      />
    </>
  );
}


// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { CalendarIcon, Clock, RefreshCw } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";

// const timeSlots = [
//   "08:00",
//   "08:30",
//   "09:00",
//   "09:30",
//   "10:00",
//   "10:30",
//   "11:00",
//   "11:30",
//   "12:00",
//   "12:30",
//   "13:00",
//   "13:30",
//   "14:00",
//   "14:30",
//   "15:00",
//   "15:30",
//   "16:00",
//   "16:30",
//   "17:00",
// ];

// export function RescheduleModal({
//   appointment,
//   centers,
//   open,
//   onOpenChange,
//   onReschedule,
// }) {
//   const [date, setDate] = useState(undefined);
//   const [time, setTime] = useState("");
//   const [centerId, setCenterId] = useState("");

//   useEffect(() => {
//     if (appointment && open) {
//       setDate(appointment.confirmedDate);
//       setTime(appointment.confirmedTime);
//       setCenterId(appointment.centerId);
//     }
//   }, [appointment, open]);

//   const handleSubmit = () => {
//     if (!date || !time || !centerId) return;
//     onReschedule({ date, time, centerId });
//   };

//   const isValid = date && time && centerId;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="font-display text-xl">
//             Reschedule Appointment
//           </DialogTitle>
//           <DialogDescription className="text-muted-foreground">
//             Update the schedule for <strong>{appointment?.patientName}</strong>
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-5 py-2">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <RefreshCw className="h-4 w-4 text-muted-foreground" />
//               New Schedule
//             </div>

//             <div className="grid gap-4 pl-6">
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="grid gap-2">
//                   <Label className="text-sm">Date *</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "justify-start text-left font-normal bg-muted/40 border-0 hover:bg-muted/60",
//                           !date && "text-muted-foreground"
//                         )}
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {date ? format(date, "MMM d, yyyy") : "Select date"}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         disabled={(date) => date < new Date()}
//                         initialFocus
//                         className="pointer-events-auto"
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>

//                 <div className="grid gap-2">
//                   <Label className="text-sm">Time *</Label>
//                   <Select value={time} onValueChange={setTime}>
//                     <SelectTrigger className="bg-muted/40 border-0 hover:bg-muted/60">
//                       <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                       <SelectValue placeholder="Select time" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {timeSlots.map((slot) => (
//                         <SelectItem key={slot} value={slot}>
//                           {slot}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid gap-2">
//                 <Label className="text-sm">Assigned Center *</Label>
//                 <Select value={centerId} onValueChange={setCenterId}>
//                   <SelectTrigger className="bg-muted/40 border-0 hover:bg-muted/60">
//                     <SelectValue placeholder="Select center" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {centers.map((center) => (
//                       <SelectItem key={center.id} value={center.id}>
//                         {center.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
//         </div>

//         <DialogFooter className="mt-2 gap-2 sm:gap-0">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={!isValid} className="gap-2">
//             <RefreshCw className="h-4 w-4" />
//             Update Schedule
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
























import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function RescheduleModal({
  appointment,
  centers,
  open,
  onOpenChange,
  onReschedule,
}) {
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [centerId, setCenterId] = useState("");

  useEffect(() => {
    if (appointment && open) {
      setDate(appointment.confirmedDate);
      setTime(appointment.confirmedTime);
      setCenterId(appointment.centerId);
    }
  }, [appointment, open]);

  const handleSubmit = () => {
    if (!date || !time || !centerId) return;
    onReschedule({ date, time, centerId });
  };

  const isValid = date && time && centerId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header - Minimal styling */}
          <div className="border-b border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Reschedule Appointment
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                  Update the schedule for <strong>{appointment?.patientName}</strong>
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-accent/10"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* Content - Keep original structure, just update styling */}
          <div className="px-6 py-5">
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <RefreshCw className="h-4 w-4 text-accent/70" />
                  New Schedule
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                      <Label className="text-sm font-medium">Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal h-10 rounded-lg border-border/40 hover:border-accent/50",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "MMM d, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-lg border border-border/50" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-sm font-medium">Time *</Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="h-10 rounded-lg border-border/40 hover:border-accent/50">
                          <Clock className="mr-2 h-4 w-4 text-accent/70" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border border-border/50">
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot} className="text-sm">
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm font-medium">Assigned Center *</Label>
                    <Select value={centerId} onValueChange={setCenterId}>
                      <SelectTrigger className="h-10 rounded-lg border-border/40 hover:border-accent/50">
                        <SelectValue placeholder="Select center" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border border-border/50">
                        {centers.map((center) => (
                          <SelectItem key={center.id} value={center.id} className="text-sm">
                            {center.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Simple validation indicator */}
              <div className="rounded-lg border border-border/30 bg-muted/20 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isValid ? 'bg-accent' : 'bg-muted-foreground/60'}`} />
                  <span className="text-sm text-muted-foreground/80">
                    {isValid ? 'Ready to update schedule' : 'Complete all required fields'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-10 rounded-lg border-border/40 hover:border-accent/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isValid}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Update Schedule
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

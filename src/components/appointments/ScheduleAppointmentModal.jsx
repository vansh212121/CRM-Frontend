// import { useState } from "react";
// import { format } from "date-fns";
// import { CalendarIcon, Clock, User, Mail, Phone } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
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

// export function ScheduleAppointmentModal({
//   centers,
//   open,
//   onOpenChange,
//   onSchedule,
// }) {
//   const [patientName, setPatientName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [date, setDate] = useState(undefined);
//   const [time, setTime] = useState("");
//   const [centerId, setCenterId] = useState("");
//   const [notes, setNotes] = useState("");

//   const handleSubmit = () => {
//     if (!patientName || !email || !phone || !date || !time || !centerId) return;
//     onSchedule({
//       patientName,
//       email,
//       phone,
//       date,
//       time,
//       centerId,
//       notes: notes || undefined,
//     });
//     // Reset form
//     setPatientName("");
//     setEmail("");
//     setPhone("");
//     setDate(undefined);
//     setTime("");
//     setCenterId("");
//     setNotes("");
//     onOpenChange(false);
//   };

//   const isValid = patientName && email && phone && date && time && centerId;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="font-display text-xl">
//             Schedule New Appointment
//           </DialogTitle>
//           <DialogDescription className="text-muted-foreground">
//             Manually create a new appointment for a patient
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-5 py-2">
//           {/* Patient Information Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <User className="h-4 w-4 text-muted-foreground" />
//               Patient Information
//             </div>

//             <div className="grid gap-4 pl-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="patientName" className="text-sm">
//                   Full Name *
//                 </Label>
//                 <Input
//                   id="patientName"
//                   placeholder="Enter patient's full name"
//                   value={patientName}
//                   onChange={(e) => setPatientName(e.target.value)}
//                   className="bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="grid gap-2">
//                   <Label htmlFor="email" className="text-sm">
//                     Email *
//                   </Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="email@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-9 bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid gap-2">
//                   <Label htmlFor="phone" className="text-sm">
//                     Phone *
//                   </Label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+1 (555) 000-0000"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className="pl-9 bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="divider-subtle" />

//           {/* Appointment Details Section */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-sm font-medium text-foreground">
//               <CalendarIcon className="h-4 w-4 text-muted-foreground" />
//               Appointment Details
//             </div>

//             <div className="grid gap-4 pl-6">
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Date Picker */}
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

//                 {/* Time Slot */}
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

//               {/* Center */}
//               <div className="grid gap-2">
//                 <Label className="text-sm">Assigned Center *</Label>
//                 <Select value={centerId} onValueChange={setCenterId}>
//                   <SelectTrigger className="bg-muted/40 border-0 hover:bg-muted/60">
//                     <SelectValue placeholder="Select a center" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {centers.map((center) => (
//                       <SelectItem key={center.id} value={center.id}>
//                         <div className="flex flex-col">
//                           <span>{center.name}</span>
//                           <span className="text-xs text-muted-foreground">
//                             {center.district}
//                           </span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Notes */}
//               <div className="grid gap-2">
//                 <Label className="text-sm">Notes (Optional)</Label>
//                 <Textarea
//                   placeholder="Add any relevant notes about this appointment..."
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   rows={2}
//                   className="bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30 resize-none"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <DialogFooter className="mt-2 gap-2 sm:gap-0">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={!isValid} className="gap-2">
//             <CalendarIcon className="h-4 w-4" />
//             Schedule Appointment
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, Mail, Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export function ScheduleAppointmentModal({
  centers,
  open,
  onOpenChange,
  onSchedule,
}) {
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [centerId, setCenterId] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!patientName || !email || !phone || !date || !time || !centerId) return;
    onSchedule({
      patientName,
      email,
      phone,
      date,
      time,
      centerId,
      notes: notes || undefined,
    });
    // Reset form
    setPatientName("");
    setEmail("");
    setPhone("");
    setDate(undefined);
    setTime("");
    setCenterId("");
    setNotes("");
    onOpenChange(false);
  };

  const isValid = patientName && email && phone && date && time && centerId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="rounded-xl border border-border/50 bg-card shadow-sm">
          {/* Header */}
          <div className="border-b border-border/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg font-semibold text-foreground">
                  Schedule New Appointment
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground/80 mt-0.5">
                  Manually create a new appointment for a patient
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-lg hover:bg-accent/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="space-y-6">
              {/* Patient Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <User className="h-4 w-4 text-accent/70" />
                  Patient Information
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="patientName"
                      className="text-sm font-medium"
                    >
                      Full Name <span className="text-accent text-xs">*</span>
                    </Label>
                    <Input
                      id="patientName"
                      placeholder="Enter patient's full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-accent text-xs">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/70" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone <span className="text-accent text-xs">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent/70" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/30" />

              {/* Appointment Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarIcon className="h-4 w-4 text-accent/70" />
                  Appointment Details
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Date <span className="text-accent text-xs">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-10 justify-start text-left font-normal rounded-lg border-border/40 hover:border-accent/50",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "MMM d, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 rounded-lg border border-border/50"
                          align="start"
                        >
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

                    {/* Time Slot */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Time <span className="text-accent text-xs">*</span>
                      </Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="h-10 rounded-lg border-border/40 hover:border-accent/50">
                          <Clock className="mr-2 h-4 w-4 text-accent/70" />
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border border-border/50">
                          {timeSlots.map((slot) => (
                            <SelectItem
                              key={slot}
                              value={slot}
                              className="text-sm"
                            >
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Center */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Assigned Center{" "}
                      <span className="text-accent text-xs">*</span>
                    </Label>
                    <Select value={centerId} onValueChange={setCenterId}>
                      <SelectTrigger className="h-10 rounded-lg border-border/40 hover:border-accent/50">
                        <SelectValue placeholder="Select a center" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg border border-border/50">
                        {centers.map((center) => (
                          <SelectItem
                            key={center.id}
                            value={center.id}
                            className="text-sm"
                          >
                            <div className="flex flex-col">
                              <span>{center.name}</span>
                              <span className="text-xs text-muted-foreground/80">
                                {center.district}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Notes
                      <span className="text-xs text-muted-foreground/80 font-normal ml-1">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      placeholder="Add any relevant notes about this appointment..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="rounded-lg border-border/40 focus:border-accent/50 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              {/* <div className="rounded-lg border border-border/30 bg-muted/20 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${isValid ? 'bg-accent' : 'bg-muted-foreground/60'}`} />
                  <span className="text-sm text-muted-foreground/80">
                    {isValid ? 'All required fields completed' : 'Complete all required fields (*) to schedule'}
                  </span>
                </div>
              </div> */}
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
                <CalendarIcon className="h-4 w-4" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

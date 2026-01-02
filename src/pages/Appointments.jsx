// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Clock,
//   CheckCircle2,
//   Search,
//   Plus,
//   Calendar,
//   Users,
//   TrendingUp,
// } from "lucide-react";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import { PendingRequestsTable } from "@/components/appointments/PendingRequestsTable";
// import { ConfirmedScheduleTable } from "@/components/appointments/ConfirmedScheduleTable";
// import { ScheduleAppointmentModal } from "@/components/appointments/ScheduleAppointmentModal";
// import {
//   mockPendingRequests,
//   mockConfirmedAppointments,
//   mockCenters,
// } from "@/data/mockData";

// export default function Appointments() {
//   const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
//   const [confirmedAppointments, setConfirmedAppointments] = useState(
//     mockConfirmedAppointments
//   );
//   const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

//   // Search & Filter state
//   const [pendingSearch, setPendingSearch] = useState("");
//   const [confirmedSearch, setConfirmedSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [centerFilter, setCenterFilter] = useState("all");

//   // Filtered data
//   const filteredPendingRequests = useMemo(() => {
//     return pendingRequests.filter((request) => {
//       const searchLower = pendingSearch.toLowerCase();
//       return (
//         request.patientName.toLowerCase().includes(searchLower) ||
//         request.email.toLowerCase().includes(searchLower) ||
//         request.phone.includes(pendingSearch)
//       );
//     });
//   }, [pendingRequests, pendingSearch]);

//   const filteredConfirmedAppointments = useMemo(() => {
//     return confirmedAppointments.filter((apt) => {
//       const searchLower = confirmedSearch.toLowerCase();
//       const matchesSearch =
//         apt.patientName.toLowerCase().includes(searchLower) ||
//         apt.email.toLowerCase().includes(searchLower) ||
//         apt.centerName.toLowerCase().includes(searchLower);

//       const matchesStatus =
//         statusFilter === "all" || apt.status === statusFilter;

//       const matchesCenter =
//         centerFilter === "all" || apt.centerId === centerFilter;

//       return matchesSearch && matchesStatus && matchesCenter;
//     });
//   }, [confirmedAppointments, confirmedSearch, statusFilter, centerFilter]);

//   // Stats
//   const stats = useMemo(
//     () => ({
//       pending: pendingRequests.length,
//       activeToday: confirmedAppointments.filter((a) => a.status === "active")
//         .length,
//       completed: confirmedAppointments.filter((a) => a.status === "completed")
//         .length,
//     }),
//     [pendingRequests, confirmedAppointments]
//   );

//   const handleConfirm = (requestId, data) => {
//     const request = pendingRequests.find((r) => r.id === requestId);
//     if (!request) return;

//     const center = mockCenters.find((c) => c.id === data.centerId);

//     const newAppointment = {
//       id: `apt-${Date.now()}`,
//       patientName: request.patientName,
//       email: request.email,
//       phone: request.phone,
//       confirmedDate: data.date,
//       confirmedTime: data.time,
//       centerId: data.centerId,
//       centerName: center?.name || "Unknown Center",
//       status: "active",
//       notes: data.notes,
//     };

//     setConfirmedAppointments((prev) => [...prev, newAppointment]);
//     setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
//   };

//   const handleReject = (requestId) => {
//     setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
//   };

//   const handleReschedule = (appointmentId, data) => {
//     const center = mockCenters.find((c) => c.id === data.centerId);

//     setConfirmedAppointments((prev) =>
//       prev.map((apt) =>
//         apt.id === appointmentId
//           ? {
//               ...apt,
//               confirmedDate: data.date,
//               confirmedTime: data.time,
//               centerId: data.centerId,
//               centerName: center?.name || apt.centerName,
//             }
//           : apt
//       )
//     );
//   };

//   const handleCancel = (appointmentId) => {
//     setConfirmedAppointments((prev) =>
//       prev.map((apt) =>
//         apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
//       )
//     );
//   };

//   const handleScheduleNew = (data) => {
//     const center = mockCenters.find((c) => c.id === data.centerId);

//     const newAppointment = {
//       id: `apt-${Date.now()}`,
//       patientName: data.patientName,
//       email: data.email,
//       phone: data.phone,
//       confirmedDate: data.date,
//       confirmedTime: data.time,
//       centerId: data.centerId,
//       centerName: center?.name || "Unknown Center",
//       status: "active",
//       notes: data.notes,
//     };

//     setConfirmedAppointments((prev) => [...prev, newAppointment]);
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         {/* Header Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
//         >
//           <div>
//             <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
//               Appointments
//             </h1>
//             <p className="mt-1.5 text-muted-foreground">
//               Manage scheduling requests and confirmed patient appointments
//             </p>
//           </div>
//           <Button
//             onClick={() => setScheduleModalOpen(true)}
//             className="gap-2 shadow-soft hover:shadow-medium transition-shadow"
//             size="lg"
//           >
//             <Plus className="h-4 w-4" />
//             Schedule Appointment
//           </Button>
//         </motion.div>

//         {/* Stats Cards */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="grid gap-4 sm:grid-cols-3"
//         >
//           <div className="stat-card group">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Pending Requests
//                 </p>
//                 <p className="mt-1 text-2xl font-semibold font-display text-foreground">
//                   {stats.pending}
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning transition-colors group-hover:bg-warning/15">
//                 <Clock className="h-5 w-5" />
//               </div>
//             </div>
//           </div>

//           <div className="stat-card group">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Active Appointments
//                 </p>
//                 <p className="mt-1 text-2xl font-semibold font-display text-foreground">
//                   {stats.activeToday}
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
//                 <Users className="h-5 w-5" />
//               </div>
//             </div>
//           </div>

//           <div className="stat-card group">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Completed
//                 </p>
//                 <p className="mt-1 text-2xl font-semibold font-display text-foreground">
//                   {stats.completed}
//                 </p>
//               </div>
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success transition-colors group-hover:bg-success/15">
//                 <TrendingUp className="h-5 w-5" />
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Main Content Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="page-section"
//         >
//           <Tabs defaultValue="pending" className="space-y-6">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <TabsList className="h-11 bg-muted/60 p-1 rounded-lg">
//                 <TabsTrigger
//                   value="pending"
//                   className="gap-2 rounded-md px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm"
//                 >
//                   <Clock className="h-4 w-4" />
//                   <span>Pending</span>
//                   {stats.pending > 0 && (
//                     <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-warning/15 px-1.5 text-xs font-medium text-warning">
//                       {stats.pending}
//                     </span>
//                   )}
//                 </TabsTrigger>

//                 <TabsTrigger
//                   value="confirmed"
//                   className="gap-2 rounded-md px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm"
//                 >
//                   <CheckCircle2 className="h-4 w-4" />
//                   <span>Confirmed</span>
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <AnimatePresence mode="wait">
//               <TabsContent value="pending" className="mt-0 space-y-4">
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="flex items-center gap-3"
//                 >
//                   <div className="relative flex-1 max-w-sm">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       placeholder="Search by name, email, or phone..."
//                       value={pendingSearch}
//                       onChange={(e) => setPendingSearch(e.target.value)}
//                       className="pl-9 bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30"
//                     />
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <PendingRequestsTable
//                     requests={filteredPendingRequests}
//                     centers={mockCenters}
//                     onConfirm={handleConfirm}
//                     onReject={handleReject}
//                   />
//                 </motion.div>
//               </TabsContent>

//               <TabsContent value="confirmed" className="mt-0 space-y-4">
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="flex flex-wrap items-center gap-3"
//                 >
//                   <div className="relative flex-1 min-w-[200px] max-w-sm">
//                     <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       placeholder="Search appointments..."
//                       value={confirmedSearch}
//                       onChange={(e) => setConfirmedSearch(e.target.value)}
//                       className="pl-9 bg-muted/40 border-0 focus:bg-card focus:ring-1 focus:ring-ring/30"
//                     />
//                   </div>

//                   <Select value={statusFilter} onValueChange={setStatusFilter}>
//                     <SelectTrigger className="w-[140px] bg-muted/40 border-0">
//                       <SelectValue placeholder="Status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Status</SelectItem>
//                       <SelectItem value="active">Active</SelectItem>
//                       <SelectItem value="completed">Completed</SelectItem>
//                       <SelectItem value="cancelled">Cancelled</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <Select value={centerFilter} onValueChange={setCenterFilter}>
//                     <SelectTrigger className="w-[180px] bg-muted/40 border-0">
//                       <SelectValue placeholder="Center" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">All Centers</SelectItem>
//                       {mockCenters.map((center) => (
//                         <SelectItem key={center.id} value={center.id}>
//                           {center.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <ConfirmedScheduleTable
//                     appointments={filteredConfirmedAppointments}
//                     centers={mockCenters}
//                     onReschedule={handleReschedule}
//                     onCancel={handleCancel}
//                   />
//                 </motion.div>
//               </TabsContent>
//             </AnimatePresence>
//           </Tabs>
//         </motion.div>
//       </div>

//       {/* Schedule New Appointment Modal */}
//       <ScheduleAppointmentModal
//         centers={mockCenters}
//         open={scheduleModalOpen}
//         onOpenChange={setScheduleModalOpen}
//         onSchedule={handleScheduleNew}
//       />
//     </DashboardLayout>
//   );
// }




















import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle2,
  Search,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Filter,
  CalendarDays,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PendingRequestsTable } from "@/components/appointments/PendingRequestsTable";
import { ConfirmedScheduleTable } from "@/components/appointments/ConfirmedScheduleTable";
import { ScheduleAppointmentModal } from "@/components/appointments/ScheduleAppointmentModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockPendingRequests,
  mockConfirmedAppointments,
  mockCenters,
} from "@/data/mockData";

export default function Appointments() {
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [confirmedAppointments, setConfirmedAppointments] = useState(
    mockConfirmedAppointments
  );
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  // Search & Filter state
  const [pendingSearch, setPendingSearch] = useState("");
  const [confirmedSearch, setConfirmedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [centerFilter, setCenterFilter] = useState("all");

  // Filtered data
  const filteredPendingRequests = useMemo(() => {
    return pendingRequests.filter((request) => {
      const searchLower = pendingSearch.toLowerCase();
      return (
        request.patientName.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.phone.includes(pendingSearch)
      );
    });
  }, [pendingRequests, pendingSearch]);

  const filteredConfirmedAppointments = useMemo(() => {
    return confirmedAppointments.filter((apt) => {
      const searchLower = confirmedSearch.toLowerCase();
      const matchesSearch =
        apt.patientName.toLowerCase().includes(searchLower) ||
        apt.email.toLowerCase().includes(searchLower) ||
        apt.centerName.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || apt.status === statusFilter;

      const matchesCenter =
        centerFilter === "all" || apt.centerId === centerFilter;

      return matchesSearch && matchesStatus && matchesCenter;
    });
  }, [confirmedAppointments, confirmedSearch, statusFilter, centerFilter]);

  // Stats
  const stats = useMemo(
    () => ({
      pending: pendingRequests.length,
      activeToday: confirmedAppointments.filter(
        (a) => a.status === "active" || a.status === "scheduled"
      ).length,
      completed: confirmedAppointments.filter((a) => a.status === "completed")
        .length,
      upcoming: confirmedAppointments.filter((a) => a.status === "scheduled")
        .length,
    }),
    [pendingRequests, confirmedAppointments]
  );

  const handleConfirm = (requestId, data) => {
    const request = pendingRequests.find((r) => r.id === requestId);
    if (!request) return;

    const center = mockCenters.find((c) => c.id === data.centerId);

    const newAppointment = {
      id: `apt-${Date.now()}`,
      patientName: request.patientName,
      email: request.email,
      phone: request.phone,
      confirmedDate: data.date,
      confirmedTime: data.time,
      centerId: data.centerId,
      centerName: center?.name || "Unknown Center",
      status: "scheduled",
      notes: data.notes,
    };

    setConfirmedAppointments((prev) => [...prev, newAppointment]);
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleReject = (requestId) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const handleReschedule = (appointmentId, data) => {
    const center = mockCenters.find((c) => c.id === data.centerId);

    setConfirmedAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              confirmedDate: data.date,
              confirmedTime: data.time,
              centerId: data.centerId,
              centerName: center?.name || apt.centerName,
            }
          : apt
      )
    );
  };

  const handleCancel = (appointmentId) => {
    setConfirmedAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  const handleScheduleNew = (data) => {
    const center = mockCenters.find((c) => c.id === data.centerId);

    const newAppointment = {
      id: `apt-${Date.now()}`,
      patientName: data.patientName,
      email: data.email,
      phone: data.phone,
      confirmedDate: data.date,
      confirmedTime: data.time,
      centerId: data.centerId,
      centerName: center?.name || "Unknown Center",
      status: "scheduled",
      notes: data.notes,
    };

    setConfirmedAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                  <CalendarDays className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    Appointments
                  </h1>
                  <p className="text-sm text-muted-foreground/80">
                    Manage patient appointments and scheduling requests
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setScheduleModalOpen(true)}
              className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors gap-2"
            >
              <Plus className="h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-border/40 hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground/80">
                        Pending Requests
                      </p>
                      <p className="text-2xl font-semibold text-warning mt-1">
                        {stats.pending}
                      </p>
                    </div>
                    <div className="rounded-lg bg-warning/10 p-2 border border-warning/20">
                      <Clock className="h-4 w-4 text-warning" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-warning w-full"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="border-border/40 hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground/80">
                        Upcoming
                      </p>
                      <p className="text-2xl font-semibold text-accent mt-1">
                        {stats.upcoming}
                      </p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-accent w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border/40 hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground/80">
                        Active Today
                      </p>
                      <p className="text-2xl font-semibold text-success mt-1">
                        {stats.activeToday}
                      </p>
                    </div>
                    <div className="rounded-lg bg-success/10 p-2 border border-success/20">
                      <Users className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-success w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="border-border/40 hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground/80">
                        Completed
                      </p>
                      <p className="text-2xl font-semibold text-foreground mt-1">
                        {stats.completed}
                      </p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <TrendingUp className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-accent w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm"
        >
          <Tabs defaultValue="pending" className="w-full">
            {/* Tabs Header */}
            <div className="border-b border-border/40 px-6 py-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <TabsList className="h-10 bg-muted/20 p-1 rounded-lg border border-border/30">
                  <TabsTrigger
                    value="pending"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Pending Requests</span>
                    {stats.pending > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-1.5 py-0.5 ml-1 border-warning/30 text-warning bg-warning/10"
                      >
                        {stats.pending}
                      </Badge>
                    )}
                  </TabsTrigger>

                  <TabsTrigger
                    value="confirmed"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirmed Appointments</span>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs px-2.5 py-1 border-accent/30 text-accent bg-accent/10"
                  >
                    Total:{" "}
                    {pendingRequests.length + confirmedAppointments.length}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tabs Content - Pending */}
            <TabsContent value="pending" className="mt-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  {/* Search Bar */}
                  <div className="rounded-lg border border-border/40 bg-gradient-to-r from-card to-card/90 p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                        <Input
                          placeholder="Search pending requests by name, email, or phone..."
                          value={pendingSearch}
                          onChange={(e) => setPendingSearch(e.target.value)}
                          className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-px bg-border/30" />
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-1 border-accent/30 text-accent bg-accent/10"
                        >
                          {filteredPendingRequests.length} requests
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <PendingRequestsTable
                    requests={filteredPendingRequests}
                    centers={mockCenters}
                    onConfirm={handleConfirm}
                    onReject={handleReject}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Tabs Content - Confirmed */}
            <TabsContent value="confirmed" className="mt-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  {/* Filter Bar */}
                  <div className="rounded-lg border border-border/40 bg-gradient-to-r from-card to-card/90 p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                          <Input
                            placeholder="Search appointments by patient, center, or email..."
                            value={confirmedSearch}
                            onChange={(e) => setConfirmedSearch(e.target.value)}
                            className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger className="w-36 h-10 rounded-lg border-border/40">
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4 text-muted-foreground/60" />
                              <SelectValue placeholder="Status" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="rounded-lg border border-border/50">
                            <SelectItem
                              value="all"
                              className="text-sm rounded-lg"
                            >
                              All Status
                            </SelectItem>
                            <SelectItem
                              value="scheduled"
                              className="text-sm rounded-lg"
                            >
                              Scheduled
                            </SelectItem>
                            <SelectItem
                              value="active"
                              className="text-sm rounded-lg"
                            >
                              Active
                            </SelectItem>
                            <SelectItem
                              value="completed"
                              className="text-sm rounded-lg"
                            >
                              Completed
                            </SelectItem>
                            <SelectItem
                              value="cancelled"
                              className="text-sm rounded-lg"
                            >
                              Cancelled
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Select
                          value={centerFilter}
                          onValueChange={setCenterFilter}
                        >
                          <SelectTrigger className="w-40 h-10 rounded-lg border-border/40">
                            <div className="flex items-center gap-2">
                              <Filter className="h-4 w-4 text-muted-foreground/60" />
                              <SelectValue placeholder="Center" />
                            </div>
                          </SelectTrigger>
                          <SelectContent className="rounded-lg border border-border/50">
                            <SelectItem
                              value="all"
                              className="text-sm rounded-lg"
                            >
                              All Centers
                            </SelectItem>
                            {mockCenters.map((center) => (
                              <SelectItem
                                key={center.id}
                                value={center.id}
                                className="text-sm rounded-lg"
                              >
                                {center.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="h-4 w-px bg-border/30" />

                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-1 border-accent/30 text-accent bg-accent/10"
                        >
                          {filteredConfirmedAppointments.length} appointments
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <ConfirmedScheduleTable
                    appointments={filteredConfirmedAppointments}
                    centers={mockCenters}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Schedule New Appointment Modal */}
      <ScheduleAppointmentModal
        centers={mockCenters}
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleScheduleNew}
      />
    </DashboardLayout>
  );
}

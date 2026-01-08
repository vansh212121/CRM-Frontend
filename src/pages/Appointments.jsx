import { useState, useMemo, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PendingRequestsTable } from "@/components/appointments/tables/PendingRequestsTable";
import { CompletedAppointmentTable } from "@/components/appointments/tables/CompletedAppointmentTable";
import { UpcomingAppointmentTable } from "@/components/appointments/tables/UpcomingAppointmentTable";
import { CancelledTable } from "@/components/appointments/tables/CancelledScheduledTable";
import { ScheduleAppointmentModal } from "@/components/appointments/modals/ScheduleAppointmentModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import {
  mockPendingRequests,
  mockConfirmedAppointments,
  mockCenters,
} from "@/data/mockData";
import { RejectedTable } from "@/components/appointments/tables/RejectedAppointmentTable";
import {
  useCancelAppointmentMutation,
  useConfirmAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
  useRejectAppointmentMutation,
  useRescheduleAppointmentMutation,
  useScheduleAppointmentMutation,
} from "@/features/api/appointmentApi";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";

export default function Appointments() {
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [confirmedAppointments, setConfirmedAppointments] = useState(
    mockConfirmedAppointments
  );

  // Helper function to merge Date object + Time string into ISO string
  const combineDateAndTime = (date, timeString) => {
    if (!date || !timeString) return null;

    // 1. Create a fresh date object from the selected date
    const combined = new Date(date);

    // 2. Parse "10:30 AM" -> Hours and Minutes
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    // 3. Set the time on the date object
    combined.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    // 4. Return ISO string for backend
    return combined.toISOString();
  };

  // Confirm API
  const [confirmAppointment, { isLoading: isConfirming }] =
    useConfirmAppointmentMutation();

  const handleConfirm = async (appointmentId, formData) => {
    try {
      // Merge Date & Time
      const isoDate = combineDateAndTime(formData.date, formData.time);

      if (!isoDate) {
        toast.error("Please select both date and time"); // Or use a toast
        return;
      }

      // Prepare Payload
      const payload = {
        id: appointmentId,
        appointment_date: isoDate,
        notes: formData.notes || "",
      };

      // Send Request
      await confirmAppointment(payload).unwrap();
      toast.success("Appointment Confirmed!");
    } catch (err) {
      handleError(err, "Failed to  Confirm Appointment");
    }
  };

  // Schedule Appointment API
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleAppointment, { isLoading: isScheduling }] =
    useScheduleAppointmentMutation();

  const handleScheduleNew = async (formData) => {
    try {
      // Merge Date & Time
      const isoDate = combineDateAndTime(formData.date, formData.time);

      if (!isoDate) {
        toast.error("Please select both date and time"); // Or use a toast
        return;
      }

      // Prepare Payload
      const payload = {
        name: formData.patientName, // UI field -> API field
        email: formData.email,
        contact: formData.phone,
        appointment_date: isoDate,
        notes: formData.notes || "",
      };

      // Send Request
      await scheduleAppointment(payload).unwrap();

      // Success!
      setScheduleModalOpen(false);
      toast.success("Appointment scheduled!");
    } catch (error) {
      handleError(error, "Failed to  schedule Appointment");
    }
  };

  // Reschedule Appointment API
  const [rescheduleAppointment, { isLoading: isRescheduling }] =
    useRescheduleAppointmentMutation();

  const handleReschedule = async (appointmentId, formData) => {
    try {
      // Merge Date & Time
      const isoDate = combineDateAndTime(formData.date, formData.time);

      if (!isoDate) {
        toast.error("Please select both date and time"); // Or use a toast
        return;
      }

      // Prepare Payload
      const payload = {
        id: appointmentId,
        appointment_date: isoDate,
      };

      // Send Request
      await rescheduleAppointment(payload).unwrap();
      toast.success("Appointment Rescheduled!");
    } catch (err) {
      handleError(err, "Failed to  Resschedule Appointment");
    }
  };

  // Cancel Appointment API
  const [cancelAppointment, { isLoading: isCancelling }] =
    useCancelAppointmentMutation();

  const handleCancel = async (appointmentId, reasonString) => {
    try {
      // Prepare Payload
      const payload = {
        id: appointmentId,
        cancellation_reason: reasonString,
      };

      // Send Request
      await cancelAppointment(payload).unwrap();
      console.log("PAYLOAD", { payload });

      toast.success("Appointment Cancelled!");
    } catch (err) {
      handleError(err, "Failed to  Cancel Appointment");
    }
  };

  // Reject Appointment API
  const [rejectAppointment, { isLoading: isRejecting }] =
    useRejectAppointmentMutation();

  const handleReject = async (appointmentId, reasonString) => {
    try {
      // Prepare Payload
      const payload = {
        id: appointmentId,
        cancellation_reason: reasonString,
      };

      // Send Request
      await rejectAppointment(payload).unwrap();
      toast.success("Appointment Rejected!");
    } catch (err) {
      handleError(err, "Failed to  Rejected Appointment");
    }
  };

  //Delete Appointment API
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId).unwrap();
      toast.success("Appointment Deleted successfully");
    } catch (err) {
      handleError(err, "Failed to  Delete Appointment");
    }
  };

  // GET ALL APPOINTMENTS
  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");

  // Pagination / sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const pageSize = 10;

  // Debounce search
  const debouncedSearch = useDebounce(search, 500);

  // Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Query params
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      size: pageSize,
      order_by: "created_at",
      order_desc: sort === "newest",
    };

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    // Filter by Status based on the Active Tab
    switch (activeTab) {
      case "pending":
        params.status = "pending";
        break;
      case "upcoming":
        // Fetch future/active appointments
        params.status = "upcoming";
        break;
      case "completed":
        params.status = "completed";
        break;
      case "cancelled":
        // Fetc Rejected here
        params.status = "cancelled";
        break;
      case "rejected":
        // Fetch Cancelled here
        params.status = "rejected";
        break;
      default:
        params.status = "pending";
    }

    return params;
  }, [currentPage, debouncedSearch, sort, activeTab]);

  const {
    data: appointmentData,
    isLoading: isAppointmentLoading,
    isFetching,
  } = useGetAllAppointmentsQuery(queryParams);

  const appointments = useMemo(() => {
    if (!appointmentData?.items) return [];

    return appointmentData.items.map((item) => ({
      // Shared Fields
      id: item.id,
      patientName: item.name,
      email: item.email,
      phone: item.contact,
      status: item.status,
      notes: item.notes,

      // For Pending Table (Submission Time)
      submissionDate: item.created_at,
      preferences: item.notes,

      // For Upcoming/History Tables (Scheduled Time)
      confirmedDate: item.appointment_date,
      confirmedTime: item.appointment_date
        ? new Date(item.appointment_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",

      completedDate: item.updated_at,
      cancellationReason: item.cancellation_reason,

      // Center Info (Placeholder logic until API sends center details)
      centerName: "Center Info Missing",
      centerId: item.center_id || "unknown",
    }));
  }, [appointmentData]);

  const totalPages = Math.ceil((appointmentData?.total || 0) / pageSize) || 1;

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
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
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
                    value="upcoming"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Upcoming Appointments</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="completed"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Completed Appointments</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="cancelled"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Cancelled Appointments</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="rejected"
                    className="gap-2 rounded-md px-4 data-[state=active]:bg-accent/10 data-[state=active]:text-accent data-[state=active]:border data-[state=active]:border-accent/20"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Rejected Appointments</span>
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
                  {isAppointmentLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                  ) : (
                    <PendingRequestsTable
                      requests={appointments}
                      onConfirm={handleConfirm}
                      onReject={handleReject}
                      isConfirming={isConfirming}
                      isRejecting={isRejecting}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Tabs Content - Upcoming */}
            <TabsContent value="upcoming" className="mt-0 p-6">
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
                  {isAppointmentLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                  ) : (
                    <UpcomingAppointmentTable
                      appointments={appointments}
                      onReschedule={handleReschedule}
                      onCancel={handleCancel}
                      isRescheduling={isRescheduling}
                      isCancelling={isCancelling}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Tabs Content - Completed */}
            <TabsContent value="completed" className="mt-0 p-6">
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
                  <CompletedAppointmentTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Tabs Content - Cancelled */}
            <TabsContent value="cancelled" className="mt-0 p-6">
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
                  <CancelledTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Tabs Content - Rejected */}
            <TabsContent value="rejected" className="mt-0 p-6">
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
                  <RejectedTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>

          {/* Pagination Controls */}
          {!isAppointmentLoading && appointmentData?.items?.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-muted/5">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isFetching}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || isFetching}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Schedule New Appointment Modal */}
      <ScheduleAppointmentModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onSchedule={handleScheduleNew}
        isLoading={isScheduling}
      />
    </DashboardLayout>
  );
}

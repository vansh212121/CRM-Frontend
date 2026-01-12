import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock, CheckCircle2, Plus, CalendarDays } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PendingRequestsTable } from "@/components/appointments/tables/PendingRequestsTable";
import { CompletedAppointmentTable } from "@/components/appointments/tables/CompletedAppointmentTable";
import { UpcomingAppointmentTable } from "@/components/appointments/tables/UpcomingAppointmentTable";
import { CancelledTable } from "@/components/appointments/tables/CancelledScheduledTable";
import { ScheduleAppointmentModal } from "@/components/appointments/modals/ScheduleAppointmentModal";
import { useDebounce } from "@/hooks/useDebounce";
import { RejectedTable } from "@/components/appointments/tables/RejectedAppointmentTable";
import {
  useCancelAppointmentMutation,
  useCompleteAppointmentMutation,
  useConfirmAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAllAppointmentsQuery,
  useRejectAppointmentMutation,
  useRescheduleAppointmentMutation,
  useScheduleAppointmentMutation,
} from "@/features/api/appointmentApi";
import { toast } from "sonner";
import { handleError } from "@/lib/handleError";
import { AppointmentToolbar } from "@/components/appointments/AppointmentToolbar";

export default function Appointments() {
  // Helper function to merge Date object + Time string into ISO string
  const combineDateAndTime = (date, timeString) => {
    if (!date || !timeString) return null;

    const dateStr = format(date, "yyyy-MM-dd");

    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = parseInt(hours, 10) + 12;

    const formattedHours = hours.toString().padStart(2, "0");

    return `${dateStr}T${formattedHours}:${minutes}:00Z`;
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
        toast.error("Please select both date and time");
        return;
      }

      // Prepare Payload
      const payload = {
        name: formData.patientName,
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

  //Complete Appointment API
  const [completeAppointment, { isLoading: isCompleting }] =
    useCompleteAppointmentMutation();

  const handleComplete = async (appointmentId, notes) => {
    try {
      // Prepare Payload
      const payload = {
        id: appointmentId,
        notes: notes || "",
      };
      // Send Request
      await completeAppointment(payload).unwrap();

      toast.success("Appointment marked as Completed!");
    } catch (err) {
      handleError(err, "Failed to  mark Appointment as Completed!");
    }
  };

  // GET ALL APPOINTMENTS
  const [dateRange, setDateRange] = useState(undefined);
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
        params.status = "upcoming";
        break;
      case "completed":
        params.status = "completed";
        break;
      case "cancelled":
        params.status = "cancelled";
        break;
      case "rejected":
        params.status = "rejected";
        break;
      default:
        params.status = "pending";
    }

    if (dateRange?.from) {
      const fromDateStr = format(dateRange.from, "yyyy-MM-dd");
      // If no 'to' date, default to single day filter (start = end)
      const toDateStr = dateRange.to
        ? format(dateRange.to, "yyyy-MM-dd")
        : fromDateStr;

      // Decide which backend fields to use
      switch (activeTab) {
        case "pending":
          // Filter by Creation Date
          params.created_after = fromDateStr;
          params.created_before = toDateStr;
          break;

        case "completed":
        case "cancelled":
        case "rejected":
          // Filter by Update/Action Date
          params.updated_after = fromDateStr;
          params.updated_before = toDateStr;
          break;

        case "upcoming":
        default:
          // Filter by Appointment Schedule Date
          params.start_date = fromDateStr;
          params.end_date = toDateStr;
          break;
      }
    }

    return params;
  }, [currentPage, debouncedSearch, sort, activeTab, dateRange, pageSize]);

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

  return (
    <DashboardLayout>
      <div className="space-y-12">
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
              </div>
            </div>

            <div className="px-6 pt-6">
              <AppointmentToolbar
                activeTab={activeTab}
                search={search}
                setSearch={setSearch}
                dateRange={dateRange}
                setDateRange={setDateRange}
                total={appointmentData?.total || 0}
                isLoading={isAppointmentLoading}
              />
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
                  {/* Table */}
                  <PendingRequestsTable
                    requests={appointments}
                    onConfirm={handleConfirm}
                    onReject={handleReject}
                    isConfirming={isConfirming}
                    isRejecting={isRejecting}
                    isLoading={isAppointmentLoading || isFetching}
                  />
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
                  {/* Table */}
                  <UpcomingAppointmentTable
                    appointments={appointments}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel}
                    onComplete={handleComplete}
                    isRescheduling={isRescheduling}
                    isCancelling={isCancelling}
                    isCompleting={isCompleting}
                    isLoading={isAppointmentLoading || isFetching}
                  />
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
                  {/* Table */}
                  <CompletedAppointmentTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    isLoading={isAppointmentLoading || isFetching}
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
                  {/* Table */}
                  <CancelledTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    isLoading={isAppointmentLoading || isFetching}
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
                  {/* Table */}
                  <RejectedTable
                    appointments={appointments}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                    isLoading={isAppointmentLoading || isFetching}
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

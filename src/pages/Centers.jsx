import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Download,
  Search,
  Filter,
  Building2,
  Users,
  Calendar,
  Activity,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CentersTable } from "@/components/centers/CentersTable";
import { CenterFormModal } from "@/components/centers/CenterFormModal";
import { CenterViewModal } from "@/components/centers/CenterViewModal";
import { DeleteCenterDialog } from "@/components/centers/DeleteCenterModal";
import { mockCenters } from "@/data/mockData";

export default function Centers() {
  const [centers, setCenters] = useState(mockCenters);
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [viewingCenter, setViewingCenter] = useState(null);
  const [deletingCenter, setDeletingCenter] = useState(null);

  const districts = [...new Set(centers.map((c) => c.district))];

  const filteredCenters = centers.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict =
      districtFilter === "all" || center.district === districtFilter;

    return matchesSearch && matchesDistrict;
  });

  // Calculate stats
  const stats = {
    totalCenters: centers.length,
    activeCenters: centers.filter((c) => c.active).length,
    totalPatients: centers.reduce(
      (sum, center) => sum + (center.patientCount || 0),
      0
    ),
    totalAppointments: centers.reduce(
      (sum, center) => sum + (center.appointmentCount || 0),
      0
    ),
  };

  const handleAddCenter = (data) => {
    const newCenter = {
      ...data,
      id: `ctr-${Date.now()}`,
      active: true,
      patientCount: 0,
      appointmentCount: 0,
    };

    setCenters((prev) => [...prev, newCenter]);
    setIsAddModalOpen(false);
  };

  const handleEditCenter = (data) => {
    if (!editingCenter) return;

    setCenters((prev) =>
      prev.map((c) =>
        c.id === editingCenter.id ? { ...data, id: editingCenter.id } : c
      )
    );

    setEditingCenter(null);
  };

  const handleDeleteCenter = () => {
    if (!deletingCenter) return;

    setCenters((prev) => prev.filter((c) => c.id !== deletingCenter.id));

    setDeletingCenter(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                    Centers
                  </h1>
                  <p className="text-sm text-muted-foreground/80">
                    Manage clinical centers and facilities
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground/80">
                  {stats.activeCenters} active
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 rounded-lg border-border/40 hover:border-accent/30 hover:bg-accent/5 gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="rounded-lg border border-border/50"
                >
                  <DropdownMenuItem className="text-sm rounded-lg hover:bg-accent/10">
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm rounded-lg hover:bg-accent/10">
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm rounded-lg hover:bg-accent/10">
                    Export as CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Center
              </Button>
            </div>
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
                        Total Centers
                      </p>
                      <p className="text-2xl font-semibold text-foreground mt-1">
                        {stats.totalCenters}
                      </p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <Building2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-accent w-full"></div>
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
                        Active Centers
                      </p>
                      <p className="text-2xl font-semibold text-success mt-1">
                        {stats.activeCenters}
                      </p>
                    </div>
                    <div className="rounded-lg bg-success/10 p-2 border border-success/20">
                      <Activity className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-success w-full"></div>
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
                        Total Patients
                      </p>
                      <p className="text-2xl font-semibold text-foreground mt-1">
                        {stats.totalPatients}
                      </p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <Users className="h-4 w-4 text-accent" />
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
              transition={{ delay: 0.25 }}
            >
              <Card className="border-border/40 hover:border-border/60 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground/80">
                        Today's Appointments
                      </p>
                      <p className="text-2xl font-semibold text-accent mt-1">
                        {stats.totalAppointments}
                      </p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-accent w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="rounded-xl border border-border/40 bg-gradient-to-r from-card to-card/90 p-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  placeholder="Search centers by name, district, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="w-full lg:w-48 h-10 rounded-lg border-border/40">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground/60" />
                    <SelectValue placeholder="Filter by district" />
                  </div>
                </SelectTrigger>

                <SelectContent className="rounded-lg border border-border/50">
                  <SelectItem value="all" className="text-sm rounded-lg">
                    All Districts
                  </SelectItem>
                  {districts.map((district) => (
                    <SelectItem
                      key={district}
                      value={district}
                      className="text-sm rounded-lg"
                    >
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="h-4 w-px bg-border/30" />

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground/80">
                  Showing
                </span>
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-1 border-accent/30 text-accent bg-accent/10"
                >
                  {filteredCenters.length} centers
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                All Centers
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground/80">
                  Sorted by:
                </span>
                <span className="text-xs font-medium text-foreground">
                  Recently Added
                </span>
              </div>
            </div>

            <CentersTable
              centers={filteredCenters}
              onView={(center) => setViewingCenter(center)}
              onEdit={(center) => setEditingCenter(center)}
              onDelete={(center) => setDeletingCenter(center)}
            />
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <CenterFormModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddCenter}
        title="Add New Center"
      />

      <CenterFormModal
        open={!!editingCenter}
        onOpenChange={(open) => !open && setEditingCenter(null)}
        onSubmit={handleEditCenter}
        initialData={editingCenter || undefined}
        title="Edit Center"
      />

      <CenterViewModal
        center={viewingCenter}
        open={!!viewingCenter}
        onOpenChange={(open) => !open && setViewingCenter(null)}
      />

      <DeleteCenterDialog
        center={deletingCenter}
        open={!!deletingCenter}
        onOpenChange={(open) => !open && setDeletingCenter(null)}
        onConfirm={handleDeleteCenter}
      />
    </DashboardLayout>
  );
}

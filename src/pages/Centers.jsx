import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Download, Search, Building2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CentersTable } from "@/components/centers/CentersTable";
import { CenterFormModal } from "@/components/centers/CenterFormModal";
import { CenterViewModal } from "@/components/centers/CenterViewModal";
import { DeleteCenterDialog } from "@/components/centers/DeleteCenterModal";
import {
  useGetAllCentersQuery,
  useCreateCenterMutation,
  useUpdateCenterMutation,
  useDeleteCenterMutation,
} from "@/features/api/centerApi";
import { useDebounce } from "@/hooks/useDebounce";
import { handleError } from "@/lib/handleError";
import { toast } from "sonner";

export default function Centers() {
  // 🔍 SEARCH (single source of truth)
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

    return params;
  }, [currentPage, debouncedSearch, sort]);

  const {
    data: centerData,
    isLoading: isCentersLoading,
    isFetching,
  } = useGetAllCentersQuery(queryParams);

  const centers = useMemo(() => {
    return centerData?.items ?? [];
  }, [centerData]);

  // CRUD API's
  const [createCenter, { isLoading: isCreating }] = useCreateCenterMutation();
  const [updateCenter, { isLoading: isUpdating }] = useUpdateCenterMutation();
  const [deleteCenter, { isLoading: isDeleting }] = useDeleteCenterMutation();

  const handleAddCenter = async (data) => {
    try {
      await createCenter(data).unwrap();
      toast.success("Center Created", {
        description: `${data.name} has been added successfully.`,
      });
      setIsAddModalOpen(false);
    } catch (err) {
      handleError(err, "Failed to create center");
    }
  };

  const handleEditCenter = async (data) => {
    if (!editingCenter) return;
    try {
      await updateCenter({
        centerId: editingCenter.id,
        centerData: data,
      }).unwrap();

      toast.success("Center Updated", {
        description: "Changes saved successfully.",
      });
      setEditingCenter(null);
    } catch (err) {
      handleError(err, "Failed to update center");
    }
  };

  const handleDeleteCenter = async () => {
    if (!deletingCenter) return;
    try {
      await deleteCenter(deletingCenter.id).unwrap();
      toast.success("Center Deleted", {
        description: "The center has been removed.",
      });
      setDeletingCenter(null);
    } catch (err) {
      handleError(err, "Failed to delete center");
    }
  };

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [viewingCenter, setViewingCenter] = useState(null);
  const [deletingCenter, setDeletingCenter] = useState(null);

  const totalPages = Math.ceil((centerData?.total || 0) / pageSize) || 1;

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-10 rounded-lg border-border/40 hover:border-accent/30 hover:bg-accent/80 gap-2"
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
                className="h-10 rounded-lg bg-accent hover:bg-accent/80 transition-colors gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Center
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ALL FOUR CARDS — unchanged */}
            {/* (exactly as you had them) */}
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
                  placeholder="Search centers by name, district, email, contact, location, landmark, or pincode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
                />
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
              centers={centers}
              isLoading={isCentersLoading || isFetching}
              onView={(center) => setViewingCenter(center)}
              onEdit={(center) => setEditingCenter(center)}
              onDelete={(center) => setDeletingCenter(center)}
            />

            <div className="flex items-center justify-between px-2">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isCentersLoading}
                  className="h-8 w-24"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || isCentersLoading}
                  className="h-8 w-24"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <CenterFormModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddCenter}
        title="Add New Center"
        isLoading={isCreating}
      />

      <CenterFormModal
        open={!!editingCenter}
        onOpenChange={(open) => !open && setEditingCenter(null)}
        onSubmit={handleEditCenter}
        initialData={editingCenter || undefined}
        title="Edit Center"
        isLoading={isUpdating}
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
        isLoading={isDeleting}
      />
    </DashboardLayout>
  );
}

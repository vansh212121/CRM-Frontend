import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DateRangeFilter } from "./DateRangeFilter";

export function AppointmentToolbar({
  activeTab,
  search,
  setSearch,
  dateRange, 
  setDateRange, 
  total,
  isLoading,
}) {
  // Dynamic Placeholder based on Tab
  const getPlaceholder = () => {
    switch (activeTab) {
      case "pending":
        return "Search pending requests...";
      case "upcoming":
        return "Search scheduled appointments...";
      case "completed":
        return "Search completed records...";
      case "cancelled":
        return "Search cancelled records...";
      case "rejected":
        return "Search rejected records...";
      default:
        return "Search appointments...";
    }
  };

  return (
    <div className="rounded-lg border border-border/40 bg-gradient-to-r from-card to-card/90 p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Search Input Group */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            placeholder={getPlaceholder()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-lg border-border/40 focus:border-accent/50"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* ✅ Date Filter */}
          <DateRangeFilter
            date={dateRange}
            setDate={setDateRange}
            className="flex-1 sm:flex-none"
          />

          <div className="h-8 w-px bg-border/40 hidden sm:block" />

          {/* Total Badge */}
          <Badge
            variant="outline"
            className="h-10 px-4 py-2 border-accent/20 text-accent bg-accent/5 whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin mr-2" />
            ) : (
              <span className="font-medium">{total || 0}</span>
            )}
            <span className="ml-1 opacity-70 font-normal">records</span>
          </Badge>
        </div>
      </div>
    </div>
  );
}

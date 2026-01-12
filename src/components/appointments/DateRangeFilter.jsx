import * as React from "react";
import {
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
} from "date-fns";
import { Calendar as CalendarIcon, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangeFilter({ date, setDate, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState(date);

  useEffect(() => {
    if (isOpen) {
      setTempDate(date);
    }
  }, [isOpen, date]);

  const handleApply = () => {
    setDate(tempDate);
    setIsOpen(false);
  };

  const handlePresetChange = (value) => {
    const today = new Date();
    let newDate = { from: undefined, to: undefined };

    switch (value) {
      case "today":
        newDate = { from: startOfDay(today), to: endOfDay(today) };
        break;
      case "thisWeek":
        newDate = { from: startOfWeek(today), to: endOfWeek(today) };
        break;
      case "thisMonth":
        newDate = { from: startOfMonth(today), to: endOfMonth(today) };
        break;
      case "last7":
        newDate = { from: subDays(today, 7), to: today };
        break;
      default:
        break;
    }

    // Update both local and parent state for presets
    setTempDate(newDate);
    setDate(newDate);
    setIsOpen(false);
  };

  const clearFilter = (e) => {
    e.stopPropagation();
    setDate(undefined);
    setTempDate(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal h-10 bg-background hover:text-black border-border/40 hover:bg-accent/10 hover:border-accent/30 transition-colors",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-accent/70" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Filter by Date</span>
            )}

            {date?.from && (
              <div
                role="button"
                onClick={clearFilter}
                className="ml-auto hover:bg-destructive/10 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col sm:flex-row">
            {/* Presets Sidebar */}
            <div className="flex flex-col gap-1 p-3 border-b sm:border-r sm:border-b-0 border-border/40 min-w-[140px]">
              <span className="text-xs font-medium text-muted-foreground mb-1 px-2">
                Quick Filters
              </span>
              {[
                { label: "Today", value: "today" },
                { label: "This Week", value: "thisWeek" },
                { label: "This Month", value: "thisMonth" },
                { label: "Last 7 Days", value: "last7" },
              ].map((preset) => (
                <Button
                  key={preset.value}
                  variant="ghost"
                  className="justify-start h-8 text-sm font-normal px-2"
                  onClick={() => handlePresetChange(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Calendar & Footer */}
            <div>
              <div className="p-3">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={tempDate?.from}
                  selected={tempDate}
                  onSelect={setTempDate} // Only updates local state
                  numberOfMonths={1}
                  className="rounded-md border border-border/30"
                />
              </div>

              {/* ✅ NEW: Apply Button Footer */}
              <div className="border-t border-border/40 p-3 flex justify-end gap-2 bg-muted/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 px-3 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!tempDate?.from}
                  className="h-8 px-3 text-xs bg-accent hover:bg-accent/90 gap-1"
                >
                  <Check className="h-3 w-3" />
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

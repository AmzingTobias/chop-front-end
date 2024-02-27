import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface IDatePickerProps {
  dateRange: DateRange | undefined;
  fromDate: Date | undefined;
  setDateRange: SelectRangeEventHandler;
}

const DatePicker: React.FC<IDatePickerProps> = ({
  dateRange,
  fromDate,
  setDateRange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"secondary"}
          className={cn(
            "justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from && dateRange.to ? (
            format(dateRange.from, "PPP") + " - " + format(dateRange.to, "PPP")
          ) : (
            <span className="text-secondary-foreground">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded-md border w-fit"
          fromDate={fromDate}
          toDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

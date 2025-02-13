import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Import the Turkish locale if you're using it
import { CalendarIcon } from "lucide-react"; // Import the icon if necessary
import * as React from "react";
import { Button } from "@/components/ui/button"; // Adjust this import based on your button component location
import { Calendar } from "@/components/ui/calendar"; // Adjust this import based on your calendar component location
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Adjust as needed
import { cn } from "@/lib/utils"; // Adjust the path for the utility

interface ICustomDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | undefined) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDisabled?: boolean;
}

export function CustomDatePicker({
  selectedDate,
  onDateChange,
  isOpen,
  setIsOpen,
  isDisabled = false,
}: ICustomDatePickerProps) {
  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild disabled={isDisabled}>
        <Button
          className={cn(
            "w-full pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
          variant="outline"
        >
          {selectedDate ? (
            format(selectedDate, "PPP", { locale: tr })
          ) : (
            <span>Tarih Seçin</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          locale={tr}
          mode="single"
          onSelect={(date) => {
            onDateChange(date);
            setIsOpen(false);
          }}
          selected={selectedDate ?? undefined}
        />
      </PopoverContent>
    </Popover>
  );
}

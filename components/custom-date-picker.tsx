import * as React from "react";
import { Button } from "@/components/ui/button"; // Adjust this import based on your button component location
import { Calendar } from "@/components/ui/calendar"; // Adjust this import based on your calendar component location
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Adjust as needed
import { CalendarIcon } from "lucide-react"; // Import the icon if necessary
import { format } from "date-fns";
import { tr } from "date-fns/locale"; // Import the Turkish locale if you're using it
import { cn } from "@/lib/utils"; // Adjust the path for the utility

interface CustomDatePickerProps {
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
}: CustomDatePickerProps) {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={isDisabled}>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate ? (
            format(selectedDate, "PPP", { locale: tr })
          ) : (
            <span>Tarih Seçin</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={(date) => {
            onDateChange(date);
            setIsOpen(false);
          }}
          initialFocus
          locale={tr}
        />
      </PopoverContent>
    </Popover>
  );
}

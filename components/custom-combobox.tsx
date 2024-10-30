'use client';

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Option } from '@/components/talep-ekran/multiple-selector';
import { cn } from '@/lib/utils';

interface KisiComboboxProps {
  placeholder: string;  // Placeholder text
  searchPlaceholder: string;  // Search placeholder text
  onValueChange: (value: string) => void;  // Prop to handle value change
  Options: Option[];  // Options to be displayed in the combobox
  disabled?: boolean;  // Disabled state
}

export default function CustomCombobox({ placeholder, searchPlaceholder, onValueChange, Options, disabled = false }: KisiComboboxProps) {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <>
      {/* <FormLabel>Kişi Ad</FormLabel> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? Options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>Kişi Bulunamadı</CommandEmpty>
              <CommandGroup>
                {Options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      const newValue = currentValue === value ? "" : currentValue;
                      setValue(newValue)
                      setOpen(false)
                      onValueChange(newValue)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}

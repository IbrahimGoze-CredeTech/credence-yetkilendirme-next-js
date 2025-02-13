'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react'
import type { Option } from '@/components/talep-ekran/multiple-selector';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface IKisiComboboxProps {
  placeholder: string;  // Placeholder text
  searchPlaceholder: string;  // Search placeholder text
  onValueChange: (value: string) => void;  // Prop to handle value change
  Options: Option[];  // Options to be displayed in the combobox
  disabled?: boolean;  // Disabled state
}

export default function CustomCombobox({ placeholder, searchPlaceholder, onValueChange, Options, disabled = false }: IKisiComboboxProps) {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <>
      {/* <FormLabel>Kişi Ad</FormLabel> */}
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            aria-expanded={open}
            className="w-full justify-between"
            role="combobox"
            variant="outline"
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
                    onSelect={(currentValue) => {
                      const newValue = currentValue === value ? "" : currentValue;
                      setValue(newValue)
                      setOpen(false)
                      onValueChange(newValue)
                    }}
                    value={option.value}
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

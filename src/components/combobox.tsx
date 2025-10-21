
'use client';

import * as React from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type ComboboxItem = { value: string; label: string };

interface ComboboxGroup {
  label: string;
  items: ComboboxItem[];
}

type ComboboxData = ComboboxItem[] | ComboboxGroup[];

function isGrouped(data: ComboboxData): data is ComboboxGroup[] {
  return data.length > 0 && 'items' in data[0] && 'label' in data[0];
}

function getAllItems(data: ComboboxData): ComboboxItem[] {
  if (isGrouped(data)) {
    return data.flatMap(group => group.items);
  }
  return data;
}


interface ComboboxProps {
  items: ComboboxData;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  emptyPlaceholder: string;
  name?: string;
}

export function Combobox({
  items: data,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyPlaceholder,
  name,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const allItems = React.useMemo(() => getAllItems(data), [data]);

  const renderItems = (items: ComboboxItem[]) => {
    return items.map((item) => (
      <CommandItem
        key={item.value}
        value={item.value}
        onSelect={(currentValue) => {
          onChange(currentValue === value ? '' : currentValue);
          setOpen(false);
        }}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            value === item.value ? 'opacity-100' : 'opacity-0'
          )}
        />
        {item.label}
      </CommandItem>
    ));
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? allItems.find((item) => item.value.toLowerCase() === value.toLowerCase())?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
              {isGrouped(data) ? (
                data.map((group, index) => (
                  <React.Fragment key={group.label}>
                    <CommandGroup heading={group.label}>
                      {renderItems(group.items)}
                    </CommandGroup>
                    {index < data.length - 1 && <CommandSeparator />}
                  </React.Fragment>
                ))
              ) : (
                <CommandGroup>
                  {renderItems(data)}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Hidden input to store the value for form submission */}
      <input type="hidden" name={name} value={value} />
    </>
  );
}

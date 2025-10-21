
'use client';

import { Cpu, CircuitBoard, MemoryStick, Puzzle, HardDrive, PcCase, Power, Fan } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Combobox } from './combobox';
import { ComponentDetailsDialog } from './component-details-dialog';
import { componentsData } from '@/lib/components-data';

const iconMap: { [key: string]: React.ElementType } = {
  cpu: Cpu,
  cooler: Fan,
  gpu: Puzzle,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Power,
  case: PcCase,
};

type ComboboxItem = { value: string; label: string };
interface ComboboxGroup {
  label: string;
  items: ComboboxItem[];
}
type ComboboxData = ComboboxItem[] | ComboboxGroup[];

interface ComponentSelectorProps {
  category: keyof typeof componentsData;
  label: string;
  value: string;
  onChange: (value: string) => void;
  data: ComboboxData;
}

const findLabel = (data: ComboboxData, value: string): string => {
    if (!value) return '';
    const allItems = 'items' in data[0] 
        ? (data as ComboboxGroup[]).flatMap(group => group.items)
        : (data as ComboboxItem[]);
    const item = allItems.find(i => i.value.toLowerCase() === value.toLowerCase());
    return item ? item.label : value;
};

export function ComponentSelector({ category, label, value, onChange, data }: ComponentSelectorProps) {
  const Icon = iconMap[category] || Cpu;

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={category} className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Combobox
          name={category}
          items={data}
          value={value}
          onChange={onChange}
          placeholder={`Selecione um(a) ${label}`}
          searchPlaceholder={`Procurar ${label}...`}
          emptyPlaceholder={`Nenhum(a) ${label} encontrado(a).`}
        />
        <ComponentDetailsDialog
          componentValue={value}
          componentLabel={findLabel(data, value)}
          category={category}
          disabled={!value}
        />
      </div>
    </div>
  );
}

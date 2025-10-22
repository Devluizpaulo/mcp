
'use client';

import { Cpu, CircuitBoard, MemoryStick, Puzzle, HardDrive, PcCase, Power, Fan, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Combobox } from './combobox';
import { ComponentDetailsDialog } from './component-details-dialog';
import { useEffect, useState } from 'react';
import { getComponentsByType, type Component } from '@/app/actions';

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

type Category = keyof typeof iconMap;

interface ComponentSelectorProps {
  category: Category;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ComponentSelector({ category, label, value, onChange }: ComponentSelectorProps) {
  const Icon = iconMap[category] || Cpu;
  const [items, setItems] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchComponents = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getComponentsByType(category);
      if(result.data) {
        setItems(result.data);
      } else {
        setError(result.error || 'Falha ao carregar componentes.');
      }
      setIsLoading(false);
    }
    fetchComponents();
  }, [category]);

  const comboboxItems = items.map(item => ({ value: item.name, label: item.name }));

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={category} className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        {isLoading ? (
            <div className="flex items-center justify-center w-full h-10 border rounded-md text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
            </div>
        ) : error ? (
            <div className="flex items-center justify-center w-full h-10 border rounded-md text-sm text-destructive">
                {error}
            </div>
        ) : (
            <Combobox
              name={category}
              items={comboboxItems}
              value={value}
              onChange={onChange}
              placeholder={`Selecione um(a) ${label}`}
              searchPlaceholder={`Procurar ${label}...`}
              emptyPlaceholder={`Nenhum(a) ${label} encontrado(a).`}
            />
        )}
        <ComponentDetailsDialog
          componentName={value}
          disabled={!value || isLoading}
        />
      </div>
    </div>
  );
}

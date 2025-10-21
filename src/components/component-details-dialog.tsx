
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { getComponentDetails } from '@/app/actions';
import { AiResponseDisplay } from './ai-response-display';

interface ComponentDetailsDialogProps {
  componentName: string;
  disabled: boolean;
}

export function ComponentDetailsDialog({
  componentName,
  disabled,
}: ComponentDetailsDialogProps) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchDetails = useCallback(async () => {
    if (!componentName) return;

    setIsLoading(true);
    setError(null);
    setDetails(null);

    const result = await getComponentDetails(componentName);

    if (result.error) {
      setError(result.error);
    } else {
      setDetails(result.details);
    }

    setIsLoading(false);
  }, [componentName]);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      handleFetchDetails();
    } else {
        setDetails(null);
        setError(null);
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          disabled={disabled}
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Ver detalhes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Componente</DialogTitle>
          <DialogDescription>{componentName}</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Analisando componente...</span>
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
          {details && <AiResponseDisplay content={details} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}

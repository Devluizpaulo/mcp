
'use client';

import {
  useUser,
  useCollection,
  useFirestore,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  PlusCircle,
  MoreHorizontal,
  FilePenLine,
  Trash2,
  Loader2,
  Inbox,
  LogIn,
  Info,
  DollarSign,
  Zap,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { AiResponseDisplay } from './ai-response-display';
import { Progress } from './ui/progress';

interface UserConfiguration {
  id: string;
  name: string;
  description: string;
  aiResponse?: string;
  details: {
    type: 'build' | 'upgrade';
    totalCost?: number;
    performanceScore?: number;
    upgradeCost?: number;
    currentValue?: number;
  },
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  description: z.string().optional(),
});

type BuildFormValues = z.infer<typeof formSchema>;

function BuildForm({
  configuration,
  onFinished,
}: {
  configuration?: UserConfiguration;
  onFinished: () => void;
}) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<BuildFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: configuration?.name || '',
      description: configuration?.description || '',
    },
  });

  const onSubmit = (values: BuildFormValues) => {
    if (!user) return;
    const collectionRef = collection(firestore, `users/${user.uid}/configurations`);
    
    const data: Partial<UserConfiguration> = {
      ...values,
      updatedAt: serverTimestamp() as any,
    };

    if (configuration) {
      const docRef = doc(collectionRef, configuration.id);
      updateDocumentNonBlocking(docRef, data);
      toast({ title: 'Sucesso!', description: 'Build atualizada.' });
    } else {
      // Manual creation doesn't have AI response or details
      addDocumentNonBlocking(collectionRef, {
        ...data,
        aiResponse: "Criado manualmente.",
        details: { type: 'build' },
        createdAt: serverTimestamp(),
      });
      toast({ title: 'Sucesso!', description: 'Nova build salva.' });
    }
    onFinished();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Build</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Meu PC Gamer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: Build para jogos em 4K e streaming" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}

function ViewBuildDialog({ config }: { config: UserConfiguration }) {
    const isUpgrade = config.details?.type === 'upgrade';
    const isBuild = config.details?.type === 'build';

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <Info className="mr-2 h-4 w-4" /> Ver Detalhes
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{config.name}</DialogTitle>
                    <DialogDescription>{config.description}</DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
                   {isBuild && config.details.totalCost && (
                     <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
                            <p className="text-sm text-muted-foreground mb-1">Custo Total</p>
                            <p className="text-2xl font-bold text-primary flex items-center gap-2">
                               <DollarSign /> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(config.details.totalCost)}
                            </p>
                        </div>
                         <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-sm text-muted-foreground flex items-center gap-2"><Zap /> Performance</p>
                                <p className="text-lg font-bold text-primary">{config.details.performanceScore}/10</p>
                            </div>
                            <Progress value={(config.details.performanceScore || 0) * 10} className="h-2 [&>div]:bg-primary" />
                        </div>
                    </div>
                   )}
                   {isUpgrade && config.details.currentValue && (
                     <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
                            <p className="text-sm text-muted-foreground mb-1">Valor do PC Atual</p>
                            <p className="text-2xl font-bold text-primary flex items-center gap-2">
                               <DollarSign /> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(config.details.currentValue)}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center rounded-lg bg-card-foreground/5 p-4 border">
                            <p className="text-sm text-muted-foreground mb-1">Custo do Upgrade</p>
                            <p className="text-2xl font-bold text-accent flex items-center gap-2">
                               <DollarSign /> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(config.details.upgradeCost || 0)}
                            </p>
                        </div>
                    </div>
                   )}


                    {config.aiResponse ? (
                        <AiResponseDisplay content={config.aiResponse} />
                    ) : (
                        <p className="text-muted-foreground text-center">Nenhuma configuração detalhada foi salva para esta build.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function MyBuildsCrud() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<UserConfiguration | undefined>(undefined);
  const { toast } = useToast();

  const configurationsCollection = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/configurations`);
  }, [firestore, user]);

  const {
    data: configurations,
    isLoading: isLoadingCollection,
    error,
  } = useCollection<UserConfiguration>(configurationsCollection);

  if (isUserLoading || (isLoadingCollection && !configurations)) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando suas builds...</span>
      </div>
    );
  }
  
  if (!user) {
    // This case is handled by the page, but as a fallback:
     return (
      <Alert>
        <LogIn className="h-4 w-4" />
        <AlertTitle>Login Necessário</AlertTitle>
        <AlertDescription>
          <Button asChild variant="link" className="p-0 h-auto">
            <Link href="/login?redirect=/my-builds">Faça login</Link>
          </Button>
          &nbsp;para ver e gerenciar suas builds.
        </AlertDescription>
      </Alert>
    );
  }

  const handleDelete = (id: string) => {
    if (!user) return;
    const docRef = doc(firestore, `users/${user.uid}/configurations`, id);
    deleteDocumentNonBlocking(docRef);
    toast({
      title: 'Excluído!',
      description: 'Sua build foi removida com sucesso.',
      variant: 'destructive',
    });
  };

  const handleEdit = (config: UserConfiguration) => {
    setEditingConfig(config);
    setFormOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingConfig(undefined);
    setFormOpen(true);
  };

  const onFormFinished = () => {
    setFormOpen(false);
    setEditingConfig(undefined);
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={(isOpen) => { if (!isOpen) onFormFinished() }}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Nova Build
          </Button>
        </div>

        {error && (
            <Alert variant="destructive">
                <FilePenLine className="h-4 w-4" />
                <AlertTitle>Erro ao carregar</AlertTitle>
                <AlertDescription>
                   {error.message}
                </AlertDescription>
            </Alert>
        )}
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descrição
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Atualizado em
                </TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configurations && configurations.length > 0 ? (
                configurations.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell className="font-medium">{config.name}</TableCell>
                    <TableCell className="hidden max-w-sm truncate md:table-cell">
                      {config.description}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {new Date(
                        config.updatedAt.seconds * 1000
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <ViewBuildDialog config={config} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(config)}>
                            <FilePenLine className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
                            onClick={() => handleDelete(config.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Inbox className="h-10 w-10" />
                        <span>Nenhuma build encontrada.</span>
                        <span className="text-xs">Comece salvando uma nova configuração.</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingConfig ? 'Editar Build' : 'Adicionar Nova Build'}
          </DialogTitle>
           <DialogDescription>
            {editingConfig ? 'Atualize os detalhes da sua build.' : 'Adicione uma build manualmente para seu registro.'}
          </DialogDescription>
        </DialogHeader>
        <BuildForm configuration={editingConfig} onFinished={onFormFinished} />
      </DialogContent>
    </Dialog>
  );
}

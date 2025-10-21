'use client';

import { MyBuildsCrud } from '@/components/my-builds-crud';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LogIn } from 'lucide-react';

export default function MyBuildsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login?redirect=/my-builds');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="mx-auto w-full max-w-2xl">
          <Alert>
            <LogIn className="h-4 w-4" />
            <AlertTitle>Acesso Restrito</AlertTitle>
            <AlertDescription>
              Você precisa fazer login para acessar suas builds salvas.
              <Button asChild variant="link" className="p-0 h-auto ml-1">
                <Link href="/login?redirect=/my-builds">Ir para a página de login.</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Minhas Builds Salvas</CardTitle>
            <CardDescription>
              Gerencie, edite ou delete suas configurações de PC salvas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MyBuildsCrud />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

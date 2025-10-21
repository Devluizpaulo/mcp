'use client';
import { useState, useEffect, useTransition } from 'react';
import { useAuth, useUser } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Ghost, LogOut, Mail, KeyRound } from 'lucide-reac t';
import { useSearchParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function AuthForm() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      router.replace(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleAuthAction = (action: 'signUp' | 'signIn' | 'anonymous') => {
    startTransition(async () => {
      setError(null);
      try {
        if (action === 'signUp') {
          await createUserWithEmailAndPassword(auth, email, password);
        } else if (action === 'signIn') {
          await signInWithEmailAndPassword(auth, email, password);
        } else if (action === 'anonymous') {
          await signInAnonymously(auth);
        }
        router.push(redirectUrl);
      } catch (err: any) {
        let friendlyMessage = 'Ocorreu um erro. Verifique seus dados e tente novamente.';
        if (err.code === 'auth/user-not-found') {
            friendlyMessage = 'Nenhum usuário encontrado com este e-mail.';
        } else if (err.code === 'auth/wrong-password') {
            friendlyMessage = 'Senha incorreta. Por favor, tente novamente.';
        } else if (err.code === 'auth/email-already-in-use') {
            friendlyMessage = 'Este e-mail já está em uso por outra conta.';
        } else if (err.code === 'auth/weak-password') {
            friendlyMessage = 'A senha deve ter pelo menos 6 caracteres.';
        }
        setError(friendlyMessage);
      }
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await signOut(auth);
      router.push('/login');
    });
  }

  const isLoading = isPending || isUserLoading;

  if (isUserLoading) {
      return <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin text-primary" /></div>;
  }
  
  if (user) {
    return (
        <div className="space-y-4 text-center">
            <p className="text-lg">Você já está logado como:</p>
            <p className="font-bold text-primary">{user.isAnonymous ? 'Usuário Convidado' : user.email}</p>
            <Button onClick={handleLogout} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
                <span>Sair</span>
            </Button>
            <Button variant="outline" onClick={() => router.push(redirectUrl)} className="w-full">
                Voltar para o App
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erro de Autenticação</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="text-primary/70" /> Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
           <Label htmlFor="password" className="flex items-center gap-2">
            <KeyRound className="text-primary/70" /> Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Sua senha secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => handleAuthAction('signIn')} disabled={isLoading || !email || !password} className="flex-1">
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              <span>Entrar</span>
            </Button>
            <Button onClick={() => handleAuthAction('signUp')} disabled={isLoading || !email || !password} variant="secondary" className="flex-1">
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              <span>Cadastrar</span>
            </Button>
        </div>
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Ou continue como</span>
            </div>
        </div>
        <Button onClick={() => handleAuthAction('anonymous')} disabled={isLoading} variant="outline" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : <Ghost />}
          <span>Convidado</span>
        </Button>
      </div>
    </div>
  );
}

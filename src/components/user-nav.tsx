'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/firebase';
import { Ghost, LogIn, LogOut, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';

export function UserNav() {
  const { user, isUserLoading } = useUser();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  if (isUserLoading) {
    return (
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="animate-pulse"></AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (!user) {
    return (
      <Button asChild variant="outline" className="gap-2">
        <Link href="/login">
          <LogIn />
          Login
        </Link>
      </Button>
    );
  }

  const userInitial = user.isAnonymous
    ? 'G'
    : user.email?.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border-2 border-primary/50">
            {user.photoURL && <AvatarImage src={user.photoURL} alt="Avatar" />}
            <AvatarFallback className="bg-transparent text-primary font-bold">
              {user.isAnonymous ? <Ghost /> : userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.isAnonymous
                ? 'Usuário Convidado'
                : user.displayName || 'Usuário'}
            </p>
            {!user.isAnonymous && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

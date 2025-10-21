import { AuthForm } from '@/components/auth-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, UserCircle } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold font-headline">MCP</h1>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            Acesse sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <Card className="border-primary/20">
            <CardContent className="p-6">
                <AuthForm />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

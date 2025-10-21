import { BuildForm } from '@/components/build-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BuildPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Simulador de Build Completo</CardTitle>
                <CardDescription>
                  Defina seu orçamento e o uso pretendido, e nossa IA montará a configuração ideal para você.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuildForm />
              </CardContent>
            </Card>
        </div>
    </div>
  );
}

import { UpgradeForm } from '@/components/upgrade-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpgradePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
             <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Sugestões de Upgrade</CardTitle>
                <CardDescription>
                  Liste seus componentes atuais e nossa IA irá sugerir os melhores upgrades para sua máquina.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpgradeForm />
              </CardContent>
            </Card>
        </div>
    </div>
  );
}

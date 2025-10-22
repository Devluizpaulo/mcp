
import { UpgradeForm } from '@/components/upgrade-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpgradePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
             <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Análise de Upgrade com IA</CardTitle>
                <CardDescription>
                  Liste os componentes do seu PC atual em linguagem natural. Quanto mais detalhes, melhor a análise.
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

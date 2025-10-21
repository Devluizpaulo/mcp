import { MyBuildsCrud } from '@/components/my-builds-crud';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MyBuildsPage() {
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

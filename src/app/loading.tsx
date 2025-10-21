import { Skeleton } from "@/components/ui/skeleton"
import { Cpu } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
        <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-headline">
              TechUpgrade Pro
            </h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-8" />
            
            <div className="space-y-4">
                <Skeleton className="h-10 w-full max-w-md mb-4" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
      </main>
    </div>
  )
}

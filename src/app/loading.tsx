import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-8" />
        
        <div className="space-y-4">
            <Skeleton className="h-10 w-full max-w-md mb-4" />
            <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  )
}

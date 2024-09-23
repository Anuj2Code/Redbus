import { Skeleton } from "@/components/ui/skeleton";

export function SuspenseCard() {
  return (
    <>
     <div className="flex flex-col space-y-3 mt-5">
      <Skeleton className="h-[505px] w-[250px] rounded-xl bg-slate-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-slate-500" />
        <Skeleton className="h-4 w-[200px] bg-slate-500" />
      </div>
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
      <Skeleton className="w-full h-[400px]" />
      <Skeleton className="w-full h-[400px]" />
      <Skeleton className="w-full h-[400px]" />
    </>
  );
}
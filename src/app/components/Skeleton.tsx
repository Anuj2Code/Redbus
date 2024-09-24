import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
    <Skeleton className="min-h-[125px] min-w-[250px] rounded-xl" />
  </div>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

// Shown while the listing reads the URL filters and the saved grid layout.
export default function ProductsSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
          <Skeleton key={index} className="aspect-2/3 w-full" />
        ))}
      </div>
    </div>
  );
}

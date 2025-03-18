import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200/60 dark:bg-slate-800/60",
        "before:absolute before:inset-0",
        "before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r",
        "before:from-transparent before:via-white/60 before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

// Component mẫu để tạo skeleton cho product card
function ProductCardSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Skeleton className="w-full h-48 mb-4" /> {/* Ảnh sản phẩm */}
      <Skeleton className="h-4 w-2/3 mb-2" /> {/* Tiêu đề */}
      <Skeleton className="h-4 w-1/3" /> {/* Giá */}
    </div>
  )
}

// Component mẫu để tạo grid skeleton loaders
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <ProductCardSkeleton key={item} />
      ))}
    </div>
  )
}

export { Skeleton, ProductCardSkeleton, ProductGridSkeleton } 
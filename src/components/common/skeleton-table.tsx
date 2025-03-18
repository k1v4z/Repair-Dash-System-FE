import { cn } from "@/lib/utils"
function SkeletonTable({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactNode {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200/60 ",
        className
      )}
      {...props}
    />
  )
}
export { SkeletonTable } 
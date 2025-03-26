import { Skeleton } from "@/components/ui/skeleton";

const OrderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Skeleton className="h-12 w-full mb-6" />
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    </div>
  );
};

export default OrderSkeleton;

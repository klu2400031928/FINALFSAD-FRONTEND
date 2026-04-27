export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[200px] w-full rounded-2xl" />
      <div className="grid md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-[100px] rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton className="h-[40px] w-[200px]" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};
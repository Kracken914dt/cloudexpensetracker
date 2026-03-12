import { cn } from "@/services/libs/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted-foreground/10 dark:bg-muted-foreground/20",
        className,
      )}
      {...props}
    />
  );
}

import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("max-w-content mx-auto w-full px-6 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}

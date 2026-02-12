import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  title?: string;
  subtitle?: string;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, date, title, subtitle, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex items-start", className)}
      {...props}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
        <div className="w-0.5 h-full bg-border mt-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {date && <p className="text-sm text-muted-foreground mb-1">{date}</p>}
        {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
        )}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };

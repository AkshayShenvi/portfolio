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
      {/* Date on the left */}
      <div className="w-36 pr-4 text-right shrink-0">
        {date && (
          <p className="text-sm font-mono text-muted-foreground">{date}</p>
        )}
      </div>

      {/* Timeline line and dot */}
      <div className="flex flex-col items-center mx-4">
        <div className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-[0_0_8px_hsl(142_71%_45%/0.4)]"></div>
        <div className="w-0.5 h-8 bg-border/50 mt-2"></div>
      </div>

      {/* Content on the right */}
      <div className="flex-1 pb-8">
        <div className="text-sm">{children}</div>
      </div>
    </div>
  ),
);
TimelineItem.displayName = "TimelineItem";

export { Timeline, TimelineItem };

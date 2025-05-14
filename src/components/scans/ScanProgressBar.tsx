
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScanProgressBarProps {
  progress: number;
  status: "running" | "pending" | "completed" | "failed";
}

export default function ScanProgressBar({ progress, status }: ScanProgressBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "bg-[#00b3b0]";
      case "pending":
        return "bg-amber-500";
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="w-full space-y-2">
      <Progress 
        value={status === "pending" ? 0 : progress} 
        className="h-2 w-full"
        indicatorClassName={cn(getStatusColor(), {
          "animate-pulse": status === "running",
        })}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{progress}% complete</span>
        <span className={cn(
          "font-medium",
          status === "running" && "text-[#00b3b0]",
          status === "pending" && "text-amber-500",
          status === "completed" && "text-green-500",
          status === "failed" && "text-red-500"
        )}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}

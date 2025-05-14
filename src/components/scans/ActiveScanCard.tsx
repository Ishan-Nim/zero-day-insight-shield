
import { formatDistanceToNow } from "date-fns";
import { Target, Activity, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScanProgressBar from "./ScanProgressBar";

interface ActiveScanProps {
  id: string;
  targetName: string;
  targetUrl: string;
  phase: string;
  startTime: Date;
  progress: number;
  status: "running" | "pending" | "completed" | "failed";
}

export default function ActiveScanCard({ 
  id, 
  targetName, 
  targetUrl, 
  phase, 
  startTime, 
  progress,
  status
}: ActiveScanProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-[#00b3b0]" />
              <h3 className="font-semibold">{targetName}</h3>
            </div>
            <p className="text-xs text-muted-foreground break-all">{targetUrl}</p>
          </div>
          {status === "running" && (
            <div className="flex items-center text-xs text-[#00b3b0]">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Live
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <ScanProgressBar progress={progress} status={status} />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Current phase</p>
            <p className="font-medium">{phase || "Initializing"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Started</p>
            <p className="font-medium">{formatDistanceToNow(startTime, { addSuffix: true })}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full text-xs">
          <ExternalLink className="mr-1 h-3 w-3" />
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScanResult } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface RecentScansProps {
  scans: ScanResult[];
}

export default function RecentScans({ scans }: RecentScansProps) {
  const getScanStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "queued":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Queued</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>Latest vulnerability scans performed on your targets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Scan #{scan.id.substring(0, 8)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Target: {scan.targetId}
                </p>
                <p className="text-xs text-muted-foreground">
                  {scan.startTime ? formatDistanceToNow(scan.startTime, { addSuffix: true }) : "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getScanStatusBadge(scan.status)}
                <div className="text-sm font-medium">
                  {scan.status === "completed" && (
                    <span>{scan.summary.highSeverity + scan.summary.mediumSeverity + scan.summary.lowSeverity + scan.summary.infoSeverity} issues</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {scans.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No recent scans found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

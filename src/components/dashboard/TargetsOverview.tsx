
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScanTarget } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface TargetsOverviewProps {
  targets: ScanTarget[];
}

export default function TargetsOverview({ targets }: TargetsOverviewProps) {
  const getTargetStatusIndicator = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Active
          </div>
        );
      case "scanning":
        return (
          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            Scanning
          </div>
        );
      case "inactive":
        return (
          <div className="flex items-center">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-300 mr-2"></span>
            Inactive
          </div>
        );
      default:
        return <div>Unknown</div>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Your Targets</CardTitle>
        <CardDescription>Websites configured for vulnerability scanning</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {targets.slice(0, 3).map((target) => (
            <div key={target.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{target.name}</p>
                <p className="text-sm text-muted-foreground">{target.url}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  {getTargetStatusIndicator(target.status)}
                  {target.lastScan && (
                    <span className="ml-4">
                      Last scan: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                    </span>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <PlayCircle className="h-4 w-4 mr-1" />
                Scan
              </Button>
            </div>
          ))}
          {targets.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No targets found. Add your first website to scan.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/targets">
            View All Targets
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

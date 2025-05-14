
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScanTarget } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight, PlayCircle, Loader2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/i18n";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { useAuth } from "@/context/AuthContext";

interface TargetsOverviewProps {
  targets: ScanTarget[];
}

export default function TargetsOverview({ targets }: TargetsOverviewProps) {
  const [scanningTargets, setScanningTargets] = useState<{[key: string]: boolean}>({});
  const { t } = useLanguage();
  const { addScanRequest } = useAdminNotifications();
  const { currentUser } = useAuth();
  
  const getTargetStatusIndicator = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            {t('targets.active')}
          </div>
        );
      case "scanning":
        return (
          <div className="flex items-center">
            <span className="relative flex h-2.5 w-2.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            {t('targets.scanning')}
          </div>
        );
      case "inactive":
        return (
          <div className="flex items-center">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-300 mr-2"></span>
            {t('targets.inactive')}
          </div>
        );
      default:
        return <div>Unknown</div>;
    }
  };

  const handleScan = (targetId: string, targetName: string, targetUrl: string) => {
    setScanningTargets(prev => ({ ...prev, [targetId]: true }));
    
    // Simulate a delay to show the scanning animation
    setTimeout(() => {
      setScanningTargets(prev => ({ ...prev, [targetId]: false }));
      
      toast({
        title: t('targets.scanStarted'),
        description: "We'll notify you by email once the scan is complete. Our security team will manually review the results before sending.",
        duration: 5000,
      });
      
      // Add to admin scan requests
      if (currentUser) {
        addScanRequest({
          targetId,
          targetName,
          targetUrl,
          userId: currentUser.id,
          userEmail: currentUser.email
        });
      }
    }, 3000);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>{t('targets.title')}</CardTitle>
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
                      {t('targets.lastScan')}: {formatDistanceToNow(target.lastScan, { addSuffix: true })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {}}
                  className="flex items-center"
                >
                  <Clock className="h-4 w-4 mr-1" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleScan(target.id, target.name, target.url)}
                  disabled={scanningTargets[target.id]}
                >
                  {scanningTargets[target.id] ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      {t('targets.scanning')}
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-1" />
                      {t('targets.runScan')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
          {targets.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              {t('targets.noTargets')}
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

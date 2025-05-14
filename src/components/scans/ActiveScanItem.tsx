
import React from "react";
import { formatDistance } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Eye, XCircle } from "lucide-react";
import { useLanguage } from "@/i18n";

export interface ScanItemProps {
  id: string;
  targetName: string;
  targetUrl: string;
  startTime: Date;
  status: "running" | "pending" | "failed" | "completed";
  progress: number;
  phase?: string;
  findings?: {
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

const ActiveScanItem = ({ scan, onViewDetails, onCancelScan }: { 
  scan: ScanItemProps; 
  onViewDetails: (scanId: string) => void;
  onCancelScan: (scanId: string) => void;
}) => {
  const { t } = useLanguage();
  
  // Calculate duration from start time until now
  const duration = formatDistance(scan.startTime, new Date(), { addSuffix: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-pulse">{t('scans.running')}</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{t('scans.pending')}</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t('scans.failed')}</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t('scans.completed')}</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProgressAnimation = (status: string, progress: number) => {
    if (status === "running") {
      return (
        <div className="w-full">
          <Progress value={progress} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress}%</span>
            {scan.phase && <span>{scan.phase}</span>}
          </div>
        </div>
      );
    } else if (status === "completed") {
      return (
        <div className="w-full">
          <Progress value={100} className="h-2 mb-1 bg-green-100" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100%</span>
            <span>{t('scans.completed')}</span>
          </div>
        </div>
      );
    } else if (status === "failed") {
      return (
        <div className="w-full">
          <Progress value={progress} className="h-2 mb-1 bg-red-100" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress}%</span>
            <span>{t('scans.failed')}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full">
          <Progress value={0} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>{t('scans.pending')}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="md:w-1/4">
            <h3 className="font-medium text-sm">{scan.targetName}</h3>
            <p className="text-xs text-muted-foreground truncate">{scan.targetUrl}</p>
          </div>
          
          <div className="md:w-1/4 mt-2 md:mt-0">
            <div className="text-xs text-muted-foreground">{t('scans.startTime')}</div>
            <div className="flex items-center">
              <Activity className="h-3 w-3 mr-1 text-blue-500" />
              <span className="text-sm">{formatDistance(scan.startTime, new Date(), { addSuffix: true })}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {duration} {t('scans.duration')}
            </div>
          </div>
          
          <div className="md:w-1/4 mt-2 md:mt-0">
            <div className="flex items-center mb-1">
              <div className="text-xs text-muted-foreground mr-2">{t('scans.status')}:</div>
              {getStatusBadge(scan.status)}
            </div>
            {getProgressAnimation(scan.status, scan.progress)}
          </div>

          <div className="md:w-1/4 mt-3 md:mt-0 flex md:justify-end space-x-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(scan.id)}>
              <Eye className="h-4 w-4 mr-1" />
              {t('scans.viewDetails')}
            </Button>
            {scan.status === "running" || scan.status === "pending" ? (
              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => onCancelScan(scan.id)}>
                <XCircle className="h-4 w-4 mr-1" />
                {t('scans.cancelScan')}
              </Button>
            ) : null}
          </div>
        </div>

        {scan.status === "completed" && scan.findings && (
          <div className="mt-3 pt-3 border-t">
            <div className="text-xs text-muted-foreground mb-2">{t('scans.findings')}:</div>
            <div className="flex space-x-4">
              <div className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs">
                {t('scans.high')}: {scan.findings.high}
              </div>
              <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                {t('scans.medium')}: {scan.findings.medium}
              </div>
              <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">
                {t('scans.low')}: {scan.findings.low}
              </div>
              <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {t('scans.info')}: {scan.findings.info}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveScanItem;

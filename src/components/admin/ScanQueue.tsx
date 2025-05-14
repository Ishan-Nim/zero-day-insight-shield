
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { Play, Upload, Send, CheckCircle, Clock, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ScanRequest {
  id: string;
  targetId: string;
  targetName: string;
  targetUrl: string;
  userId: string;
  userEmail: string;
  queuedAt: Date;
  status: 'queued' | 'scanning' | 'completed' | 'failed';
  hasReport?: boolean;
}

// Mock data for scan requests
const mockScanRequests: ScanRequest[] = [
  {
    id: "req-001",
    targetId: "target-001",
    targetName: "Corporate Website",
    targetUrl: "https://example.com",
    userId: "user-001",
    userEmail: "user@example.com",
    queuedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'queued'
  },
  {
    id: "req-002",
    targetId: "target-002",
    targetName: "Customer Portal",
    targetUrl: "https://portal.example.com",
    userId: "user-002",
    userEmail: "manager@example.com",
    queuedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'scanning'
  },
  {
    id: "req-003",
    targetId: "target-003",
    targetName: "API Gateway",
    targetUrl: "https://api.example.com",
    userId: "user-003",
    userEmail: "developer@example.com",
    queuedAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    status: 'completed',
    hasReport: true
  }
];

export default function ScanQueue() {
  const { t } = useLanguage();
  const [scanRequests, setScanRequests] = useState<ScanRequest[]>(mockScanRequests);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'queued':
        return <Badge variant="outline" className="flex items-center"><Clock className="mr-1 h-3 w-3" /> Queued</Badge>;
      case 'scanning':
        return <Badge variant="secondary" className="flex items-center"><Activity className="mr-1 h-3 w-3 animate-pulse" /> In Progress</Badge>;
      case 'completed':
        return <Badge variant="success" className="bg-green-100 text-green-800 flex items-center"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="flex items-center">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleStartScan = (requestId: string) => {
    setScanRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'scanning' as const } : req
      )
    );
    toast({
      title: "Scan started",
      description: "The scan has been initiated.",
    });
  };

  const handleUploadReport = (requestId: string) => {
    setScanRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'completed' as const, hasReport: true } : req
      )
    );
    toast({
      title: "Report uploaded",
      description: "The scan report has been uploaded successfully.",
    });
  };

  const handleSendReport = (requestId: string) => {
    toast({
      title: "Report sent",
      description: "The scan report has been sent to the user.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.scanQueue')}</CardTitle>
        <CardDescription>
          Manage scan requests from users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scanRequests.length > 0 ? (
            scanRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{request.targetName}</h4>
                    <span className="mx-2">•</span>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{request.targetUrl}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs text-muted-foreground">
                    <span className="mr-3">
                      {t('admin.queuedBy')}: {request.userEmail}
                    </span>
                    <span>
                      {t('admin.queuedAt')}: {formatDistanceToNow(request.queuedAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {request.status === 'queued' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStartScan(request.id)}
                    >
                      <Play className="mr-1 h-4 w-4" />
                      {t('admin.startScan')}
                    </Button>
                  )}
                  {request.status === 'scanning' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUploadReport(request.id)}
                    >
                      <Upload className="mr-1 h-4 w-4" />
                      {t('admin.uploadReport')}
                    </Button>
                  )}
                  {request.status === 'completed' && request.hasReport && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSendReport(request.id)}
                    >
                      <Send className="mr-1 h-4 w-4" />
                      {t('admin.sendReport')}
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No scan requests in the queue.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

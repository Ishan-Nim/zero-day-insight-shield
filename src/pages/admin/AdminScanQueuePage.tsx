
import { useState } from "react";
import { useAdminNotifications } from "@/context/AdminNotificationContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Check, X, Upload, Send, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/i18n";
import { Input } from "@/components/ui/input";

export default function AdminScanQueuePage() {
  const { 
    scanRequests, 
    markRequestAsProcessing, 
    markRequestAsCompleted, 
    markRequestAsFailed 
  } = useAdminNotifications();
  const { t } = useLanguage();
  const [reportResults, setReportResults] = useState<{[key: string]: string}>({});
  const [reportFiles, setReportFiles] = useState<{[key: string]: File | null}>({});
  
  // Group scan requests by status
  const pendingRequests = scanRequests.filter(req => req.status === "pending");
  const processingRequests = scanRequests.filter(req => req.status === "processing");
  const completedRequests = scanRequests.filter(req => req.status === "completed");
  const failedRequests = scanRequests.filter(req => req.status === "failed");

  const handleStartScan = (requestId: string) => {
    markRequestAsProcessing(requestId);
    toast({
      title: "Scan Started",
      description: "The vulnerability scan has been started and is now processing.",
      duration: 3000,
    });
  };

  const handleUploadReport = (requestId: string) => {
    // Simulate report upload
    const results = reportResults[requestId];
    
    if (!results || results.trim() === '') {
      toast({
        title: "Error",
        description: "Please provide scan results before uploading.",
        variant: "destructive",
      });
      return;
    }
    
    markRequestAsCompleted(requestId);
    toast({
      title: "Report Uploaded",
      description: "The vulnerability scan report has been uploaded and sent to the user.",
      duration: 3000,
    });
  };

  const handleFailScan = (requestId: string) => {
    markRequestAsFailed(requestId);
    toast({
      title: "Scan Marked as Failed",
      description: "The user will be notified that their scan request failed.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const handleReportChange = (requestId: string, value: string) => {
    setReportResults(prev => ({
      ...prev,
      [requestId]: value
    }));
  };

  const handleFileChange = (requestId: string, file: File | null) => {
    setReportFiles(prev => ({
      ...prev,
      [requestId]: file
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('admin.scanQueue')}</h1>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing
            {processingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-2">{processingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending scan requests.
            </div>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.targetName}</CardTitle>
                    <Badge className="bg-yellow-500">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">URL</p>
                      <p className="text-sm text-muted-foreground break-all">{request.targetUrl}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: {request.userEmail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Button 
                        onClick={() => handleStartScan(request.id)}
                        className="ml-auto"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {t('admin.startScan')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="processing" className="space-y-4">
          {processingRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No scans currently processing.
            </div>
          ) : (
            processingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.targetName}</CardTitle>
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <Badge className="bg-blue-500">Processing</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">URL</p>
                      <p className="text-sm text-muted-foreground break-all">{request.targetUrl}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Scan Results</p>
                      <Textarea 
                        placeholder="Enter vulnerability scan results..."
                        className="min-h-[120px]"
                        value={reportResults[request.id] || ''}
                        onChange={(e) => handleReportChange(request.id, e.target.value)}
                      />
                      
                      <div className="pt-2">
                        <Input
                          type="file"
                          className="mb-4"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleFileChange(request.id, file);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: {request.userEmail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="outline"
                          onClick={() => handleFailScan(request.id)}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Mark Failed
                        </Button>
                        <Button 
                          onClick={() => handleUploadReport(request.id)}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {t('admin.uploadReport')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No completed scans.
            </div>
          ) : (
            completedRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.targetName}</CardTitle>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">URL</p>
                      <p className="text-sm text-muted-foreground break-all">{request.targetUrl}</p>
                    </div>
                    
                    {reportResults[request.id] && (
                      <div>
                        <p className="text-sm font-medium">Scan Results</p>
                        <div className="bg-muted p-3 rounded-md mt-1 whitespace-pre-wrap text-sm">
                          {reportResults[request.id]}
                        </div>
                      </div>
                    )}
                    
                    {reportFiles[request.id] && (
                      <div>
                        <p className="text-sm font-medium">Report File</p>
                        <p className="text-sm text-muted-foreground">
                          {reportFiles[request.id]?.name}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: {request.userEmail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Completed {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Button variant="outline">
                        <Send className="mr-2 h-4 w-4" />
                        Resend Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="failed" className="space-y-4">
          {failedRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No failed scans.
            </div>
          ) : (
            failedRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{request.targetName}</CardTitle>
                    <div className="flex items-center">
                      <X className="h-4 w-4 mr-2 text-red-500" />
                      <Badge variant="destructive">Failed</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">URL</p>
                      <p className="text-sm text-muted-foreground break-all">{request.targetUrl}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: {request.userEmail}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Failed {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Button>
                        <Play className="mr-2 h-4 w-4" />
                        Retry Scan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

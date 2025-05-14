
import React, { useState, useEffect } from "react";
import { Shield, Activity, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n";
import { ScanItemProps } from "@/components/scans/ActiveScanItem";
import ActiveScanItem from "@/components/scans/ActiveScanItem";
import { mockActiveScans, mockCompletedScans } from "@/data/mockScanData";
import { toast } from "@/components/ui/use-toast";

const ScansPage = () => {
  const { t } = useLanguage();
  const [activeScans, setActiveScans] = useState<ScanItemProps[]>(mockActiveScans);
  const [completedScans, setCompletedScans] = useState<ScanItemProps[]>(mockCompletedScans);
  
  // Simulate scan progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScans(prev => 
        prev.map(scan => {
          if (scan.status === "running" && scan.progress < 100) {
            const newProgress = Math.min(scan.progress + Math.random() * 2, 99);
            return { 
              ...scan, 
              progress: newProgress,
              phase: newProgress > 70 ? "Vulnerability Verification" :
                     newProgress > 50 ? "XSS Testing" :
                     newProgress > 30 ? "Content Discovery" : "Initial Reconnaissance"
            };
          }
          return scan;
        })
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to handle viewing scan details
  const handleViewDetails = (scanId: string) => {
    toast({
      title: "Scan Details",
      description: `Viewing details for scan ID: ${scanId}`,
      duration: 3000,
    });
  };
  
  // Function to handle canceling a scan
  const handleCancelScan = (scanId: string) => {
    toast({
      title: "Scan Canceled",
      description: `Scan ${scanId} has been canceled.`,
      variant: "destructive",
      duration: 3000,
    });
    
    // Update the scan status to failed
    setActiveScans(prev => 
      prev.map(scan => 
        scan.id === scanId ? { ...scan, status: "failed" } : scan
      )
    );
  };

  // Count scans by status
  const runningScans = activeScans.filter(scan => scan.status === "running").length;
  const pendingScans = activeScans.filter(scan => scan.status === "pending").length;
  const completedScansCount = completedScans.filter(scan => scan.status === "completed").length;
  const failedScans = completedScans.filter(scan => scan.status === "failed").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('header.scans')}</h1>
      
      {/* Scan stats cards */}
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{t('scans.activeScan')}</CardTitle>
            <CardDescription className="text-xs">Active scans currently running</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-3xl font-bold">{runningScans}</div>
            <div className="p-2 rounded-full bg-blue-500">
              <Activity className="h-5 w-5 text-white" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{t('scans.pendingScan')}</CardTitle>
            <CardDescription className="text-xs">Scans waiting to start</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-3xl font-bold">{pendingScans}</div>
            <div className="p-2 rounded-full bg-amber-500">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{t('scans.completedScan')}</CardTitle>
            <CardDescription className="text-xs">Successfully completed scans</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-3xl font-bold">{completedScansCount}</div>
            <div className="p-2 rounded-full bg-green-500">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{t('scans.failedScan')}</CardTitle>
            <CardDescription className="text-xs">Failed or canceled scans</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="text-3xl font-bold">{failedScans}</div>
            <div className="p-2 rounded-full bg-red-500">
              <XCircle className="h-5 w-5 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Scan list tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">{t('scans.activeScan')}</TabsTrigger>
          <TabsTrigger value="completed">{t('scans.completedScan')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          {activeScans.length > 0 ? (
            <div className="space-y-4">
              {activeScans.map(scan => (
                <ActiveScanItem 
                  key={scan.id}
                  scan={scan}
                  onViewDetails={handleViewDetails}
                  onCancelScan={handleCancelScan}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Shield className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
              <p className="mt-2 text-muted-foreground">{t('scans.noActiveScan')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {completedScans.length > 0 ? (
            <div className="space-y-4">
              {completedScans.map(scan => (
                <ActiveScanItem 
                  key={scan.id}
                  scan={scan}
                  onViewDetails={handleViewDetails}
                  onCancelScan={handleCancelScan}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Shield className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
              <p className="mt-2 text-muted-foreground">{t('scans.noCompletedScan')}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScansPage;

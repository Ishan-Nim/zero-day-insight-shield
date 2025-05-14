
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Mail } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import AdminReportManager from "@/components/reports/AdminReportManager";

interface Report {
  id: string;
  targetName: string;
  scanDate: Date;
  status: "ready" | "pending";
  vulnerabilities: {
    critical?: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  vulnerabilityTypes?: string[];
  reportSent?: boolean;
}

// Mock data with additional fields
const mockReports: Report[] = [
  {
    id: "rep-001",
    targetName: "example.com",
    scanDate: new Date(2025, 4, 10),
    status: "ready",
    vulnerabilities: {
      high: 3,
      medium: 7,
      low: 12,
      info: 5,
    },
    vulnerabilityTypes: ["SQL Injection", "XSS", "CSRF"],
    reportSent: true
  },
  {
    id: "rep-002",
    targetName: "testsite.org",
    scanDate: new Date(2025, 4, 8),
    status: "ready",
    vulnerabilities: {
      critical: 1,
      high: 2,
      medium: 5,
      low: 8,
      info: 3,
    },
    vulnerabilityTypes: ["XSS", "Broken Authentication"],
    reportSent: true
  },
  {
    id: "rep-003",
    targetName: "myapp.dev",
    scanDate: new Date(2025, 4, 12),
    status: "pending",
    vulnerabilities: {
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
    reportSent: false
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const isAdmin = currentUser?.role === 'admin';

  const filteredReports = activeTab === "all" 
    ? mockReports 
    : mockReports.filter(report => report.status === activeTab);

  const handleDownloadReport = (reportId: string) => {
    toast({
      title: "Report download",
      description: "This feature is not implemented yet, but a PDF would normally download here.",
    });
  };

  const handleViewReport = (reportId: string) => {
    toast({
      title: "Report viewer",
      description: "This feature is not implemented yet, but a report viewer would open here.",
    });
  };

  const handleEmailReport = (reportId: string) => {
    toast({
      title: "Email sent",
      description: "A detailed scan report has been securely sent to your email address.",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        {isAdmin && (
          <Button variant="default">
            Create New Report
          </Button>
        )}
      </div>

      {isAdmin ? (
        <AdminReportManager />
      ) : (
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid gap-6">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{report.targetName}</CardTitle>
                        <CardDescription>
                          Scan ID: {report.id} • {format(report.scanDate, "PPP")}
                        </CardDescription>
                      </div>
                      <Badge variant={report.status === "ready" ? "default" : "outline"}>
                        {report.status === "ready" ? "Ready" : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {report.status === "ready" ? (
                      <>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          {report.vulnerabilities.critical !== undefined && (
                            <div className="text-center p-3 bg-purple-50 rounded-md">
                              <p className="text-sm text-purple-700 font-medium">Critical</p>
                              <p className="text-lg font-bold text-purple-700">{report.vulnerabilities.critical}</p>
                            </div>
                          )}
                          <div className="text-center p-3 bg-red-50 rounded-md">
                            <p className="text-sm text-red-700 font-medium">High</p>
                            <p className="text-lg font-bold text-red-700">{report.vulnerabilities.high}</p>
                          </div>
                          <div className="text-center p-3 bg-amber-50 rounded-md">
                            <p className="text-sm text-amber-700 font-medium">Medium</p>
                            <p className="text-lg font-bold text-amber-700">{report.vulnerabilities.medium}</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-md">
                            <p className="text-sm text-green-700 font-medium">Low</p>
                            <p className="text-lg font-bold text-green-700">{report.vulnerabilities.low}</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-700 font-medium">Info</p>
                            <p className="text-lg font-bold text-blue-700">{report.vulnerabilities.info}</p>
                          </div>
                        </div>

                        {report.vulnerabilityTypes && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-500 mb-2">Vulnerability Types:</p>
                            <div className="flex flex-wrap gap-2">
                              {report.vulnerabilityTypes.map((type, index) => (
                                <Badge key={index} variant="outline">{type}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-3 mt-4">
                          <Button className="flex-1" variant="outline" onClick={() => handleViewReport(report.id)}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Summary
                          </Button>
                          <Button className="flex-1" variant="default" onClick={() => handleEmailReport(report.id)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Request Full Report
                          </Button>
                        </div>
                        
                        {report.reportSent && (
                          <div className="mt-3 text-center text-sm text-muted-foreground">
                            A detailed scan report has been securely sent to your email address.
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-2">Your report is being prepared by our security team.</p>
                        <p className="text-sm text-muted-foreground">You'll receive an email when it's ready.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {filteredReports.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                  <p className="text-lg font-medium text-muted-foreground mb-2">No reports found</p>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "all" 
                      ? "You don't have any reports yet" 
                      : `You don't have any ${activeTab} reports`}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

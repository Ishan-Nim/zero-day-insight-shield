
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Mail } from "lucide-react";
import { format } from "date-fns";

interface Report {
  id: string;
  targetName: string;
  scanDate: Date;
  status: "ready" | "pending";
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

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
  },
  {
    id: "rep-002",
    targetName: "testsite.org",
    scanDate: new Date(2025, 4, 8),
    status: "ready",
    vulnerabilities: {
      high: 0,
      medium: 2,
      low: 5,
      info: 8,
    },
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
  },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredReports = activeTab === "all" 
    ? mockReports 
    : mockReports.filter(report => report.status === activeTab);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

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
                      <div className="flex gap-3">
                        <Button className="flex-1" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
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
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ActiveScanCard from "@/components/scans/ActiveScanCard";
import CompletedScanItem from "@/components/scans/CompletedScanItem";

// Mock data for scans - in a real application this would come from an API
const mockActiveScans = [
  {
    id: "scan-1",
    targetName: "Main Company Website",
    targetUrl: "https://example.com",
    phase: "Crawling pages",
    startTime: new Date(Date.now() - 35 * 60000), // 35 minutes ago
    progress: 45,
    status: "running" as const
  },
  {
    id: "scan-2",
    targetName: "Customer Portal",
    targetUrl: "https://portal.example.com",
    phase: "Analyzing responses",
    startTime: new Date(Date.now() - 120 * 60000), // 2 hours ago
    progress: 78,
    status: "running" as const
  },
  {
    id: "scan-3",
    targetName: "API Gateway",
    targetUrl: "https://api.example.com",
    phase: "Awaiting resources",
    startTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    progress: 0,
    status: "pending" as const
  }
];

const mockCompletedScans = [
  {
    id: "scan-c1",
    targetName: "Marketing Website",
    scanDate: new Date(Date.now() - 5 * 3600000), // 5 hours ago
    status: "completed" as const,
    vulnerabilities: { high: 2, medium: 3, low: 5, info: 12 }
  },
  {
    id: "scan-c2",
    targetName: "Development Server",
    scanDate: new Date(Date.now() - 12 * 3600000), // 12 hours ago
    status: "completed" as const,
    vulnerabilities: { high: 0, medium: 1, low: 3, info: 7 }
  },
  {
    id: "scan-c3",
    targetName: "Legacy System",
    scanDate: new Date(Date.now() - 24 * 3600000), // 24 hours ago
    status: "failed" as const,
    vulnerabilities: { high: 0, medium: 0, low: 0, info: 0 }
  },
  {
    id: "scan-c4",
    targetName: "Internal Wiki",
    scanDate: new Date(Date.now() - 48 * 3600000), // 48 hours ago
    status: "completed" as const,
    vulnerabilities: { high: 0, medium: 2, low: 8, info: 15 }
  }
];

export default function ScansPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t("scans.title") || "Scan Management"}</h1>
          <p className="text-muted-foreground">{t("scans.subtitle") || "Monitor and manage your security scans"}</p>
        </div>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            {t("scans.activeScanTab") || "Active Scans"}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t("scans.completedScanTab") || "Completed Scans"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockActiveScans.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No active scans</h3>
                <p className="text-sm text-muted-foreground max-w-md mt-1">
                  There are currently no active scans. Start a scan from the targets page to monitor its progress here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockActiveScans.map((scan) => (
                <ActiveScanCard key={scan.id} {...scan} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{t("scans.completedScanTitle") || "Completed Scans"}</CardTitle>
                  <CardDescription>
                    {t("scans.completedScanDescription") || "Review your past scan results"}
                  </CardDescription>
                </div>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {mockCompletedScans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <h3 className="text-lg font-semibold">No scan history</h3>
                  <p className="text-sm text-muted-foreground max-w-md mt-1">
                    Completed scan results will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-1 divide-y">
                  {mockCompletedScans.map((scan) => (
                    <CompletedScanItem key={scan.id} {...scan} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

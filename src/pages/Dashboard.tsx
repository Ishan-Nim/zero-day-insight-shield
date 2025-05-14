
import { Shield, FileBarChart, Clock, AlertCircle } from "lucide-react";
import ScanStatusCard from "@/components/dashboard/ScanStatusCard";
import VulnerabilityCard from "@/components/dashboard/VulnerabilityCard";
import RecentScans from "@/components/dashboard/RecentScans";
import TargetsOverview from "@/components/dashboard/TargetsOverview";
import VulnerabilitySeverityChart from "@/components/dashboard/VulnerabilitySeverityChart";
import { mockScanResults, mockTargets } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();

  // Get the latest completed scan results
  const completedScans = mockScanResults.filter(scan => scan.status === "completed");
  const latestScan = completedScans.sort((a, b) => 
    (b.endTime?.getTime() || 0) - (a.endTime?.getTime() || 0)
  )[0];

  // Calculate vulnerability statistics
  const totalVulnerabilities = latestScan ? 
    latestScan.summary.highSeverity + 
    latestScan.summary.mediumSeverity + 
    latestScan.summary.lowSeverity + 
    latestScan.summary.infoSeverity : 0;

  // Count scans by status
  const inProgressScans = mockScanResults.filter(scan => scan.status === "in_progress").length;
  const completedScansCount = completedScans.length;
  const failedScans = mockScanResults.filter(scan => scan.status === "failed").length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Welcome back, {currentUser?.name || currentUser?.email}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <ScanStatusCard
          title="Active Scans"
          count={inProgressScans}
          icon={<Shield className="h-5 w-5 text-white" />}
          color="bg-blue-500"
        />
        <ScanStatusCard
          title="Completed Scans"
          count={completedScansCount}
          icon={<FileBarChart className="h-5 w-5 text-white" />}
          color="bg-green-500"
        />
        <ScanStatusCard
          title="Pending Scans"
          count={mockScanResults.filter(scan => scan.status === "queued").length}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="bg-amber-500"
        />
        <ScanStatusCard
          title="Failed Scans"
          count={failedScans}
          icon={<AlertCircle className="h-5 w-5 text-white" />}
          color="bg-red-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <VulnerabilityCard
          type="high"
          count={latestScan?.summary.highSeverity || 0}
          total={totalVulnerabilities}
        />
        <VulnerabilityCard
          type="medium"
          count={latestScan?.summary.mediumSeverity || 0}
          total={totalVulnerabilities}
        />
        <VulnerabilityCard
          type="low"
          count={latestScan?.summary.lowSeverity || 0}
          total={totalVulnerabilities}
        />
        <VulnerabilityCard
          type="info"
          count={latestScan?.summary.infoSeverity || 0}
          total={totalVulnerabilities}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <VulnerabilitySeverityChart
          high={latestScan?.summary.highSeverity || 0}
          medium={latestScan?.summary.mediumSeverity || 0}
          low={latestScan?.summary.lowSeverity || 0}
          info={latestScan?.summary.infoSeverity || 0}
        />
        <div className="grid gap-6">
          <TargetsOverview targets={mockTargets} />
        </div>
      </div>

      <div className="mt-6">
        <RecentScans scans={mockScanResults} />
      </div>
    </div>
  );
}

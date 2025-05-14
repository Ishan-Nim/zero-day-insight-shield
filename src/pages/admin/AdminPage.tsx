
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScanQueue from "@/components/admin/ScanQueue";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPage() {
  const { t } = useLanguage();
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="grid gap-6">
        <ScanQueue />
        
        {/* Additional admin sections can be added here */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Scans:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span>Available Workers:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>System Load:</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="flex justify-between">
                <span>Queue Size:</span>
                <span className="font-medium">3 scans</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanResult } from "@/types";

interface ScanStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function ScanStatusCard({ title, count, icon, color }: ScanStatusCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <CardDescription className="text-xs">Scan Status</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="text-3xl font-bold">{count}</div>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

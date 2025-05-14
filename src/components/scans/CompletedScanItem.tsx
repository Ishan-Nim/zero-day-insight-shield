
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

interface CompletedScanItemProps {
  id: string;
  targetName: string;
  scanDate: Date;
  status: "completed" | "failed";
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export default function CompletedScanItem({
  targetName,
  scanDate,
  status,
  vulnerabilities,
}: CompletedScanItemProps) {
  const totalVulnerabilities =
    vulnerabilities.high +
    vulnerabilities.medium +
    vulnerabilities.low +
    vulnerabilities.info;

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium">{targetName}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            {formatDistanceToNow(scanDate, { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center mt-1 text-xs">
          <span
            className={
              status === "completed" ? "text-green-500" : "text-red-500"
            }
          >
            {status === "completed" ? (
              <CheckCircle className="inline mr-1 h-3 w-3" />
            ) : (
              <XCircle className="inline mr-1 h-3 w-3" />
            )}
            {status === "completed" ? "Completed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {status === "completed" && (
          <>
            {vulnerabilities.high > 0 && (
              <div className="flex items-center text-xs">
                <AlertCircle className="text-red-500 h-3 w-3 mr-1" />
                <span>{vulnerabilities.high}</span>
              </div>
            )}
            {vulnerabilities.medium > 0 && (
              <div className="flex items-center text-xs">
                <AlertCircle className="text-amber-500 h-3 w-3 mr-1" />
                <span>{vulnerabilities.medium}</span>
              </div>
            )}
            {vulnerabilities.low > 0 && (
              <div className="flex items-center text-xs">
                <AlertCircle className="text-blue-500 h-3 w-3 mr-1" />
                <span>{vulnerabilities.low}</span>
              </div>
            )}
            {vulnerabilities.info > 0 && (
              <div className="flex items-center text-xs">
                <Info className="text-gray-500 h-3 w-3 mr-1" />
                <span>{vulnerabilities.info}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground border-l pl-2">
              Total: {totalVulnerabilities}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

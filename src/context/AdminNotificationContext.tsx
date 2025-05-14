
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface ScanRequest {
  id: string;
  targetId: string;
  targetName: string;
  targetUrl: string;
  userId: string;
  userEmail: string;
  timestamp: Date;
  status: "pending" | "processing" | "completed" | "failed";
}

interface AdminNotificationContextType {
  scanRequests: ScanRequest[];
  markRequestAsProcessing: (id: string) => void;
  markRequestAsCompleted: (id: string) => void;
  markRequestAsFailed: (id: string) => void;
  addScanRequest: (request: Omit<ScanRequest, "id" | "timestamp" | "status">) => void;
  pendingScanRequests: ScanRequest[];
}

const AdminNotificationContext = createContext<AdminNotificationContextType | undefined>(undefined);

export function AdminNotificationProvider({ children }: { children: ReactNode }) {
  const [scanRequests, setScanRequests] = useState<ScanRequest[]>([]);

  // Load existing scan requests from localStorage on component mount
  useEffect(() => {
    const savedRequests = localStorage.getItem("scanRequests");
    if (savedRequests) {
      try {
        const parsed = JSON.parse(savedRequests);
        // Convert string dates back to Date objects
        const requests = parsed.map((req: any) => ({
          ...req,
          timestamp: new Date(req.timestamp)
        }));
        setScanRequests(requests);
      } catch (error) {
        console.error("Failed to parse saved scan requests:", error);
      }
    }
  }, []);

  // Save scan requests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scanRequests", JSON.stringify(scanRequests));
  }, [scanRequests]);

  const addScanRequest = (request: Omit<ScanRequest, "id" | "timestamp" | "status">) => {
    const newRequest: ScanRequest = {
      ...request,
      id: `req_${Date.now()}`,
      timestamp: new Date(),
      status: "pending"
    };
    
    setScanRequests(prev => [...prev, newRequest]);
    
    // Show toast notification for admin users
    toast({
      title: "New Scan Request",
      description: `${request.targetName} (${request.userEmail})`,
      duration: 5000,
    });
  };

  const markRequestAsProcessing = (id: string) => {
    setScanRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "processing" } : req))
    );
  };

  const markRequestAsCompleted = (id: string) => {
    setScanRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "completed" } : req))
    );
  };

  const markRequestAsFailed = (id: string) => {
    setScanRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: "failed" } : req))
    );
  };

  // Calculate pending scan requests (for UI badges, etc.)
  const pendingScanRequests = scanRequests.filter(
    req => req.status === "pending"
  );

  return (
    <AdminNotificationContext.Provider
      value={{
        scanRequests,
        markRequestAsProcessing,
        markRequestAsCompleted,
        markRequestAsFailed,
        addScanRequest,
        pendingScanRequests
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
}

export const useAdminNotifications = () => {
  const context = useContext(AdminNotificationContext);
  if (context === undefined) {
    throw new Error(
      "useAdminNotifications must be used within an AdminNotificationProvider"
    );
  }
  return context;
};

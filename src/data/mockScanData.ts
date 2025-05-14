
import { ScanItemProps } from "@/components/scans/ActiveScanItem";

// Generate random date within the past 24 hours
const getRandomRecentDate = () => {
  const now = new Date();
  const randomMinutesAgo = Math.floor(Math.random() * 24 * 60);
  return new Date(now.getTime() - randomMinutesAgo * 60 * 1000);
};

// Mock active scans data
export const mockActiveScans: ScanItemProps[] = [
  {
    id: "scan-001",
    targetName: "Main Website",
    targetUrl: "https://example.com",
    startTime: getRandomRecentDate(),
    status: "running",
    progress: 45,
    phase: "Content Discovery",
  },
  {
    id: "scan-002",
    targetName: "API Gateway",
    targetUrl: "https://api.example.com",
    startTime: getRandomRecentDate(),
    status: "running",
    progress: 78,
    phase: "SQL Injection Tests",
  },
  {
    id: "scan-003",
    targetName: "Mobile Backend",
    targetUrl: "https://mobile-api.example.com",
    startTime: getRandomRecentDate(),
    status: "pending",
    progress: 0,
  },
];

// Mock completed scans data
export const mockCompletedScans: ScanItemProps[] = [
  {
    id: "scan-004",
    targetName: "CRM Portal",
    targetUrl: "https://crm.example.com",
    startTime: getRandomRecentDate(),
    status: "completed",
    progress: 100,
    findings: {
      high: 2,
      medium: 5,
      low: 12,
      info: 8
    }
  },
  {
    id: "scan-005",
    targetName: "Support Portal",
    targetUrl: "https://support.example.com",
    startTime: getRandomRecentDate(),
    status: "completed",
    progress: 100,
    findings: {
      high: 0,
      medium: 3,
      low: 7,
      info: 15
    }
  },
  {
    id: "scan-006",
    targetName: "E-commerce Site",
    targetUrl: "https://store.example.com",
    startTime: getRandomRecentDate(),
    status: "failed",
    progress: 67,
  },
];

// Combine all scans
export const allScans = [...mockActiveScans, ...mockCompletedScans];

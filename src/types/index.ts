
export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
  subscription?: 'free' | 'premium' | 'enterprise';
}

export type SeverityLevel = 'high' | 'medium' | 'low' | 'info';

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: SeverityLevel;
  url: string;
  date: Date;
  status: 'open' | 'fixed' | 'ignored';
  category: string;
  cwe?: string; // Common Weakness Enumeration
  remediation?: string;
}

export interface ScanTarget {
  id: string;
  url: string;
  name: string;
  description?: string;
  lastScan?: Date;
  nextScan?: Date;
  status: 'active' | 'inactive' | 'scanning';
  verified: boolean;
  owner: string; // user id
  createdAt: Date;
  scanDepth?: 'shallow' | 'normal' | 'deep';
  excludedPaths?: string[];
}

export interface ScanResult {
  id: string;
  targetId: string;
  startTime: Date;
  endTime?: Date;
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  vulnerabilities: Vulnerability[];
  summary: {
    totalUrls: number;
    scannedUrls: number;
    highSeverity: number;
    mediumSeverity: number;
    lowSeverity: number;
    infoSeverity: number;
  };
  error?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: {
    maxTargets: number;
    maxScansPerMonth: number;
    advancedReports: boolean;
    apiAccess: boolean;
    supportLevel: 'email' | 'priority' | '24/7';
    scanTypes: Array<'quick' | 'full' | 'custom'>;
    scanDepth: Array<'shallow' | 'normal' | 'deep'>;
  };
}

export interface Report {
  id: string;
  name: string;
  scanId: string;
  targetId: string;
  createdAt: Date;
  format: 'pdf' | 'html' | 'csv';
  url: string;
}


// ScanTarget interface from this file
export interface ScanTarget {
  id: string;
  name: string;
  url: string;
  description?: string;
  customerId: string;
  verified: boolean;
  status: 'active' | 'inactive' | 'scanning';
  lastScan?: Date;
  // Adding the missing properties to match types/index.ts
  owner: string;
  createdAt: Date;
  scanDepth?: 'shallow' | 'normal' | 'deep';
  excludedPaths?: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  industry: string;
  numTargets: number;
  riskLevel: 'high' | 'medium' | 'low';
}

export interface Report {
  id: string;
  targetId: string;
  targetName: string;
  customerId: string;
  scanDate: Date;
  vulnerabilities: {
    critical?: number;
    high: number;
    medium: number;
    low: number;
  };
  vulnerabilityTypes: string[];
  status: 'sent' | 'pending' | 'failed';
}

// Import Vulnerability type from the types file
import { Vulnerability as TypedVulnerability, ScanResult } from "@/types";

// Add the missing mockTargets export
export const mockTargets: ScanTarget[] = [
  {
    id: '1',
    name: 'Corporate Website',
    url: 'https://example.com',
    description: 'Main corporate website',
    customerId: '2',
    verified: true,
    status: 'active',
    lastScan: new Date(2023, 1, 1),
    owner: 'user-123',
    createdAt: new Date(2022, 9, 15)
  },
  {
    id: '2',
    name: 'Customer Portal',
    url: 'https://customer.example.com',
    description: 'Website for customers to manage their accounts',
    customerId: '2',
    verified: false,
    status: 'active',
    lastScan: new Date(2023, 2, 15),
    owner: 'user-123',
    createdAt: new Date(2022, 10, 5)
  },
  {
    id: '3',
    name: 'API Gateway',
    url: 'https://api.example.com',
    description: 'API gateway for mobile app',
    customerId: '2',
    verified: true,
    status: 'scanning',
    lastScan: new Date(2023, 3, 1),
    owner: 'user-123',
    createdAt: new Date(2022, 11, 10)
  },
  {
    id: '4',
    name: 'Marketing Website',
    url: 'https://marketing.example.com',
    description: 'Marketing website for the company',
    customerId: '2',
    verified: false,
    status: 'inactive',
    lastScan: new Date(2022, 12, 1),
    owner: 'user-123',
    createdAt: new Date(2022, 8, 20)
  },
  {
    id: '5',
    name: 'Internal Dashboard',
    url: 'https://dashboard.example.com',
    description: 'Internal dashboard for employees',
    customerId: '2',
    verified: true,
    status: 'active',
    lastScan: new Date(2023, 4, 1),
    owner: 'user-123',
    createdAt: new Date(2022, 7, 30)
  }
];

// Updated mockVulnerabilities to match the Vulnerability type from types/index.ts
export const mockVulnerabilities: TypedVulnerability[] = [
  {
    id: '1',
    name: 'Cross-Site Scripting (XSS)',
    description: 'A cross-site scripting vulnerability was found in the search functionality.',
    severity: 'high',
    url: '/search?q=<script>alert("XSS")</script>',
    date: new Date(2023, 3, 15),
    status: 'open',
    category: 'XSS',
    cwe: 'CWE-79',
    remediation: 'Implement proper input validation and output encoding.'
  },
  {
    id: '2',
    name: 'SQL Injection',
    description: 'A SQL injection vulnerability was found in the login form.',
    severity: 'high',
    url: '/login',
    date: new Date(2023, 3, 15),
    status: 'open',
    category: 'Injection',
    cwe: 'CWE-89',
    remediation: 'Use parameterized queries and input validation.'
  },
  {
    id: '3',
    name: 'Broken Authentication',
    description: 'The application does not properly validate user credentials.',
    severity: 'medium',
    url: '/login',
    date: new Date(2023, 4, 2),
    status: 'fixed',
    category: 'Authentication',
    cwe: 'CWE-287',
    remediation: 'Implement strong authentication mechanisms.'
  },
  {
    id: '4',
    name: 'Rate Limiting Bypass',
    description: 'The API is vulnerable to rate limiting bypass.',
    severity: 'low',
    url: '/api/v1/users',
    date: new Date(2023, 4, 10),
    status: 'ignored',
    category: 'API Security',
    cwe: 'CWE-770',
    remediation: 'Implement proper rate limiting mechanisms.'
  }
];

// Create mock scan results that match the ScanResult interface
export const mockScanResults: ScanResult[] = [
  {
    id: '1',
    targetId: '1',
    startTime: new Date(2023, 3, 15, 9, 0), 
    endTime: new Date(2023, 3, 15, 10, 30),
    status: 'completed',
    vulnerabilities: mockVulnerabilities.filter(v => v.id === '1' || v.id === '2'),
    summary: {
      totalUrls: 150,
      scannedUrls: 145,
      highSeverity: 3,
      mediumSeverity: 7,
      lowSeverity: 12,
      infoSeverity: 5
    }
  },
  {
    id: '2',
    targetId: '2',
    startTime: new Date(2023, 4, 2, 14, 0),
    endTime: new Date(2023, 4, 2, 15, 15),
    status: 'completed',
    vulnerabilities: mockVulnerabilities.filter(v => v.id === '3'),
    summary: {
      totalUrls: 80,
      scannedUrls: 78,
      highSeverity: 2,
      mediumSeverity: 5,
      lowSeverity: 8,
      infoSeverity: 3
    }
  },
  {
    id: '3',
    targetId: '3',
    startTime: new Date(2023, 4, 10, 11, 0),
    status: 'in_progress',
    vulnerabilities: [],
    summary: {
      totalUrls: 120,
      scannedUrls: 45,
      highSeverity: 0,
      mediumSeverity: 0,
      lowSeverity: 0,
      infoSeverity: 0
    }
  },
  {
    id: '4',
    targetId: '4',
    startTime: new Date(2023, 4, 12, 9, 30),
    status: 'queued',
    vulnerabilities: [],
    summary: {
      totalUrls: 0,
      scannedUrls: 0,
      highSeverity: 0,
      mediumSeverity: 0,
      lowSeverity: 0,
      infoSeverity: 0
    }
  },
  {
    id: '5',
    targetId: '5',
    startTime: new Date(2023, 4, 8, 14, 0),
    endTime: new Date(2023, 4, 8, 14, 15),
    status: 'failed',
    vulnerabilities: [],
    summary: {
      totalUrls: 10,
      scannedUrls: 5,
      highSeverity: 0,
      mediumSeverity: 0,
      lowSeverity: 0,
      infoSeverity: 0
    },
    error: 'Connection timeout after 15 seconds'
  }
];

// Function to generate a UUID-like string without external dependencies
function generateUUID(): string {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

// Modified to use the TypedVulnerability interface and not rely on external libraries
export const generateRandomVulnerabilities = (targetId: string, reportId: string, count: number): TypedVulnerability[] => {
  const vulnerabilities: TypedVulnerability[] = [];
  const severityOptions: ('high' | 'medium' | 'low' | 'info')[] = ['high', 'medium', 'low', 'info'];
  const typeOptions: string[] = ['XSS', 'SQL Injection', 'CSRF', 'Broken Authentication', 'API Security'];
  const statusOptions: ('open' | 'fixed' | 'ignored')[] = ['open', 'fixed', 'ignored'];
  
  for (let i = 0; i < count; i++) {
    vulnerabilities.push({
      id: generateUUID(),
      name: `Sample Vulnerability ${i + 1}`,
      description: 'This is a sample vulnerability description.',
      severity: severityOptions[Math.floor(Math.random() * severityOptions.length)],
      url: `https://example.com/path/${i}`,
      date: new Date(),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      category: typeOptions[Math.floor(Math.random() * typeOptions.length)],
      cwe: `CWE-${100 + i}`,
      remediation: 'Follow security best practices to address this vulnerability.'
    });
  }
  
  return vulnerabilities;
};

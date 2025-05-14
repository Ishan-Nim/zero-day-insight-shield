
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

export interface Vulnerability {
  id: string;
  targetId: string;
  reportId: string;
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  location: string;
  dateFound: Date;
  status: 'open' | 'closed' | 'pending review';
}

// Updated mockTargets to include required fields
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
    owner: 'user123',
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
    owner: 'user123',
    createdAt: new Date(2022, 10, 1)
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
    owner: 'user123',
    createdAt: new Date(2022, 10, 20)
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
    owner: 'user123',
    createdAt: new Date(2022, 8, 5) 
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
    owner: 'user123',
    createdAt: new Date(2022, 11, 10)
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'info@acmecorp.com',
    industry: 'Technology',
    numTargets: 5,
    riskLevel: 'high'
  },
  {
    id: '2',
    name: 'Beta Co',
    email: 'contact@betaco.com',
    industry: 'Finance',
    numTargets: 3,
    riskLevel: 'medium'
  },
  {
    id: '3',
    name: 'Gamma Inc',
    email: 'sales@gammainc.com',
    industry: 'Healthcare',
    numTargets: 8,
    riskLevel: 'low'
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    targetId: '1',
    targetName: 'Corporate Website',
    customerId: '2',
    scanDate: new Date(2023, 3, 15),
    vulnerabilities: {
      critical: 1,
      high: 3,
      medium: 7,
      low: 12
    },
    vulnerabilityTypes: ['XSS', 'SQL Injection', 'CSRF'],
    status: 'sent'
  },
  {
    id: '2',
    targetId: '2',
    targetName: 'Customer Portal',
    customerId: '2',
    scanDate: new Date(2023, 4, 2),
    vulnerabilities: {
      critical: 0,
      high: 2,
      medium: 5,
      low: 8
    },
    vulnerabilityTypes: ['XSS', 'Broken Authentication'],
    status: 'sent'
  },
  {
    id: '3',
    targetId: '3',
    targetName: 'API Gateway',
    customerId: '2',
    scanDate: new Date(2023, 4, 10),
    vulnerabilities: {
      critical: 2,
      high: 4,
      medium: 3,
      low: 6
    },
    vulnerabilityTypes: ['API Security', 'Rate Limiting Bypass', 'Injection'],
    status: 'pending'
  }
];

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: '1',
    targetId: '1',
    reportId: '1',
    name: 'Cross-Site Scripting (XSS)',
    severity: 'high',
    type: 'XSS',
    description: 'A cross-site scripting vulnerability was found in the search functionality.',
    location: '/search?q=<script>alert("XSS")</script>',
    dateFound: new Date(2023, 3, 15),
    status: 'open'
  },
  {
    id: '2',
    targetId: '1',
    reportId: '1',
    name: 'SQL Injection',
    severity: 'critical',
    type: 'SQL Injection',
    description: 'A SQL injection vulnerability was found in the login form.',
    location: '/login',
    dateFound: new Date(2023, 3, 15),
    status: 'open'
  },
  {
    id: '3',
    targetId: '2',
    reportId: '2',
    name: 'Broken Authentication',
    severity: 'medium',
    type: 'Broken Authentication',
    description: 'The application does not properly validate user credentials.',
    location: '/login',
    dateFound: new Date(2023, 4, 2),
    status: 'pending review'
  },
  {
    id: '4',
    targetId: '3',
    reportId: '3',
    name: 'Rate Limiting Bypass',
    severity: 'low',
    type: 'Rate Limiting',
    description: 'The API is vulnerable to rate limiting bypass.',
    location: '/api/v1/users',
    dateFound: new Date(2023, 4, 10),
    status: 'closed'
  }
];

// Create mock scan results that match the ScanResult interface
export const mockScanResults = [
  {
    id: '1',
    targetId: '1',
    startTime: new Date(2023, 3, 15, 9, 0), 
    endTime: new Date(2023, 3, 15, 10, 30),
    status: 'completed',
    vulnerabilities: mockVulnerabilities.filter(v => v.targetId === '1'),
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
    vulnerabilities: mockVulnerabilities.filter(v => v.targetId === '2'),
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

// Modified to not use faker
export const generateRandomVulnerabilities = (targetId: string, reportId: string, count: number): Vulnerability[] => {
  const vulnerabilities: Vulnerability[] = [];
  const severityOptions: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
  const typeOptions: string[] = ['XSS', 'SQL Injection', 'CSRF', 'Broken Authentication', 'API Security'];
  const statusOptions: ('open' | 'closed' | 'pending review')[] = ['open', 'closed', 'pending review'];
  
  for (let i = 0; i < count; i++) {
    vulnerabilities.push({
      id: generateUUID(),
      targetId: targetId,
      reportId: reportId,
      name: `Sample Vulnerability ${i + 1}`,
      severity: severityOptions[Math.floor(Math.random() * severityOptions.length)],
      type: typeOptions[Math.floor(Math.random() * typeOptions.length)],
      description: 'This is a sample vulnerability description.',
      location: `https://example.com/path/${i}`,
      dateFound: new Date(),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
    });
  }
  
  return vulnerabilities;
};


import { ScanTarget, ScanResult, Vulnerability, SubscriptionPlan, Report } from '@/types';

export const mockTargets: ScanTarget[] = [
  {
    id: '1',
    url: 'https://example.com',
    name: 'Example Website',
    description: 'Main corporate website',
    lastScan: new Date('2023-05-10T14:30:00'),
    nextScan: new Date('2023-05-17T14:30:00'),
    status: 'active',
    verified: true,
    owner: '2',
    createdAt: new Date('2023-01-15'),
    scanDepth: 'normal',
    excludedPaths: ['/admin', '/private']
  },
  {
    id: '2',
    url: 'https://blog.example.com',
    name: 'Example Blog',
    description: 'Company blog running on WordPress',
    lastScan: new Date('2023-05-05T10:15:00'),
    status: 'active',
    verified: true,
    owner: '2',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    url: 'https://store.example.com',
    name: 'Example Store',
    description: 'E-commerce website',
    lastScan: new Date('2023-05-12T08:45:00'),
    status: 'scanning',
    verified: true,
    owner: '2',
    createdAt: new Date('2023-03-05')
  },
  {
    id: '4',
    url: 'https://dev.example.com',
    name: 'Development Server',
    description: 'Staging environment',
    status: 'inactive',
    verified: false,
    owner: '2',
    createdAt: new Date('2023-04-10')
  },
];

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: 'v1',
    name: 'SQL Injection',
    description: 'SQL Injection vulnerability in login form',
    severity: 'high',
    url: 'https://example.com/login',
    date: new Date('2023-05-10T14:35:00'),
    status: 'open',
    category: 'Injection',
    cwe: 'CWE-89',
    remediation: 'Use prepared statements and parameterized queries'
  },
  {
    id: 'v2',
    name: 'Cross-Site Scripting (XSS)',
    description: 'Stored XSS in comment section',
    severity: 'high',
    url: 'https://blog.example.com/post/1#comments',
    date: new Date('2023-05-05T10:20:00'),
    status: 'open',
    category: 'XSS',
    cwe: 'CWE-79',
    remediation: 'Implement proper output encoding and use Content-Security-Policy'
  },
  {
    id: 'v3',
    name: 'Missing CSRF Token',
    description: 'CSRF protection missing on form submission',
    severity: 'medium',
    url: 'https://example.com/profile/update',
    date: new Date('2023-05-10T14:40:00'),
    status: 'open',
    category: 'CSRF',
    cwe: 'CWE-352',
    remediation: 'Implement anti-CSRF tokens in all forms'
  },
  {
    id: 'v4',
    name: 'Sensitive Information in robots.txt',
    description: 'robots.txt contains paths to sensitive directories',
    severity: 'low',
    url: 'https://example.com/robots.txt',
    date: new Date('2023-05-10T14:45:00'),
    status: 'fixed',
    category: 'Information Disclosure',
    cwe: 'CWE-200',
    remediation: 'Remove sensitive paths from robots.txt'
  },
  {
    id: 'v5',
    name: 'Outdated jQuery Version',
    description: 'Using jQuery v1.8.3 with known vulnerabilities',
    severity: 'medium',
    url: 'https://example.com',
    date: new Date('2023-05-10T14:50:00'),
    status: 'open',
    category: 'Outdated Software',
    cwe: 'CWE-1104',
    remediation: 'Update to the latest jQuery version'
  },
  {
    id: 'v6',
    name: 'Insecure SSL/TLS Configuration',
    description: 'TLS 1.0/1.1 and weak cipher suites enabled',
    severity: 'medium',
    url: 'https://example.com',
    date: new Date('2023-05-10T14:55:00'),
    status: 'open',
    category: 'Insecure Configuration',
    cwe: 'CWE-327',
    remediation: 'Disable TLS 1.0/1.1 and weak cipher suites'
  },
  {
    id: 'v7',
    name: 'Directory Listing Enabled',
    description: 'Directory listing enabled exposing file structure',
    severity: 'low',
    url: 'https://example.com/images/',
    date: new Date('2023-05-10T15:00:00'),
    status: 'open',
    category: 'Information Disclosure',
    cwe: 'CWE-548',
    remediation: 'Disable directory listing in web server configuration'
  },
  {
    id: 'v8',
    name: 'Open Redirect',
    description: 'Unvalidated redirect parameter in login functionality',
    severity: 'low',
    url: 'https://example.com/login?redirect=',
    date: new Date('2023-05-10T15:05:00'),
    status: 'ignored',
    category: 'Unvalidated Redirects',
    cwe: 'CWE-601',
    remediation: 'Implement a whitelist of allowed redirect URLs'
  },
  {
    id: 'v9',
    name: 'Session ID in URL',
    description: 'Session identifiers included in URL parameters',
    severity: 'medium',
    url: 'https://example.com/home?session=abc123',
    date: new Date('2023-05-10T15:10:00'),
    status: 'open',
    category: 'Session Management',
    cwe: 'CWE-598',
    remediation: 'Use cookies with secure and HttpOnly flags for session management'
  },
  {
    id: 'v10',
    name: 'Missing Security Headers',
    description: 'Security headers like CSP, X-XSS-Protection missing',
    severity: 'info',
    url: 'https://example.com',
    date: new Date('2023-05-10T15:15:00'),
    status: 'open',
    category: 'Security Headers',
    cwe: 'CWE-693',
    remediation: 'Implement proper security headers in HTTP responses'
  }
];

export const mockScanResults: ScanResult[] = [
  {
    id: 'scan1',
    targetId: '1',
    startTime: new Date('2023-05-10T14:30:00'),
    endTime: new Date('2023-05-10T15:20:00'),
    status: 'completed',
    vulnerabilities: [
      mockVulnerabilities[0],
      mockVulnerabilities[2],
      mockVulnerabilities[3],
      mockVulnerabilities[5],
      mockVulnerabilities[9]
    ],
    summary: {
      totalUrls: 120,
      scannedUrls: 118,
      highSeverity: 1,
      mediumSeverity: 2,
      lowSeverity: 1,
      infoSeverity: 1
    }
  },
  {
    id: 'scan2',
    targetId: '2',
    startTime: new Date('2023-05-05T10:15:00'),
    endTime: new Date('2023-05-05T11:30:00'),
    status: 'completed',
    vulnerabilities: [mockVulnerabilities[1], mockVulnerabilities[6], mockVulnerabilities[7]],
    summary: {
      totalUrls: 85,
      scannedUrls: 85,
      highSeverity: 1,
      mediumSeverity: 0,
      lowSeverity: 2,
      infoSeverity: 0
    }
  },
  {
    id: 'scan3',
    targetId: '3',
    startTime: new Date('2023-05-12T08:45:00'),
    status: 'in_progress',
    vulnerabilities: [mockVulnerabilities[4], mockVulnerabilities[8]],
    summary: {
      totalUrls: 200,
      scannedUrls: 75,
      highSeverity: 0,
      mediumSeverity: 2,
      lowSeverity: 0,
      infoSeverity: 0
    }
  },
  {
    id: 'scan4',
    targetId: '1',
    startTime: new Date('2023-04-10T09:30:00'),
    endTime: new Date('2023-04-10T10:45:00'),
    status: 'completed',
    vulnerabilities: [
      mockVulnerabilities[0],
      mockVulnerabilities[2],
      mockVulnerabilities[3],
      mockVulnerabilities[9]
    ],
    summary: {
      totalUrls: 115,
      scannedUrls: 115,
      highSeverity: 1,
      mediumSeverity: 1,
      lowSeverity: 1,
      infoSeverity: 1
    }
  }
];

export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingCycle: 'monthly',
    features: {
      maxTargets: 1,
      maxScansPerMonth: 5,
      advancedReports: false,
      apiAccess: false,
      supportLevel: 'email',
      scanTypes: ['quick'],
      scanDepth: ['shallow']
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.99,
    billingCycle: 'monthly',
    features: {
      maxTargets: 5,
      maxScansPerMonth: 20,
      advancedReports: true,
      apiAccess: false,
      supportLevel: 'priority',
      scanTypes: ['quick', 'full'],
      scanDepth: ['shallow', 'normal']
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199.99,
    billingCycle: 'monthly',
    features: {
      maxTargets: 20,
      maxScansPerMonth: 100,
      advancedReports: true,
      apiAccess: true,
      supportLevel: '24/7',
      scanTypes: ['quick', 'full', 'custom'],
      scanDepth: ['shallow', 'normal', 'deep']
    }
  }
];

export const mockReports: Report[] = [
  {
    id: 'r1',
    name: 'Example Website Full Report - May 2023',
    scanId: 'scan1',
    targetId: '1',
    createdAt: new Date('2023-05-10T15:25:00'),
    format: 'pdf',
    url: '/reports/example-website-may-2023.pdf'
  },
  {
    id: 'r2',
    name: 'Example Blog Security Report - May 2023',
    scanId: 'scan2',
    targetId: '2',
    createdAt: new Date('2023-05-05T11:35:00'),
    format: 'html',
    url: '/reports/example-blog-may-2023.html'
  },
  {
    id: 'r3',
    name: 'Example Website Monthly Report - April 2023',
    scanId: 'scan4',
    targetId: '1',
    createdAt: new Date('2023-04-10T10:50:00'),
    format: 'pdf',
    url: '/reports/example-website-april-2023.pdf'
  }
];

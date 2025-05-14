
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Mail, Trash2, Edit, Plus, FilePlus, UserCheck } from "lucide-react";

// Mock data for admin view
const mockVulnerabilitySummaries = [
  {
    id: "sum-001",
    targetId: "target-001",
    targetName: "example.com",
    customerId: "user-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    scanDate: new Date(2025, 4, 10),
    critical: 0,
    high: 3,
    medium: 7,
    low: 12,
    info: 5,
    vulnerabilityTypes: ["SQL Injection", "XSS", "CSRF"],
    reportSent: true,
    reportId: "rep-001",
  },
  {
    id: "sum-002",
    targetId: "target-002",
    targetName: "testsite.org",
    customerId: "user-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    scanDate: new Date(2025, 4, 8),
    critical: 1,
    high: 2,
    medium: 5,
    low: 8,
    info: 3,
    vulnerabilityTypes: ["XSS", "Broken Authentication"],
    reportSent: true,
    reportId: "rep-002",
  },
];

// Mock data for customers
const mockCustomers = [
  { id: "user-001", name: "John Doe", email: "john@example.com" },
  { id: "user-002", name: "Jane Smith", email: "jane@example.com" },
  { id: "user-003", name: "Bob Johnson", email: "bob@example.com" },
];

// Mock data for targets
const mockTargets = [
  { id: "target-001", name: "example.com", customerId: "user-001" },
  { id: "target-002", name: "testsite.org", customerId: "user-002" },
  { id: "target-003", name: "myapp.dev", customerId: "user-003" },
];

// Common vulnerability types for selection
const commonVulnerabilityTypes = [
  "SQL Injection", 
  "XSS", 
  "CSRF", 
  "Broken Authentication", 
  "Security Misconfiguration", 
  "Sensitive Data Exposure",
  "Insecure Deserialization",
  "Using Components with Known Vulnerabilities",
  "Insufficient Logging & Monitoring"
];

export default function AdminReportManager() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summaries");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSendReportDialogOpen, setIsSendReportDialogOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<any>(null);
  
  // Form state
  const [formState, setFormState] = useState({
    targetId: "",
    customerId: "",
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
    vulnerabilityTypes: [] as string[],
    scanDate: new Date().toISOString().split("T")[0],
  });

  // Email form state
  const [emailForm, setEmailForm] = useState({
    recipient: "",
    subject: "Your Security Scan Report",
    message: "",
  });

  const handleCreateSummary = () => {
    // In a real app, this would save to the database
    toast({
      title: "Summary Created",
      description: "Vulnerability summary has been created successfully.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleSendReport = () => {
    // In a real app, this would send an email with the report
    toast({
      title: "Report Sent",
      description: `Full report has been sent to ${emailForm.recipient}.`,
    });
    setIsSendReportDialogOpen(false);
  };

  const prepareToSendReport = (summary: any) => {
    setSelectedSummary(summary);
    setEmailForm({
      recipient: summary.customerEmail,
      subject: `Security Scan Report for ${summary.targetName}`,
      message: `Dear ${summary.customerName},\n\nPlease find attached the full security scan report for ${summary.targetName}. The scan identified the following vulnerabilities:\n\n- ${summary.critical} Critical\n- ${summary.high} High\n- ${summary.medium} Medium\n- ${summary.low} Low\n- ${summary.info} Informational\n\nFor any questions, please contact our security team.`,
    });
    setIsSendReportDialogOpen(true);
  };

  const handleVulnerabilityTypeChange = (type: string) => {
    setFormState(prev => {
      const types = [...prev.vulnerabilityTypes];
      
      if (types.includes(type)) {
        return { ...prev, vulnerabilityTypes: types.filter(t => t !== type) };
      } else {
        return { ...prev, vulnerabilityTypes: [...types, type] };
      }
    });
  };

  const handleTargetChange = (targetId: string) => {
    setFormState(prev => {
      const target = mockTargets.find(t => t.id === targetId);
      return { 
        ...prev, 
        targetId,
        customerId: target ? target.customerId : prev.customerId
      };
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="summaries" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="summaries">Vulnerability Summaries</TabsTrigger>
            <TabsTrigger value="reports">Report Management</TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Vulnerability Summary
            </Button>
          </div>

          <TabsContent value="summaries" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Summaries</CardTitle>
                <CardDescription>
                  Manage security scan results for customer targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Target</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Scan Date</TableHead>
                      <TableHead>Vulnerabilities</TableHead>
                      <TableHead>Report Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVulnerabilitySummaries.map((summary) => (
                      <TableRow key={summary.id}>
                        <TableCell className="font-medium">{summary.targetName}</TableCell>
                        <TableCell>{summary.customerName}</TableCell>
                        <TableCell>{format(summary.scanDate, "PP")}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {summary.critical > 0 && <Badge className="bg-purple-500">Critical: {summary.critical}</Badge>}
                            {summary.high > 0 && <Badge className="bg-red-500">High: {summary.high}</Badge>}
                            {summary.medium > 0 && <Badge className="bg-amber-500">Med: {summary.medium}</Badge>}
                            {summary.low > 0 && <Badge className="bg-green-500">Low: {summary.low}</Badge>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={summary.reportSent ? "default" : "outline"}>
                            {summary.reportSent ? "Sent" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => prepareToSendReport(summary)} disabled={!summary.reportId}>
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Management</CardTitle>
                <CardDescription>
                  Upload and send security reports to customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Upload New Report</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="summary">Select Vulnerability Summary</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a summary..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mockVulnerabilitySummaries.map((summary) => (
                              <SelectItem key={summary.id} value={summary.id}>
                                {summary.targetName} - {format(summary.scanDate, "PP")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fileType">File Type</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="file">Upload Report File</Label>
                      <Input id="file" type="file" className="mt-1" />
                    </div>
                    <Button className="mt-4">
                      <FilePlus className="h-4 w-4 mr-2" />
                      Upload Report
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Recent Reports</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Target</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>example.com</TableCell>
                          <TableCell>John Doe</TableCell>
                          <TableCell>{format(new Date(2025, 4, 10), "PP")}</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>
                            <Badge>Sent</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>testsite.org</TableCell>
                          <TableCell>Jane Smith</TableCell>
                          <TableCell>{format(new Date(2025, 4, 8), "PP")}</TableCell>
                          <TableCell>PDF</TableCell>
                          <TableCell>
                            <Badge>Sent</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Vulnerability Summary Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Vulnerability Summary</DialogTitle>
            <DialogDescription>
              Add a new vulnerability summary for a customer target
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="target">Select Target</Label>
              <Select value={formState.targetId} onValueChange={handleTargetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a target..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTargets.map((target) => (
                    <SelectItem key={target.id} value={target.id}>
                      {target.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Select value={formState.customerId} onValueChange={(value) => setFormState({...formState, customerId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer..." />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="scanDate">Scan Date</Label>
              <Input 
                id="scanDate" 
                type="date" 
                value={formState.scanDate} 
                onChange={(e) => setFormState({...formState, scanDate: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Vulnerability Counts</Label>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Label htmlFor="critical">Critical</Label>
                <Input 
                  id="critical" 
                  type="number" 
                  min="0"
                  value={formState.critical} 
                  onChange={(e) => setFormState({...formState, critical: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="high">High</Label>
                <Input 
                  id="high" 
                  type="number" 
                  min="0"
                  value={formState.high} 
                  onChange={(e) => setFormState({...formState, high: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="medium">Medium</Label>
                <Input 
                  id="medium" 
                  type="number" 
                  min="0"
                  value={formState.medium} 
                  onChange={(e) => setFormState({...formState, medium: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="low">Low</Label>
                <Input 
                  id="low" 
                  type="number" 
                  min="0"
                  value={formState.low} 
                  onChange={(e) => setFormState({...formState, low: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="info">Info</Label>
                <Input 
                  id="info" 
                  type="number" 
                  min="0"
                  value={formState.info} 
                  onChange={(e) => setFormState({...formState, info: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Vulnerability Types</Label>
            <div className="flex flex-wrap gap-2">
              {commonVulnerabilityTypes.map((type) => (
                <Badge 
                  key={type} 
                  variant={formState.vulnerabilityTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleVulnerabilityTypeChange(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSummary}>
              Create Summary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Send Report Dialog */}
      <Dialog open={isSendReportDialogOpen} onOpenChange={setIsSendReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Report to Customer</DialogTitle>
            <DialogDescription>
              Email the full security report to the customer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                value={emailForm.recipient} 
                onChange={(e) => setEmailForm({...emailForm, recipient: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={emailForm.subject} 
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message" 
                className="w-full min-h-[150px] p-2 border rounded-md"
                value={emailForm.message} 
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input id="report" type="file" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendReport}>
              <Mail className="h-4 w-4 mr-2" />
              Send Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const vulnerabilityTrendData = [
  { name: "Jan", high: 4, medium: 8, low: 15, info: 6 },
  { name: "Feb", high: 3, medium: 10, low: 12, info: 8 },
  { name: "Mar", high: 5, medium: 7, low: 10, info: 9 },
  { name: "Apr", high: 2, medium: 5, low: 8, info: 12 },
  { name: "May", high: 3, medium: 6, low: 9, info: 10 },
];

const vulnerabilityTypeData = [
  { name: "SQL Injection", count: 12 },
  { name: "XSS", count: 18 },
  { name: "CSRF", count: 8 },
  { name: "Directory Traversal", count: 6 },
  { name: "SSL/TLS Issues", count: 15 },
  { name: "Outdated Software", count: 9 },
];

const scanActivityData = [
  { name: "Week 1", scans: 5 },
  { name: "Week 2", scans: 8 },
  { name: "Week 3", scans: 12 },
  { name: "Week 4", scans: 10 },
  { name: "Week 5", scans: 15 },
];

export default function AnalyticsPage() {
  const chartConfig = {
    high: { color: "#dc2626" },  // red-600
    medium: { color: "#f59e0b" }, // amber-500
    low: { color: "#65a30d" },   // lime-600
    info: { color: "#0ea5e9" },  // sky-500
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Vulnerability Trends</TabsTrigger>
          <TabsTrigger value="activity">Scan Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Trends</CardTitle>
                <CardDescription>Monthly breakdown of vulnerabilities by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={vulnerabilityTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="high" stroke="#dc2626" strokeWidth={2} />
                        <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="low" stroke="#65a30d" strokeWidth={2} />
                        <Line type="monotone" dataKey="info" stroke="#0ea5e9" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Types</CardTitle>
                <CardDescription>Most common vulnerability categories found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Trends</CardTitle>
              <CardDescription>Monthly breakdown of vulnerabilities by severity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vulnerabilityTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="high" stroke="#dc2626" strokeWidth={2} />
                      <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="low" stroke="#65a30d" strokeWidth={2} />
                      <Line type="monotone" dataKey="info" stroke="#0ea5e9" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Scan Activity</CardTitle>
              <CardDescription>Number of scans performed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scanActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="scans" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

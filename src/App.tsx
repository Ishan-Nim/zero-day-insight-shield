
import React from "react"; 
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminNotificationProvider } from "@/context/AdminNotificationContext";
import ErrorBoundary from "@/components/ErrorBoundary";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import TargetsPage from "./pages/targets/TargetsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import AdminScanQueuePage from "./pages/admin/AdminScanQueuePage";
import ScansPage from "./pages/scans/ScansPage";
import AboutPage from "./pages/about/AboutPage";
import SubscriptionPage from "./pages/subscription/SubscriptionPage";

// Create a QueryClient instance with production-optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: import.meta.env.PROD, // Only in production
      staleTime: 300000, // 5 minutes
    },
  }
});

// Create a window.React for libraries that rely on it being globally available
window.React = React;

const App = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="cybercrew-theme">
            <AuthProvider>
              <AdminNotificationProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      
                      <Route path="/" element={
                        <Layout>
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        </Layout>
                      } />
                      
                      <Route path="/targets" element={
                        <Layout>
                          <ProtectedRoute>
                            <TargetsPage />
                          </ProtectedRoute>
                        </Layout>
                      } />

                      <Route path="/scans" element={
                        <Layout>
                          <ProtectedRoute>
                            <ScansPage />
                          </ProtectedRoute>
                        </Layout>
                      } />

                      <Route path="/reports" element={
                        <Layout>
                          <ProtectedRoute>
                            <ReportsPage />
                          </ProtectedRoute>
                        </Layout>
                      } />
                      
                      <Route path="/analytics" element={
                        <Layout>
                          <ProtectedRoute>
                            <AnalyticsPage />
                          </ProtectedRoute>
                        </Layout>
                      } />

                      <Route path="/about" element={
                        <Layout>
                          <AboutPage />
                        </Layout>
                      } />

                      <Route path="/subscription" element={
                        <Layout>
                          <ProtectedRoute>
                            <SubscriptionPage />
                          </ProtectedRoute>
                        </Layout>
                      } />

                      <Route path="/admin" element={
                        <Layout>
                          <ProtectedRoute requiredRole="admin">
                            <AdminScanQueuePage />
                          </ProtectedRoute>
                        </Layout>
                      } />

                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </AdminNotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default App;

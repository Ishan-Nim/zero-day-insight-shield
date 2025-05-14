
import React from "react"; 
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminNotificationProvider } from "@/context/AdminNotificationContext";

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

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="zeroday-theme">
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
    </React.StrictMode>
  );
};

export default App;

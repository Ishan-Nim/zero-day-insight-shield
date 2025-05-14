
import * as React from "react"; 
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import TargetsPage from "./pages/targets/TargetsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="zeroday-theme">
          <AuthProvider>
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
                        {/* Admin panel will be implemented */}
                        <div className="p-6">
                          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
                          <p>This is the admin panel, only accessible to administrators.</p>
                        </div>
                      </ProtectedRoute>
                    </Layout>
                  } />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

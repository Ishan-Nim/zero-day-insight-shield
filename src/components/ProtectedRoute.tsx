
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requiredRole?: "user" | "admin";
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false,
  requiredRole
}: ProtectedRouteProps) {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin-only access is required
  if (adminOnly && currentUser?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }
  
  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}

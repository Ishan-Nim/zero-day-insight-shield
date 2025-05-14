
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "./Dashboard";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Always redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Show dashboard if authenticated
  return <Dashboard />;
};

export default Index;

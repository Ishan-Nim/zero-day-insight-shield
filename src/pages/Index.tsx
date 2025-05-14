
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Dashboard />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Index;

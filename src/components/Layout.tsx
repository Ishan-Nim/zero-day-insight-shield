
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SidebarComponent } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Only show admin panel in sidebar for users with admin role
  const isAdmin = isAuthenticated && currentUser?.role === 'admin';

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar for authenticated users */}
      {isAuthenticated && (
        <SidebarComponent 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          isAdmin={isAdmin} 
          currentUser={currentUser}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Navbar */}
        <Header 
          setSidebarOpen={setSidebarOpen} 
          isAuthenticated={isAuthenticated} 
        />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

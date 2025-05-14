
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SidebarComponent } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Only show admin panel in sidebar for users with admin role
  const isAdmin = isAuthenticated && currentUser?.role === 'admin';

  // Don't render layout components if not authenticated (for login/signup pages)
  const isAuthPage = !isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/signup');

  if (isAuthPage) {
    return <div className="w-full min-h-screen bg-background">
      <main className="w-full h-full">
        {children}
      </main>
    </div>;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background">
      {/* Sidebar for authenticated users */}
      {isAuthenticated && (
        <SidebarComponent 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          isAdmin={isAdmin} 
          currentUser={currentUser}
        />
      )}

      {/* Main content - full width */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Navbar */}
        {isAuthenticated && (
          <Header 
            setSidebarOpen={setSidebarOpen} 
            isAuthenticated={isAuthenticated} 
          />
        )}

        {/* Page content - full width */}
        <main className="flex-1 overflow-auto w-full bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

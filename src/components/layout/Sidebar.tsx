
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CcrLogo } from "@/components/CcrLogo";
import { SidebarNavigation } from "./SidebarNavigation";
import { SubscriptionInfo } from "./SubscriptionInfo";
import { User } from "@/types"; // Updated import path to use the local User type

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isAdmin: boolean;
  currentUser: User | null;
}

export const SidebarComponent = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  isAdmin, 
  currentUser 
}: SidebarProps) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 flex-shrink-0 w-64 bg-sidebar transition-all duration-300 ease-in-out transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-auto flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-3 h-20 bg-sidebar-accent">
        <div className="flex items-center flex-1 justify-center">
          <CcrLogo size="md" />
        </div>
        <Button 
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <Menu className="h-5 w-5 text-sidebar-foreground" />
        </Button>
      </div>
      
      <SidebarNavigation isAdmin={isAdmin} />
      <SubscriptionInfo currentUser={currentUser} />
    </aside>
  );
};


import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SidebarNavigation } from "./SidebarNavigation";
import { SubscriptionInfo } from "./SubscriptionInfo";
import { User } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { CcrLogo } from "@/components/CcrLogo";

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
  const isMobile = useIsMobile();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 flex-shrink-0 w-64 bg-sidebar transition-all duration-300 ease-in-out transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-auto flex flex-col h-screen`}
    >
      <div className="flex items-center justify-between px-4 py-3 h-16 bg-sidebar-accent">
        <div className="flex items-center justify-center w-full">
          <CcrLogo size="md" />
        </div>
        {isMobile && (
          <Button 
            variant="ghost"
            size="icon"
            className="md:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <SidebarNavigation isAdmin={isAdmin} />
      <SubscriptionInfo currentUser={currentUser} />
    </aside>
  );
};

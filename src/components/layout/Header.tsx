
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Menu, Bell, LogOut, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CcrLogo } from "@/components/CcrLogo";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  isAuthenticated: boolean;
}

export const Header = ({ setSidebarOpen, isAuthenticated }: HeaderProps) => {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map(n => n[0])
          .join('')
      : '?';
  };

  return (
    <header className="bg-white dark:bg-background border-b w-full">
      <div className="flex items-center justify-between h-16 px-4 w-full">
        <div className="flex items-center">
          {isAuthenticated && isMobile && (
            <Button 
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          {/* Only show logo in header on mobile */}
          {isMobile && (
            <div className="md:hidden">
              <CcrLogo size="sm" />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative inline-flex items-center justify-center h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#00b3b0] text-white">
                    {currentUser?.name ? getInitials(currentUser.name) : currentUser?.email.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {currentUser?.name || currentUser?.email}
                <p className="text-xs text-muted-foreground">
                  {currentUser?.subscription ? t(`subscription.${currentUser.subscription.toLowerCase()}Plan`) : t('subscription.freePlan')}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/profile")}>
                {t('header.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate("/settings")}>
                {t('header.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                {t('header.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

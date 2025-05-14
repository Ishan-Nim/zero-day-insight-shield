
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
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
import { CcrLogo } from "@/components/CcrLogo";
import { Menu, Bell, LogOut, UserPlus } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  isAuthenticated: boolean;
}

export const Header = ({ setSidebarOpen, isAuthenticated }: HeaderProps) => {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
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
    <header className="bg-white dark:bg-background shadow-sm border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          {isAuthenticated && (
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isAuthenticated && (
            <div className="flex items-center">
              <CcrLogo />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated && (
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              {t('header.about')}
            </Link>
          )}
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative inline-flex items-center justify-center h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
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
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Sign Up</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create an Account</DialogTitle>
                    <DialogDescription>
                      Sign up to start scanning your websites for vulnerabilities.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      For this demo, please use the login page with these credentials:
                    </p>
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p><strong>Admin:</strong> admin@zeroday.com / admin123</p>
                      <p><strong>User:</strong> demo@zeroday.com / demo123</p>
                    </div>
                    <div className="flex justify-center">
                      <Button className="w-full" onClick={() => navigate('/login')}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Go to Login
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

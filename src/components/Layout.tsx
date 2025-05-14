import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  Shield,
  PieChart,
  LayoutDashboard,
  Target,
  FileBarChart,
  Settings,
  Bell,
  LogOut,
  Menu,
  UserPlus,
  CreditCard
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const navigationItems = [
    { name: t('header.dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('header.targets'), href: '/targets', icon: Target },
    { name: t('header.scans'), href: '/scans', icon: Shield },
    { name: t('header.reports'), href: '/reports', icon: FileBarChart },
    { name: t('header.analytics'), href: '/analytics', icon: PieChart },
  ];

  // Only show admin panel in sidebar for users with admin role
  // Note: It's not shown in the UI for regular users
  const isAdmin = isAuthenticated && currentUser?.role === 'admin';

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for authenticated users */}
      {isAuthenticated && (
        <aside 
          className={`fixed inset-y-0 left-0 z-20 flex-shrink-0 w-64 bg-sidebar transition-all duration-300 ease-in-out transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:inset-auto flex flex-col`}
        >
          <div className="flex items-center justify-between px-6 h-16 bg-sidebar-accent">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-semibold text-sidebar-foreground">ZeroDay</span>
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
          <nav className="flex-1 overflow-auto py-4 px-3">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              
              {isAdmin && (
                <li>
                  <Link 
                    to="/admin"
                    className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group"
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    <span>{t('header.settings')}</span>
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-8 px-3">
              <div className="py-2 text-xs uppercase text-sidebar-foreground/70">Subscription</div>
              <Link 
                to="/subscription"
                className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group"
              >
                <CreditCard className="mr-3 h-5 w-5" />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {currentUser?.subscription || 'Free'} Plan
                  </span>
                  <span className="text-xs text-sidebar-foreground/70">
                    Manage subscription
                  </span>
                </div>
              </Link>
            </div>
          </nav>
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
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
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <span className="font-semibold text-lg">ZeroDay</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
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
                        <p className="text-xs text-muted-foreground">{currentUser?.subscription} Plan</p>
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

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}

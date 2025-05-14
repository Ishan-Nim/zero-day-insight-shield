
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Shield, 
  PieChart, 
  LayoutDashboard, 
  Target, 
  FileBarChart, 
  Settings, 
  Info,
  CreditCard 
} from "lucide-react";

interface SidebarNavigationProps {
  isAdmin: boolean;
}

export const SidebarNavigation = ({ isAdmin }: SidebarNavigationProps) => {
  const { t } = useLanguage();

  const navigationItems = [
    { name: t('sidebar.dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('sidebar.targets'), href: '/targets', icon: Target },
    { name: t('sidebar.scans'), href: '/scans', icon: Shield },
    { name: t('sidebar.reports'), href: '/reports', icon: FileBarChart },
    { name: t('sidebar.analytics'), href: '/analytics', icon: PieChart },
    { name: t('sidebar.subscription'), href: '/subscription', icon: CreditCard },
    { name: t('sidebar.about'), href: '/about', icon: Info },
  ];

  return (
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
              <span>{t('sidebar.settings')}</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

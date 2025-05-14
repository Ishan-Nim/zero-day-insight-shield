
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { User } from "@/types"; // Updated import path to use the local User type

interface SubscriptionInfoProps {
  currentUser: User | null;
}

export const SubscriptionInfo = ({ currentUser }: SubscriptionInfoProps) => {
  const { t } = useLanguage();

  return (
    <div className="mt-8 px-3">
      <div className="py-2 text-xs uppercase text-sidebar-foreground/70">{t('sidebar.subscription')}</div>
      <Link 
        to="/subscription"
        className="flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group"
      >
        <CreditCard className="mr-3 h-5 w-5" />
        <div className="flex flex-col">
          <span className="font-medium">
            {currentUser?.subscription ? t(`subscription.${currentUser.subscription.toLowerCase()}Plan`) : t('subscription.freePlan')}
          </span>
          <span className="text-xs text-sidebar-foreground/70">
            {t('subscription.planManagement')}
          </span>
        </div>
      </Link>
    </div>
  );
};

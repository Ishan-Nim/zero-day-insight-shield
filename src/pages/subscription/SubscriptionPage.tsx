
import React, { useState } from 'react';
import { Check, CreditCard, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SubscriptionPage = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Mock pricing data
  const pricingPlans = [
    {
      id: 'free',
      name: t('subscription.freePlan'),
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: {
        targets: '1',
        scans: '2',
        supportTime: '48 ' + t('subscription.hours'),
        apiAccess: false,
        advancedReporting: false,
        scheduledScans: false,
        customScans: false,
        dedicatedSupport: false,
      },
      color: 'bg-gray-100 dark:bg-gray-800',
    },
    {
      id: 'basic',
      name: t('subscription.basicPlan'),
      monthlyPrice: 29,
      yearlyPrice: 278,
      features: {
        targets: '5',
        scans: '10',
        supportTime: '24 ' + t('subscription.hours'),
        apiAccess: true,
        advancedReporting: false,
        scheduledScans: true,
        customScans: false,
        dedicatedSupport: false,
      },
      color: 'bg-blue-50 dark:bg-blue-900/20',
      popular: true,
    },
    {
      id: 'pro',
      name: t('subscription.proPlan'),
      monthlyPrice: 99,
      yearlyPrice: 950,
      features: {
        targets: '20',
        scans: '50',
        supportTime: '12 ' + t('subscription.hours'),
        apiAccess: true,
        advancedReporting: true,
        scheduledScans: true,
        customScans: true,
        dedicatedSupport: false,
      },
      color: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      id: 'enterprise',
      name: t('subscription.enterprisePlan'),
      monthlyPrice: 299,
      yearlyPrice: 2870,
      features: {
        targets: t('subscription.unlimited'),
        scans: t('subscription.unlimited'),
        supportTime: '4 ' + t('subscription.hours'),
        apiAccess: true,
        advancedReporting: true,
        scheduledScans: true,
        customScans: true,
        dedicatedSupport: true,
      },
      color: 'bg-green-50 dark:bg-green-900/20',
    }
  ];

  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription Updated",
      description: `You are now subscribed to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
      duration: 5000,
    });
  };

  const handleContactSales = () => {
    toast({
      title: "Contact Request Sent",
      description: "Our sales team will contact you shortly.",
      duration: 5000,
    });
  };

  // Get current user's plan
  const userPlanId = currentUser?.subscription?.toLowerCase() || 'free';

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{t('subscription.title')}</h1>
        
        <div className="flex items-center justify-center space-x-3 mt-8">
          <Label htmlFor="billing-toggle">{t('subscription.monthlyBilling')}</Label>
          <Switch
            id="billing-toggle"
            checked={billingCycle === 'yearly'}
            onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor="billing-toggle" className="flex items-center">
            {t('subscription.yearlyBilling')}
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">-20%</span>
          </Label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={`overflow-hidden border ${plan.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center text-xs font-medium py-1">
                {t('subscription.currentPlan')}
              </div>
            )}
            <CardHeader className={`${plan.color}`}>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-bold">
                  ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {billingCycle === 'monthly' ? t('subscription.perMonth') : t('subscription.perYear')}
                </span>
              </div>
              <CardDescription className="mt-2">
                {plan.id === 'free' ? 'Limited features' : `Up to ${plan.features.targets} targets`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium text-sm mb-4">{t('subscription.features')}:</h4>
              <ul className="space-y-3">
                <FeatureItem 
                  feature={`${plan.features.targets} ${t('subscription.targetsIncluded')}`} 
                  included={true} 
                />
                <FeatureItem 
                  feature={`${plan.features.scans} ${t('subscription.scansPerMonth')}`} 
                  included={true} 
                />
                <FeatureItem 
                  feature={`${plan.features.supportTime} ${t('subscription.supportResponse')}`} 
                  included={true} 
                />
                <FeatureItem 
                  feature={t('subscription.apiAccess')} 
                  included={plan.features.apiAccess} 
                />
                <FeatureItem 
                  feature={t('subscription.advancedReporting')} 
                  included={plan.features.advancedReporting} 
                />
                <FeatureItem 
                  feature={t('subscription.scheduledScans')} 
                  included={plan.features.scheduledScans} 
                />
                <FeatureItem 
                  feature={t('subscription.customScans')} 
                  included={plan.features.customScans} 
                />
                <FeatureItem 
                  feature={t('subscription.dedicated')} 
                  included={plan.features.dedicatedSupport} 
                />
              </ul>
              
              <div className="mt-6">
                {plan.id === 'enterprise' ? (
                  <Button className="w-full" onClick={handleContactSales}>
                    {t('subscription.contact')}
                  </Button>
                ) : userPlanId === plan.id ? (
                  <Button className="w-full" variant="outline" disabled>
                    <Shield className="mr-2 h-4 w-4" />
                    {t('subscription.currentPlan')}
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={userPlanId === plan.id ? "outline" : "default"}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {parseInt(plan.features.targets) > parseInt(pricingPlans.find(p => p.id === userPlanId)?.features.targets || '0') 
                      ? t('subscription.upgrade') 
                      : t('subscription.downgrade')
                    }
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const FeatureItem = ({ feature, included }: { feature: string, included: boolean }) => (
  <li className="flex items-start">
    <span className={`flex-shrink-0 h-5 w-5 ${included ? 'text-green-500' : 'text-muted-foreground'}`}>
      {included ? (
        <Check className="h-5 w-5" />
      ) : (
        <span className="block h-0.5 w-5 bg-muted-foreground rounded-full mt-2"></span>
      )}
    </span>
    <span className={`ml-2 text-sm ${included ? '' : 'text-muted-foreground'}`}>
      {feature}
    </span>
  </li>
);

export default SubscriptionPage;

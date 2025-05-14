
import React from 'react';
import { Shield, Activity, BarChart, Globe, Bell, LockKeyhole, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/i18n';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <Shield className="h-12 w-12 text-teal-400" />
        </div>
        <h1 className="text-3xl font-bold">{t('about.title')}</h1>
        <h2 className="text-xl text-muted-foreground mt-2">{t('about.subtitle')}</h2>
      </div>

      <div className="prose dark:prose-invert max-w-none mb-16">
        <p className="text-lg font-medium">{t('about.intro')}</p>
        
        <p className="mt-4">{t('about.description')}</p>
      </div>

      <h3 className="text-2xl font-bold mb-6 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-teal-400" />
        {t('about.featuresTitle')}
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <FeatureCard 
          icon={<Activity />}
          title={t('about.features.dashboard.title')}
          description={t('about.features.dashboard.description')}
        />
        
        <FeatureCard 
          icon={<BarChart />}
          title={t('about.features.targets.title')}
          description={t('about.features.targets.description')}
        />
        
        <FeatureCard 
          icon={<Bell />}
          title={t('about.features.alerts.title')}
          description={t('about.features.alerts.description')}
        />
        
        <FeatureCard 
          icon={<Globe />}
          title={t('about.features.multilingual.title')}
          description={t('about.features.multilingual.description')}
        />
        
        <FeatureCard 
          icon={<LockKeyhole />}
          title={t('about.features.security.title')}
          description={t('about.features.security.description')}
          colSpan="md:col-span-2 lg:col-span-1"
        />
      </div>

      <div className="bg-muted rounded-lg p-8 mb-16">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 mr-2 text-teal-400" />
          <h3 className="text-xl font-bold">{t('about.conclusion')}</h3>
        </div>
        <p className="text-muted-foreground">{t('about.conclusionText')}</p>
        
        <div className="mt-6 text-center border-t pt-6">
          <p className="text-lg font-medium italic text-teal-400">"{t('about.tagline')}"</p>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colSpan?: string;
}

const FeatureCard = ({ icon, title, description, colSpan = "" }: FeatureCardProps) => (
  <Card className={`overflow-hidden ${colSpan}`}>
    <CardHeader className="pb-2">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-primary/10 rounded-full text-teal-400">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
  </Card>
);

export default AboutPage;

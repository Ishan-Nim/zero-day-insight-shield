
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet";
import { CcrLogo } from "@/components/CcrLogo";
import {
  Shield,
  BarChart,
  Target,
  Bell,
  Globe,
  Lock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("about.pageTitle")} | CyberCrew</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="flex flex-col items-center mb-12 text-center">
          <CcrLogo size="lg" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{t("about.intro")}</p>
        </div>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <p>{t("about.description")}</p>
          
          <h2 className="flex items-center gap-2 text-2xl font-bold mt-12 mb-6">
            <Shield className="text-[#00b3b0]" />
            {t("about.keyFeatures")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Dashboard Feature */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                  <BarChart className="text-[#00b3b0]" />
                  {t("about.featureDashboardTitle")}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("about.featureDashboard1")}</li>
                  <li>{t("about.featureDashboard2")}</li>
                  <li>{t("about.featureDashboard3")}</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Target Management */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                  <Target className="text-[#00b3b0]" />
                  {t("about.featureTargetTitle")}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("about.featureTarget1")}</li>
                  <li>{t("about.featureTarget2")}</li>
                  <li>{t("about.featureTarget3")}</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Alerts */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                  <Bell className="text-[#00b3b0]" />
                  {t("about.featureAlertsTitle")}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t("about.featureAlerts1")}</li>
                  <li>{t("about.featureAlerts2")}</li>
                  <li>{t("about.featureAlerts3")}</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Multilingual */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                  <Globe className="text-[#00b3b0]" />
                  {t("about.featureMultilingualTitle")}
                </h3>
                <p>{t("about.featureMultilingual")}</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="flex items-center gap-2 text-2xl font-bold mt-12 mb-6">
            <Lock className="text-[#00b3b0]" />
            {t("about.securityTitle")}
          </h2>
          
          <ul className="list-disc pl-5 space-y-2 mb-12">
            <li>{t("about.security1")}</li>
            <li>{t("about.security2")}</li>
            <li>{t("about.security3")}</li>
          </ul>
          
          <h2 className="flex items-center gap-2 text-2xl font-bold mt-12 mb-6">
            <TrendingUp className="text-[#00b3b0]" />
            {t("about.teamTitle")}
          </h2>
          
          <p className="mb-12">{t("about.teamDescription")}</p>
          
          <blockquote className="italic text-center text-xl font-medium border-l-4 border-[#00b3b0] pl-4 py-2 mb-12">
            {t("about.quote")}
          </blockquote>
        </div>
      </div>
    </>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Mail, Shield, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SubscriptionPage = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses and startups",
      features: [
        "5 Targets",
        "Weekly Scans",
        "Basic Reports",
        "Email Support"
      ],
      current: currentUser?.subscription === "free"
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      description: "For growing businesses needing more security",
      features: [
        "25 Targets",
        "Daily Scans",
        "Detailed Reports",
        "Advanced Vulnerability Analysis",
        "API Access",
        "Priority Support"
      ],
      popular: true,
      current: currentUser?.subscription === "premium"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Full security coverage for large organizations",
      features: [
        "Unlimited Targets",
        "Real-time Scanning",
        "Custom Reports",
        "White-label Reports",
        "Dedicated Support Team",
        "Custom Integrations",
        "On-Premises Option"
      ],
      contact: true,
      current: currentUser?.subscription === "enterprise"
    }
  ];

  const featureMatrix = [
    { 
      feature: "Number of Targets",
      basic: "5",
      premium: "25",
      enterprise: "Unlimited"
    },
    {
      feature: "Scan Frequency",
      basic: "Weekly",
      premium: "Daily",
      enterprise: "Real-time"
    },
    {
      feature: "Vulnerability Detection",
      basic: "Basic",
      premium: "Advanced",
      enterprise: "Comprehensive"
    },
    {
      feature: "API Access",
      basic: "✗",
      premium: "✓",
      enterprise: "✓"
    },
    {
      feature: "Custom Reports",
      basic: "✗",
      premium: "✗",
      enterprise: "✓"
    },
    {
      feature: "White-label Reports",
      basic: "✗",
      premium: "✗",
      enterprise: "✓"
    },
    {
      feature: "Support Level",
      basic: "Email",
      premium: "Priority",
      enterprise: "Dedicated Team"
    }
  ];

  const handleSubscribe = (plan: string) => {
    if (plan === "Enterprise") {
      setShowContactForm(true);
    } else {
      // Add your subscription logic here
      console.log(`Subscribing to ${plan} plan`);
    }
  };

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{t('subscription.title', 'Subscription Plans')}</h1>
          <p className="text-muted-foreground">
            {t('subscription.subtitle', 'Choose the plan that suits your security needs')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col ${plan.popular ? 'border-primary shadow-md' : ''} ${plan.current ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  {t('subscription.mostPopular', 'Most Popular')}
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.current && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {t('subscription.currentPlan', 'Current Plan')}
                    </span>
                  )}
                </CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.contact ? "outline" : (plan.current ? "secondary" : "default")}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.contact 
                    ? t('subscription.contactUs', 'Contact Us') 
                    : plan.current 
                      ? t('subscription.managePlan', 'Manage Plan')
                      : t('subscription.subscribe', 'Subscribe')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{t('subscription.featureComparison', 'Feature Comparison')}</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">{t('subscription.feature', 'Feature')}</TableHead>
                  <TableHead className="text-center">Basic</TableHead>
                  <TableHead className="text-center">Premium</TableHead>
                  <TableHead className="text-center">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureMatrix.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.feature}</TableCell>
                    <TableCell className="text-center">{item.basic}</TableCell>
                    <TableCell className="text-center">{item.premium}</TableCell>
                    <TableCell className="text-center">{item.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Enterprise Contact Form */}
        {showContactForm && (
          <div className="mt-12 bg-muted/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('subscription.contactUs', 'Contact Us')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('subscription.contactDescription', 'Fill out the form below and our team will contact you to discuss your enterprise security needs.')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('subscription.name', 'Name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('subscription.enterName', 'Enter your name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('subscription.email', 'Email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('subscription.enterEmail', 'Enter your email')}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    {t('subscription.company', 'Company')}
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('subscription.enterCompany', 'Enter your company name')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('subscription.message', 'Message')}
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded-md h-32"
                    placeholder={t('subscription.enterMessage', 'Tell us about your security needs')}
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setShowContactForm(false)} variant="outline">
                    {t('subscription.cancel', 'Cancel')}
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('subscription.sendMessage', 'Send Message')}
                  </Button>
                </div>
              </div>
              <div>
                <div className="bg-card rounded-lg p-6 h-full">
                  <h3 className="text-xl font-semibold mb-4">{t('subscription.whyEnterprise', 'Why Choose Enterprise?')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{t('subscription.dedicatedSupport', 'Dedicated Support Team')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t('subscription.dedicatedSupportDesc', 'Get direct access to our security experts 24/7')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{t('subscription.unlimitedScans', 'Unlimited Scan Targets')}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t('subscription.unlimitedScansDesc', 'Scan all of your assets without limitations')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-medium">{t('subscription.orContact', 'Or contact us directly:')}</h4>
                      <p className="text-sm mt-2">
                        <strong>Email:</strong> enterprise@cybercrew.com<br />
                        <strong>Phone:</strong> +1 (800) 123-4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('subscription.testimonials', 'What Our Customers Say')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "CyberCrew has transformed our security posture. We've identified and fixed vulnerabilities we didn't even know existed.",
                author: "Jane Smith",
                role: "CTO, TechCorp Inc."
              },
              {
                quote: "The automated scanning feature has saved our security team countless hours. The reports are clear and actionable.",
                author: "Michael Johnson",
                role: "Security Director, Global Finance"
              },
              {
                quote: "As a small business, we couldn't afford a dedicated security team. CyberCrew gives us enterprise-level security at an affordable price.",
                author: "Sarah Williams",
                role: "CEO, StartRight Solutions"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-muted/50">
                <CardContent className="pt-6">
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">{t('subscription.faq', 'Frequently Asked Questions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I change plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                q: "Is there a free trial?",
                a: "We offer a 14-day free trial for our Basic and Premium plans. No credit card required."
              },
              {
                q: "How is billing handled?",
                a: "We bill monthly or annually depending on your preference. All major credit cards are accepted."
              },
              {
                q: "What happens if I need more targets?",
                a: "You can upgrade your plan at any time to increase your target limit, or contact us for custom solutions."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

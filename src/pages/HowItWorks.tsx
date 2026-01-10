import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepCard } from "@/components/StepCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  ChefHat, 
  Bell, 
  Truck, 
  BarChart3, 
  Award,
  ArrowRight
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "AI Analyzes Historical Data",
      description: "Our Google Gemini-powered AI analyzes your historical serving data, local events, weather patterns, and seasonal trends to predict food demand accurately.",
      icon: <Brain className="h-5 w-5 text-secondary" />
    },
    {
      title: "Smart Cooking Suggestions",
      description: "Receive AI-powered suggestions for optimal cooking quantities. You maintain full control — suggestions are recommendations, not requirements.",
      icon: <ChefHat className="h-5 w-5 text-secondary" />
    },
    {
      title: "Report Surplus with One Click",
      description: "After service, report any excess food through our simple dashboard. Just enter quantity, type, and freshness window.",
      icon: <Bell className="h-5 w-5 text-secondary" />
    },
    {
      title: "NGOs Receive Real-Time Alerts",
      description: "Nearby NGOs are instantly notified about available food. They can view details and confirm pickup through their dashboard.",
      icon: <Truck className="h-5 w-5 text-secondary" />
    },
    {
      title: "Track Your Impact",
      description: "Monitor the food you've saved, people fed, and environmental impact through your personalized dashboard.",
      icon: <BarChart3 className="h-5 w-5 text-secondary" />
    },
    {
      title: "Earn Sustainability Certificates",
      description: "Receive verified certificates showcasing your contribution to SDG goals — great for CSR reports and brand reputation.",
      icon: <Award className="h-5 w-5 text-secondary" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Simple & Effective
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              How NutriGuard AI Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI prediction to real-time coordination — see how our platform 
              creates a seamless bridge between food surplus and those in need.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          {/* AI Transparency Note */}
          <div className="mt-16 p-6 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 shrink-0">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  AI Transparency Note
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI provides <strong>suggestions only</strong>. All decisions remain with you. 
                  The system learns from historical patterns but understands that real-world factors 
                  (special events, weather changes) may require human judgment. You can always 
                  override AI recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our network of partners fighting food waste and hunger.
            </p>
            <Link to="/login">
              <Button variant="hero" size="lg">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;

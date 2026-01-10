import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SDGBadge } from "@/components/SDGBadge";
import { ImpactCounter } from "@/components/ImpactCounter";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Brain, 
  Bell, 
  BarChart3, 
  Users, 
  Truck, 
  ArrowRight,
  Sparkles,
  Globe,
  Heart,
  ChefHat,
  Building2,
  ClipboardList,
  Zap,
  HandHeart
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            {/* SDG Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <SDGBadge number={2} title="Zero Hunger" />
              <SDGBadge number={12} title="Responsible Consumption" />
              <SDGBadge number={13} title="Climate Action" />
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              JARVIS – NutriGuard AI
              <br />
              <span className="gradient-text">Turning Excess Food into Hope</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-powered platform that predicts food demand, reduces waste, and connects excess food to NGOs in real time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/login?type=restaurant">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Get Started as Restaurant
                </Button>
              </Link>
              <Link to="/login?type=ngo">
                <Button variant="success" size="xl" className="w-full sm:w-auto">
                  <Building2 className="mr-2 h-5 w-5" />
                  Join as NGO
                </Button>
              </Link>
            </div>

            {/* Powered by Google */}
            <div className="pt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span>Google Gemini AI</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border">
                <Globe className="h-4 w-4 text-primary" />
                <span>Cloud Backend</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Steps */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Simple Process</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to reduce food waste and feed communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                icon: <ClipboardList className="h-8 w-8" />,
                title: "Data Entry",
                description: "Restaurants enter expected guests & event type"
              },
              {
                step: "2",
                icon: <Brain className="h-8 w-8" />,
                title: "AI Prediction",
                description: "Gemini AI suggests optimal food quantity"
              },
              {
                step: "3",
                icon: <Zap className="h-8 w-8" />,
                title: "Excess Food Alert",
                description: "One-click excess food reporting"
              },
              {
                step: "4",
                icon: <HandHeart className="h-8 w-8" />,
                title: "NGO Pickup & Impact",
                description: "NGOs get alerts → food reaches needy"
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="relative p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-all group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow">
                  {item.step}
                </div>
                <div className="pt-4 text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/how-it-works">
              <Button variant="outline" size="lg">
                Learn More Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">Live Impact Dashboard</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Real Impact, Real Change
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every meal saved is a step towards a sustainable, hunger-free world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImpactCounter
              value={120}
              suffix=" kg"
              label="🍽️ Food Saved"
              icon={<Leaf className="h-6 w-6 text-impact-green" />}
              color="green"
              delay={0}
            />
            <ImpactCounter
              value={300}
              suffix="+"
              label="👨‍👩‍👧 People Fed"
              icon={<Heart className="h-6 w-6 text-impact-blue" />}
              color="blue"
              delay={200}
            />
            <ImpactCounter
              value={85}
              suffix=" kg"
              label="🌱 CO₂ Reduced"
              icon={<Globe className="h-6 w-6 text-impact-amber" />}
              color="amber"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">The Problem</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Food Waste Crisis Meets Hunger Emergency
              </h2>
              <ul className="space-y-4">
                {[
                  "Restaurants and hostels overcook 30-40% more food than needed",
                  "NGOs lack real-time information about available surplus food",
                  "Millions go hungry while edible food ends up in landfills",
                  "Food waste contributes 8-10% of global greenhouse emissions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-destructive/10">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Solution</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                AI-Powered Prediction & Real-Time Coordination
              </h2>
              <ul className="space-y-4">
                {[
                  "Smart demand prediction reduces overcooking by up to 60%",
                  "Instant alerts connect surplus food with nearby NGOs",
                  "Real-time pickup coordination ensures food freshness",
                  "Impact tracking provides sustainability certificates"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-success/10">
                      <div className="w-2 h-2 rounded-full bg-success" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Impact Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">UN Sustainable Development Goals</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Creating Measurable Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              NutriGuard AI creates measurable impact across multiple UN Sustainable Development Goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#DDA63A]/10 to-[#DDA63A]/5 border border-[#DDA63A]/20 text-center group hover:shadow-medium transition-all">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#DDA63A] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-display font-bold text-xl mb-2">🟢 SDG 2 – Zero Hunger</h3>
              <p className="text-muted-foreground">End hunger and ensure access to nutritious food for all through smart redistribution.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#BF8B2E]/10 to-[#BF8B2E]/5 border border-[#BF8B2E]/20 text-center group hover:shadow-medium transition-all">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#BF8B2E] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                12
              </div>
              <h3 className="font-display font-bold text-xl mb-2">🔵 SDG 12 – Responsible Consumption</h3>
              <p className="text-muted-foreground">Reduce food waste through AI-powered demand prediction and optimization.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#3F7E44]/10 to-[#3F7E44]/5 border border-[#3F7E44]/20 text-center group hover:shadow-medium transition-all">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#3F7E44] flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform">
                13
              </div>
              <h3 className="font-display font-bold text-xl mb-2">🌍 SDG 13 – Climate Action</h3>
              <p className="text-muted-foreground">Lower carbon footprint by preventing food from reaching landfills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete platform for sustainable food management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-primary" />}
              title="AI Demand Prediction"
              description="Google Gemini AI analyzes historical data, events, and patterns to suggest optimal cooking quantities."
              delay={0}
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6 text-primary" />}
              title="Real-Time NGO Alerts"
              description="Instant notifications to nearby NGOs when surplus food is available for pickup."
              delay={100}
            />
            <FeatureCard
              icon={<Truck className="h-6 w-6 text-primary" />}
              title="Pickup Coordination"
              description="Streamlined logistics with route optimization for efficient food collection."
              delay={200}
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              title="Impact Dashboard"
              description="Track food saved, people fed, and carbon footprint reduced in real-time."
              delay={300}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Multi-User Platform"
              description="Separate dashboards for restaurants, hostels, NGOs, and administrators."
              delay={400}
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Sustainability Certificates"
              description="Earn recognized certificates and enhance brand value through verified impact."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-accent overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative text-center text-primary-foreground space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Join the Fight Against Food Waste
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Whether you're a restaurant, hostel, event organizer, or NGO — together we can 
                create a world where no food goes to waste and no one goes hungry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/login">
                  <Button variant="glass" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                    Register as Partner
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="glass" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                    Join as NGO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

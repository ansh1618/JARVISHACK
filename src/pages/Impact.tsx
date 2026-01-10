import { Header } from "../components/Header";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Footer } from "@/components/Footer";
import { ImpactCounter } from "@/components/ImpactCounter";
import { SDGBadge } from "@/components/SDGBadge";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  Heart, 
  Globe, 
  Building2, 
  Users, 
  Truck,
  Award,
  ArrowRight,
  TreeDeciduous
} from "lucide-react";

const Impact = () => {
  // ✅ Hooks ALWAYS inside component
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const q = query(
        collection(db, "donations"),
        where("status", "==", "completed")
      );

      const snap = await getDocs(q);
      setDonations(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Measurable Change
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Our Collective Impact
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every partner, every meal saved, every person fed — together we're creating 
              a sustainable future aligned with the UN Sustainable Development Goals.
            </p>
          </div>

          {/* SDG Section */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {/* SDG 2 */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <SDGBadge number={2} title="Zero Hunger" className="mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">Ending Hunger</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  By redirecting surplus food to those in need, we directly contribute to 
                  ending hunger and ensuring access to nutritious food for all.
                </p>
                <div className="flex items-center gap-2 text-impact-green font-medium">
                  <Heart className="h-4 w-4" />
                  <span>45,000+ people fed monthly</span>
                </div>
              </div>

              {/* SDG 12 */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <SDGBadge number={12} title="Responsible Consumption" className="mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">Sustainable Practices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI-powered demand prediction helps partners reduce overproduction and 
                  promotes responsible consumption patterns.
                </p>
                <div className="flex items-center gap-2 text-impact-blue font-medium">
                  <Leaf className="h-4 w-4" />
                  <span>125,000 kg food saved</span>
                </div>
              </div>

              {/* SDG 13 */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <SDGBadge number={13} title="Climate Action" className="mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">Reducing Emissions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Food waste contributes to 8-10% of global emissions. By preventing waste, 
                  we're taking meaningful climate action.
                </p>
                <div className="flex items-center gap-2 text-impact-amber font-medium">
                  <Globe className="h-4 w-4" />
                  <span>87% carbon reduction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-center mb-8">
              Impact by the Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ImpactCounter
                value={125000}
                suffix="kg"
                label="Total Food Saved"
                icon={<Leaf className="h-6 w-6 text-impact-green" />}
                color="green"
                delay={0}
              />
              <ImpactCounter
                value={45000}
                label="People Fed Monthly"
                icon={<Heart className="h-6 w-6 text-impact-blue" />}
                color="blue"
                delay={100}
              />
              <ImpactCounter
                value={320}
                label="Partner Organizations"
                icon={<Building2 className="h-6 w-6 text-impact-amber" />}
                color="amber"
                delay={200}
              />
              <ImpactCounter
                value={85}
                label="NGO Partners"
                icon={<Users className="h-6 w-6 text-impact-green" />}
                color="green"
                delay={300}
              />
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="mb-16 p-8 rounded-3xl bg-card border border-border shadow-soft">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold mb-2">Environmental Impact</h2>
              <p className="text-muted-foreground">The ripple effect of saving food</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-impact-green/10 flex items-center justify-center">
                  <TreeDeciduous className="h-8 w-8 text-impact-green" />
                </div>
                <p className="text-3xl font-display font-bold text-impact-green">2,500</p>
                <p className="text-sm text-muted-foreground mt-1">Trees equivalent saved</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-impact-blue/10 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-impact-blue" />
                </div>
                <p className="text-3xl font-display font-bold text-impact-blue">450 tons</p>
                <p className="text-sm text-muted-foreground mt-1">CO₂ emissions prevented</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-impact-amber/10 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-impact-amber" />
                </div>
                <p className="text-3xl font-display font-bold text-impact-amber">1,200</p>
                <p className="text-sm text-muted-foreground mt-1">Successful pickups</p>
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="mb-16 p-8 rounded-3xl bg-gradient-accent text-primary-foreground">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="p-4 rounded-2xl bg-primary-foreground/10">
                <Award className="h-16 w-16" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="font-display text-2xl font-bold mb-2">
                  Sustainability Certificates
                </h2>
                <p className="opacity-90 max-w-xl">
                  Partners receive verified impact certificates showcasing their contribution 
                  to SDG goals. Perfect for CSR reports, marketing, and brand reputation.
                </p>
              </div>
              <Link to="/login">
                <Button variant="glass" size="lg" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                  Join & Earn
                </Button>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              Be Part of the Impact
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Every organization that joins amplifies our collective impact. 
              Start making a difference today.
            </p>
            <Link to="/login">
              <Button variant="hero" size="lg">
                Get Started
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

export default Impact;

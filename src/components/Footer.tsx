import { Link } from "react-router-dom";
import { Leaf, Github, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">JARVIS</span>
                <span className="text-xs block text-muted-foreground -mt-1">NutriGuard AI</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered platform reducing food waste and fighting hunger through smart predictions and real-time coordination.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Impact Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Partner Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">SDG Goals</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SDG 2: Zero Hunger</li>
              <li>SDG 12: Responsible Consumption</li>
              <li>SDG 13: Climate Action</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Powered By</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Google Gemini AI</li>
              <li>Firebase</li>
              <li>Google Maps API</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriGuard AI. Built for a sustainable future.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

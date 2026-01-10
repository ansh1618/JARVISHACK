import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Leaf, 
  Building2, 
  Home, 
  Heart,
  ArrowRight,
  Mail,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type UserType = "restaurant" | "hostel" | "ngo" | null;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<UserType>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const userTypes = [
    { id: "restaurant", label: "Restaurant / Caterer", icon: Building2, description: "Food service business" },
    { id: "hostel", label: "Hostel / Institution", icon: Home, description: "Educational or residential" },
    { id: "ngo", label: "NGO / Charity", icon: Heart, description: "Non-profit organization" },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      toast({
        title: "Please select your organization type",
        variant: "destructive"
      });
      return;
    }

    // Demo login - would connect to Firebase in production
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: `Redirecting to your ${userType} dashboard...`,
    });

    // Redirect based on user type
    setTimeout(() => {
      if (userType === "ngo") {
        window.location.href = "/ngo-dashboard";
      } else {
        window.location.href = "/restaurant-dashboard";
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-medium animate-scale-in">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
                <Leaf className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>

            {/* Toggle */}
            <div className="flex rounded-lg bg-muted p-1 mb-8">
              <button
                className={cn(
                  "flex-1 py-2 rounded-md text-sm font-medium transition-all",
                  isLogin ? "bg-card shadow-soft" : "text-muted-foreground"
                )}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={cn(
                  "flex-1 py-2 rounded-md text-sm font-medium transition-all",
                  !isLogin ? "bg-card shadow-soft" : "text-muted-foreground"
                )}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">I am a...</Label>
              <div className="grid grid-cols-3 gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-center",
                      userType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setUserType(type.id)}
                  >
                    <type.icon className={cn(
                      "h-6 w-6 mx-auto mb-2",
                      userType === type.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="text-xs font-medium block">{type.label.split(" / ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" variant="hero" className="w-full" size="lg">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Powered by</span>
              </div>
            </div>

            {/* Google Badge */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Firebase Authentication • Google Cloud</p>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing up, you agree to help reduce food waste and fight hunger.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;

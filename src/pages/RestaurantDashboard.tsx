import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImpactCounter } from "@/components/ImpactCounter";
import { useToast } from "@/hooks/use-toast";
import { getFoodPrediction } from "@/lib/gemini";
import  MapView  from "@/components/MapView";
import { savePickupRequest } from "@/lib/firestore";
//  import { db } from "@/lib/firebase";
import { db } from "../lib/firebase";






import { 
  Leaf, 
  Brain, 
  Bell,
  BarChart3,
  LogOut,
  ChefHat,
  Users,
  Clock,
  Send,
  Sparkles,
  CheckCircle,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const RestaurantDashboard = () => {
  const [mealType, setMealType] = useState("lunch");

 const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
 const [aiLoading, setAiLoading] = useState(false);

  const [manualOverride, setManualOverride] = useState("");
  const [excessFood, setExcessFood] = useState("");
  const [foodType, setFoodType] = useState("");
  const { toast } = useToast();

  const mealTypes = [
    { id: "breakfast", label: "Breakfast", time: "6AM - 10AM" },
    { id: "lunch", label: "Lunch", time: "12PM - 3PM" },
    { id: "dinner", label: "Dinner", time: "7PM - 10PM" },
  ];



 const handleGetPrediction = async () => {
  try {
    setAiLoading(true);
    setAiSuggestion(null);

    const response = await getFoodPrediction({
      people: mealType === "breakfast" ? 120 : mealType === "lunch" ? 280 : 200,
      eventType: mealType,
      pastWastage: "medium",
    });

    setAiSuggestion(response);
    
    toast({
      title: "AI Prediction Ready",
      description: "Generated using Gemini AI",
    });
  } catch (error) {
    toast({
      title: "AI Error",
      description: "Failed to get prediction",
      variant: "destructive",
    });
  } finally {
    setAiLoading(false);
  }
};

   

  const handleReportExcess = async () => {
  if (!excessFood || !foodType) {
    toast({
      title: "Please fill all fields",
      variant: "destructive",
    });
    return;
  }

  try {
    await savePickupRequest({
     restaurantName: "Green Kitchen Restaurant",
     foodType,
     quantity: Number(excessFood),
     freshness: "4 hours",
     lat: 28.6139,
     lng: 77.2090,
    });


    toast({
      title: "Pickup Created ✅",
      description: "Nearby NGOs can now see your food",
    });

    setExcessFood("");
    setFoodType("");
  } catch (err) {
    toast({
      title: "Error saving pickup",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Bar */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold">JARVIS</span>
              <span className="text-xs block text-muted-foreground -mt-1">NutriGuard AI</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              Green Kitchen Restaurant
            </span>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Welcome back, Partner!
          </h1>
          <p className="text-muted-foreground">
            Here's your sustainability dashboard for today.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ImpactCounter
            value={1250}
            suffix="kg"
            label="Your Food Saved"
            icon={<Leaf className="h-6 w-6 text-impact-green" />}
            color="green"
            delay={0}
          />
          <ImpactCounter
            value={450}
            label="People Fed Through You"
            icon={<Users className="h-6 w-6 text-impact-blue" />}
            color="blue"
            delay={100}
          />
          <ImpactCounter
            value={92}
            suffix="%"
            label="Prediction Accuracy"
            icon={<TrendingUp className="h-6 w-6 text-impact-amber" />}
            color="amber"
            delay={200}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Demand Prediction */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-secondary/10">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">AI Demand Prediction</h2>
                <p className="text-sm text-muted-foreground">Get smart cooking suggestions</p>
              </div>
            </div>

            {/* Meal Type Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Select Meal</Label>
              <div className="grid grid-cols-3 gap-3">
                {mealTypes.map((meal) => (
                  <button
                    key={meal.id}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all text-left",
                      mealType === meal.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => {
                      setMealType(meal.id);
                      setAiSuggestion(null);
                    }}
                  >
                    <span className="font-medium block">{meal.label}</span>
                    <span className="text-xs text-muted-foreground">{meal.time}</span>
                  </button>
                ))}
              </div>
            </div>

           <Button
  variant="hero"
  className="w-full mb-6"
  onClick={handleGetPrediction}
  disabled={aiLoading}
>
  <Sparkles className="mr-2 h-4 w-4" />
  {aiLoading ? "Analyzing with AI..." : "Get AI Prediction"}
</Button>



            {/* AI Result */}
            {aiSuggestion && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-scale-in">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ChefHat className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1">AI Suggestion</p>


                    {/* <p className="text-2xl font-display font-bold text-primary">
                      {aiSuggestion} servings
                    </p> */}
                    <p className="text-sm whitespace-pre-wrap text-foreground">
                      {aiSuggestion}
                    </p>




                    <p className="text-sm text-muted-foreground mt-2">
                      Based on historical data, today's weather, and local events.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-primary/10">
                  <Label className="text-sm font-medium mb-2 block">
                    Manual Override (optional)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Your decision"
                      value={manualOverride}
                      onChange={(e) => setManualOverride(e.target.value)}
                    />
                    <Button variant="outline">Confirm</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    You always have the final say
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Report Excess Food */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-success/10">
                <Bell className="h-6 w-6 text-success" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">Report Excess Food</h2>
                <p className="text-sm text-muted-foreground">Alert NGOs about surplus</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="foodType">Food Type</Label>
                <Input 
                  id="foodType"
                  placeholder="e.g., Rice, Dal, Vegetables"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input 
                  id="quantity"
                  type="number"
                  placeholder="Approximate weight"
                  value={excessFood}
                  onChange={(e) => setExcessFood(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="freshness">Freshness Window</Label>
                <div className="grid grid-cols-3 gap-2">
                  {["2 hours", "4 hours", "6 hours"].map((time) => (
                    <button
                      key={time}
                      className="p-2 rounded-lg border border-border hover:border-primary/50 text-sm transition-colors"
                    >
                      <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>


              <div className="mt-6">
                <MapView
                lat={28.6139}
                 lng={77.2090}
                 label="Green Kitchen Restaurant"
                  />
             </div>






              <Button
             variant="hero"
             className="w-full mb-6"
             onClick={handleGetPrediction}
             disabled={aiLoading}
>
             <Sparkles className="mr-2 h-4 w-4" />
             {aiLoading ? "Analyzing with AI..." : "Get AI Prediction"}
            </Button>

            </div>

            {/* Recent Reports */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Recent Successful Pickups
              </h3>
              <div className="space-y-2">
                {[
                  { food: "Mixed Rice & Curry", qty: "15kg", ngo: "Hope Foundation", time: "2h ago" },
                  { food: "Rotis & Sabzi", qty: "8kg", ngo: "Feed the Hungry", time: "Yesterday" },
                ].map((pickup, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{pickup.food}</span>
                      <span className="text-muted-foreground">{pickup.time}</span>
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {pickup.qty} • Picked up by {pickup.ngo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDashboard;

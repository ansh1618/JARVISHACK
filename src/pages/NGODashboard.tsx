import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// import { db } from "../lib/firebase";
import { calculateDistance } from "@/lib/utils";
import { saveDonation } from "@/lib/firestore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImpactCounter } from "@/components/ImpactCounter";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  Bell,
  MapPin,
  LogOut,
  Clock,
  CheckCircle,
  Phone,
  Navigation,
  Heart,
  Truck,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodListing {
  id: string;
  restaurant: string;
  address: string;
  foodType: string;
  quantity: string;
  freshness: string;
  distance: string;
  phone: string;
  urgent: boolean;
}





// const [ngoLocation, setNgoLocation] = useState<{
//   lat: number;
//   lng: number;
// } | null>(null);


// useEffect(() => {
//   navigator.geolocation.getCurrentPosition(
//     (pos) => {
//       setNgoLocation({
//         lat: pos.coords.latitude,
//         lng: pos.coords.longitude,
//       });
//     },
//     () => {
//       alert("Location permission required");
//     }
//   );
// }, []);


function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const R = 6371; // Earth radius
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1); // km
}





const NGODashboard = () => {
  const { toast } = useToast();

//   const [availableFood, setAvailableFood] = useState<FoodListing[]>([]);

  useEffect(() => {
  const fetchFood = async () => {
    try {
      const snapshot = await getDocs(collection(db, "food_pickups"));
      const foodData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FoodListing[];

    //   setAvailableFood(foodData);
    } catch (err) {
      toast({
        title: "Failed to load food listings",
        variant: "destructive",
      });
    }
  };

  fetchFood();
}, []);





// useEffect(() => {
//   const q = query(
//     collection(db, "pickups"),
//     where("status", "==", "available")
//   );

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const data = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setAvailableFood(data as FoodListing[]);
//   });

//   return () => unsubscribe();
// }, []);



  
  const [availableFood] = useState<FoodListing[]>([
    {
      id: "1",
      restaurant: "Green Kitchen Restaurant",
      address: "123 Main Street, Downtown",
      foodType: "Rice, Dal, Mixed Vegetables",
      quantity: "25 kg",
      freshness: "4 hours",
      distance: "2.3 km",
      phone: "+91 98765 43210",
      urgent: true
    },
    {
      id: "2",
      restaurant: "College Hostel Mess",
      address: "University Campus, Block B",
      foodType: "Rotis, Paneer Curry, Salad",
      quantity: "15 kg",
      freshness: "3 hours",
      distance: "4.1 km",
      phone: "+91 87654 32109",
      urgent: false
    },
    {
      id: "3",
      restaurant: "Grand Banquet Hall",
      address: "Wedding Plaza, Ring Road",
      foodType: "Biryani, Sweets, Snacks",
      quantity: "50 kg",
      freshness: "6 hours",
      distance: "5.8 km",
      phone: "+91 76543 21098",
      urgent: true
    },
  ]);




  const [acceptedPickups, setAcceptedPickups] = useState<string[]>([]);

  const handleAcceptPickup = (listing: FoodListing) => {
    setAcceptedPickups([...acceptedPickups, listing.id]);
    toast({
      title: "Pickup Confirmed!",
      description: `You've confirmed pickup from ${listing.restaurant}`,
    });
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
              Hope Foundation NGO
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
            NGO Dashboard
          </h1>
          <p className="text-muted-foreground">
            Available food near you • Real-time updates
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ImpactCounter
            value={2850}
            label="People Fed This Month"
            icon={<Heart className="h-6 w-6 text-impact-green" />}
            color="green"
            delay={0}
          />
          <ImpactCounter
            value={156}
            label="Successful Pickups"
            icon={<Truck className="h-6 w-6 text-impact-blue" />}
            color="blue"
            delay={100}
          />
          <ImpactCounter
            value={1200}
            suffix="kg"
            label="Food Collected"
            icon={<Leaf className="h-6 w-6 text-impact-amber" />}
            color="amber"
            delay={200}
          />
        </div>

        {/* Available Food */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-warning/10">
                <Bell className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">Available Food Nearby</h2>
                <p className="text-sm text-muted-foreground">
                  {availableFood.length} listings available for pickup
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {availableFood.map((listing) => (
              <div 
                key={listing.id}
                className={cn(
                  "p-6 rounded-2xl bg-card border shadow-soft transition-all",
                  listing.urgent 
                    ? "border-warning/50 bg-warning/5" 
                    : "border-border",
                  acceptedPickups.includes(listing.id) && "opacity-60"
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      {listing.urgent && (
                        <span className="px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Urgent
                        </span>
                      )}
                      <h3 className="font-display font-semibold text-lg">
                        {listing.restaurant}
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{listing.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-secondary" />
                        <span className="font-medium text-secondary">{listing.distance} away</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-muted/50">
                      <p className="font-medium mb-1">{listing.foodType}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Leaf className="h-4 w-4" />
                          {listing.quantity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Fresh for {listing.freshness}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    {acceptedPickups.includes(listing.id) ? (
                      <div className="p-3 rounded-lg bg-success/10 text-success text-center">
                        <CheckCircle className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">Pickup Confirmed</span>
                      </div>
                    ) : (
                      <Button 
                        variant="hero" 
                        className="w-full"
                        onClick={() => handleAcceptPickup(listing)}
                      >
                        Accept Pickup
                      </Button>
                    )}
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accepted Pickups */}
        {acceptedPickups.length > 0 && (
          <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-success/10">
                <Truck className="h-6 w-6 text-success" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg">Your Scheduled Pickups</h2>
                <p className="text-sm text-muted-foreground">
                  {acceptedPickups.length} pickup(s) confirmed
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {availableFood
                .filter(listing => acceptedPickups.includes(listing.id))
                .map(listing => (
                  <div key={listing.id} className="p-4 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{listing.restaurant}</p>
                        <p className="text-sm text-muted-foreground">{listing.foodType} • {listing.quantity}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NGODashboard;

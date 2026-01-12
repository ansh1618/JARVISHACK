import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";


// Restaurant excess food report
export async function savePickupRequest(data: {
  restaurantName: string;
  foodType: string;
  quantity: number;
  freshnessWindow: string;
  timestamp: Date;
  lat: number;
  lng: number;
}) {
  return await addDoc(collection(db, "pickups"), {
    ...data,
    status: "available",
    createdAt: serverTimestamp(),
  });
}

// NGO accepts pickup
export async function acceptPickup(pickupId: string, ngoName: string) {
  const ref = doc(db, "pickups", pickupId);
  return await updateDoc(ref, {
    status: "accepted",
    acceptedBy: ngoName,
    acceptedAt: serverTimestamp(),
  });
}

//donations
export async function saveDonation(data: {
  restaurantName: string;
  ngoName: string;
  foodType: string;
  quantity: number;
  distance: number;
}) {
  return await addDoc(collection(db, "donations"), {
    ...data,
    status: "completed",
    createdAt: serverTimestamp(),
  });
}






import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } 
from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRFTy0Ohy6ZD9sGkTxtcOD-EriHggpkf8",
  authDomain: "jarvis-7f024.firebaseapp.com",
  projectId: "jarvis-7f024",
  storageBucket: "jarvis-7f024.firebasestorage.app",
  messagingSenderId: "447922144288",
  appId: "1:447922144288:web:89c9400f9062bf7cd12845",
  measurementId: "G-QWHVBXP04F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

async function addFoodReport() {
  await addDoc(collection(db, "food_reports"), {
    foodType: "Rice & Dal",
    quantity: "50 meals",
    pickupTime: "8 PM",
    status: "available",
    createdAt: new Date()
  });
}

async function getFoodReports() {
  const querySnapshot = await getDocs(collection(db, "food_reports"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

async function markPicked(reportId) {
  await updateDoc(doc(db, "food_reports", reportId), {
    status: "picked"
  });
}

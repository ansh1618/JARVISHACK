// import { createRoot } from "react-dom/client";
// // import App from "./App.tsx";
// import "./index.css";


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// // import "./index.css";
// import { LoadScript } from "@react-google-maps/api";

// createRoot(document.getElementById("root")!).render(<App />);


// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
//       <App />
//     </LoadScript>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function DonationMap({ donations }: any) {
  const [active, setActive] = useState<any>(null);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 28.6139, lng: 77.2090 }}
      zoom={11}
    >
      {donations.map((d: any) => (
        <Marker
          key={d.id}
          position={{ lat: d.lat, lng: d.lng }}
          onClick={() => setActive(d)}
        />
      ))}

      {active && (
        <InfoWindow
          position={{ lat: active.lat, lng: active.lng }}
          onCloseClick={() => setActive(null)}
        >
          <div className="text-sm">
            <p><b>Restaurant:</b> {active.restaurantName}</p>
            <p><b>Food:</b> {active.foodType}</p>
            <p><b>Qty:</b> {active.quantity} kg</p>
            <p><b>NGO:</b> {active.ngoName}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

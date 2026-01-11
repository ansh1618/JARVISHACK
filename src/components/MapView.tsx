import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// <script src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`} />


type MapProps = {
  lat: number;
  lng: number;
  label?: string;
};

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "16px",
};

export default function MapView({ lat, lng, label }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={14}
    >
      <Marker position={{ lat, lng }} label={label} />
    </GoogleMap>
  );
}

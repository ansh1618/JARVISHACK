import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

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

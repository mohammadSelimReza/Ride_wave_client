import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import Map from "../../../components/Map/Map";
const Location = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: 40.712776,  // Default location (New York)
    lng: -74.005974,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    // <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}>
    //   <GoogleMap
    //     mapContainerStyle={{ width: "100%", height: "400px" }}
    //     center={mapCenter}
    //     zoom={14}
    //   >
    //     <Marker position={mapCenter} />
    //   </GoogleMap>
    // </LoadScript>
    <div>
      <Map></Map>
    </div>
  );
};

export default Location;

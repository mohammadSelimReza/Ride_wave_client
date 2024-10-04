import { useState } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const useMap = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectPickUpLocation, setSelectPickUpLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords = [longitude, latitude];
          setCurrentLocation(userCoords);
          setSelectPickUpLocation(userCoords);
          reverseGeocode(userCoords);
        },
        (error) => {
          console.error("Error retrieving user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const reverseGeocode = (coords) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?` +
        new URLSearchParams({
          access_token: accessToken,
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.features?.length > 0) {
          setPickupAddress(data.features[0].place_name);
        }
      })
      .catch((err) => console.error(err));
  };


  // Destination input handler

  return {accessToken,currentLocation,selectPickUpLocation,pickupAddress,getUserLocation,setPickupAddress, setSelectPickUpLocation};
};

export default useMap;

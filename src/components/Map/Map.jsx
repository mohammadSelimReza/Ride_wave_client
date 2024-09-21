import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

// Add your Mapbox access token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Map = ({ pickUpCord, dropOffCord }) => {
  const mapContainer = useRef(null); // Ref for map container
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current, // Reference to the div where the map will load
      style: "mapbox://styles/mapbox/streets-v11", // Mapbox style
      center: pickUpCord || [90.4125, 23.8103], // Coordinates for the center of the map (Dhaka, Bangladesh)
      zoom: 13, // Zoom level
    });

    // Add markers based on passed coordinates
    if (pickUpCord) {
      addToMap(map, pickUpCord, "Pickup");
    }
    if (dropOffCord) {
      addToMap(map, dropOffCord, "Dropoff");
    }
    if(pickUpCord && dropOffCord){
        map.fitBounds([
            dropOffCord,
            pickUpCord,
        ],
    {
        padding:40,
        zoom:11,
    })
    }

    return () => map.remove(); // Clean up on unmount
  }, [pickUpCord, dropOffCord]);

  // Function to add markers to the map
  const addToMap = (map, coord, label) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(coord)
      .addTo(map);

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(label); // Optional popup
    marker.setPopup(popup); // Attach popup to the marker
  };

  return (
    <Wrapper>
      {/* Div to hold the map */}
      <div
        ref={mapContainer}
        className="w-full h-96" // Using Tailwind for height and width
      />
    </Wrapper>
  );
};

// Wrapper for Tailwind styling (extend if necessary)
const Wrapper = tw.div``;

export default Map;

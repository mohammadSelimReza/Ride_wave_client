import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Map from "../../../components/Map/Map";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const Ride = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectPickUpLocation, setSelectPickUpLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedCar, setSelectedCar] = useState("bike");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [distance, setDistance] = useState(null); // For showing the distance
  // Get user location
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
  // Reverse geocoding for pickup address
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

  // Get location suggestions for pickup
  const getPickupSuggestions = (input) => {
    const [lng, lat] = currentLocation || [90.4125, 23.8103];

    if (input.length > 0) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?` +
          new URLSearchParams({
            access_token: accessToken,
            proximity: `${lng},${lat}`,
            limit: 6,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.features?.length > 0) {
            setPickupSuggestions(data.features);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setPickupSuggestions([]);
    }
  };

  // Get location suggestions for destination
  const getDestinationSuggestions = (input) => {
    const [lng, lat] = currentLocation || [90.4125, 23.8103];

    if (input.length > 0) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?` +
          new URLSearchParams({
            access_token: accessToken,
            proximity: `${lng},${lat}`,
            limit: 6,
          })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.features?.length > 0) {
            setDestinationSuggestions(data.features);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setDestinationSuggestions([]);
    }
  };

  // Input handlers for pickup and destination locations
  // Pickup input handler
  const handlePickupChange = (event) => {
    const location = event.target.value;
    setPickupAddress(location);
    if (location) {
      getPickupSuggestions(location);
    } else {
      setSelectPickUpLocation(currentLocation);
    }
  };
  // Destination input handler
  const handleDestinationChange = (event) => {
    const location = event.target.value;
    setDestinationAddress(location);
    if (location) {
      getDestinationSuggestions(location);
    } else {
      setDestinationLocation(null);
    }
  };

  // Payment method handler
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  // Car selection handler
  const handleCarSelection = (e) => {
    setSelectedCar(e.target.value); // Update the selected car based on the clicked option
  };
  // Haversine Formula to calculate distance between two points
  const calculateDistance = (pickupCoords, destinationCoords) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const [lng1, lat1] = pickupCoords;
    const [lng2, lat2] = destinationCoords;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };
  // Fetch user location on the first load
  useEffect(() => {
    if (selectPickUpLocation && destinationLocation) {
      const calculatedDistance = calculateDistance(
        selectPickUpLocation,
        destinationLocation
      );
      setDistance(calculatedDistance.toFixed(2)); // Limit to 2 decimal places
    }
  }, [selectPickUpLocation, destinationLocation]);
  useEffect(() => {
    getUserLocation();
  }, []);
  const bikeFare = distance ? (distance * 13).toFixed(2) : 0;
  const cngFare = distance ? (distance * 18).toFixed(2) : 0;
  const carFare = distance ? (distance * 22).toFixed(2) : 0;
  return (
    <div>
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">About US</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Book A Ride</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex md:max-w-screen-lg mx-auto my-10 gap-4">
        <FormField>
          {/* From and Destination Inputs */}
          {/* Pickup Input */}
          <div className="mb-4">
            <label
              htmlFor="pickup"
              className="block text-gray-700 font-semibold mb-2"
            >
              From
            </label>
            <input
              id="pickup"
              type="text"
              placeholder="Enter Pickup Location"
              value={pickupAddress}
              onChange={handlePickupChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {pickupSuggestions.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
                {pickupSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setPickupAddress(suggestion.place_name);
                      setSelectPickUpLocation(suggestion.center);
                      setPickupSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination Input */}
          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-gray-700 font-semibold mb-2"
            >
              Where to?
            </label>
            <input
              id="destination"
              type="text"
              placeholder="Enter Destination Location"
              value={destinationAddress}
              onChange={handleDestinationChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {destinationSuggestions.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setDestinationAddress(suggestion.place_name);
                      setDestinationLocation(suggestion.center);
                      setDestinationSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <span className="block text-gray-700 font-semibold mb-2">
              Payment Method
            </span>
            <div className="flex justify-between">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={selectedPayment === "cash"}
                  onChange={handlePaymentChange}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="net_banking"
                  checked={selectedPayment === "net_banking"}
                  onChange={handlePaymentChange}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">Net Banking</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="debit_card"
                  checked={selectedPayment === "debit_card"}
                  onChange={handlePaymentChange}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">Debit Card</span>
              </label>
            </div>
            {selectedPayment === "net_banking" && (
              <div className="mt-4">
                <label
                  htmlFor="net-banking-account"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Net Banking Account Number
                </label>
                <input
                  id="net-banking-account"
                  type="text"
                  placeholder="Enter Account Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            )}
            {selectedPayment === "debit_card" && (
              <div className="mt-4">
                <label
                  htmlFor="debit-card-number"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Debit Card Number
                </label>
                <input
                  id="debit-card-number"
                  type="text"
                  placeholder="Enter Card Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            )}
          </div>
          {/* Selected Car */}
          <div>
            <span className="block text-gray-700 font-semibold mb-4">
              Select Vehicle
            </span>
            <div className="flex justify-between space-x-4">
              {/* Bike Selection */}
              <label className="inline-flex items-center flex-col bg-white shadow-md rounded-lg p-4 w-full text-center">
                <input
                  type="radio"
                  name="vehicle"
                  value="bike"
                  checked={selectedCar === "bike"} // Compare with state value
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500 mb-2"
                />
                <span className="font-medium text-gray-800">Bike( 1 person) </span>
                {selectedCar === "bike" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {bikeFare} Tk</p>
                  </div>
                ) : null}
              </label>

              {/* CNG Selection */}
              <label className="inline-flex items-center flex-col bg-white shadow-md rounded-lg p-4 w-full text-center">
                <input
                  type="radio"
                  name="vehicle"
                  value="cng"
                  checked={selectedCar === "cng"} // Compare with state value
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500 mb-2"
                />
                <span className="font-medium text-gray-800">CNG (2 person) </span>
                {selectedCar === "cng" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {cngFare} Tk</p>
                  </div>
                ) : null}
              </label>

              {/* Car Selection */}
              <label className="inline-flex items-center flex-col bg-white shadow-md rounded-lg p-4 w-full text-center">
                <input
                  type="radio"
                  name="vehicle"
                  value="car"
                  checked={selectedCar === "car"} // Compare with state value
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500 mb-2"
                />
                <span className="font-medium text-gray-800">Car (3person) </span>
                {selectedCar === "car" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {carFare} Tk</p>
                  </div>
                ) : null}
              </label>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center my-10">
            <button className="px-6 py-2 bg-black text-white font-semibold rounded-full hover:bg-gray-700 transition duration-200">
              Book Now
            </button>
          </div>
        </FormField>

        <Location>
          <Map
            pickUpCord={selectPickUpLocation}
            dropOffCord={destinationLocation}
          />
        </Location>
      </div>
    </div>
  );
};

const Location = tw.div`
w-1/2
`;

const FormField = tw.div`
px-4 w-1/2 bg-white shadow-md rounded-md
`;

export default Ride;

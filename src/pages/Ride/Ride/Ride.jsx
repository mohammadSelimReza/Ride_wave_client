import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Map from "../../../components/Map/Map";
import tw from "tailwind-styled-components";
import mapboxgl from "mapbox-gl";
import Swal from "sweetalert2";
import useAuth from "../../../context/useAuth";
import api from "../../../api";
import useMap from "../../../context/useMap";
import LiveSearchDriverComponent from "./LiveSearchDriverComponent";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const Ride = () => {
  const { user } = useAuth();

  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedCar, setSelectedCar] = useState("bike");
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(0);
  const navigate = useNavigate();
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState("");
  const [searchDriver, setSearchDriver] = useState(false);
  const {
    currentLocation,
    selectPickUpLocation,
    pickupAddress,
    getUserLocation,
    setPickupAddress,
    accessToken,
    setSelectPickUpLocation,
  } = useMap();

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
  const handlePickupChange = (event) => {
    const location = event.target.value;
    setPickupAddress(location);
    if (location) {
      getPickupSuggestions(location);
    } else {
      setSelectPickUpLocation(currentLocation);
    }
  };
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

  useEffect(() => {
    let calculatedFare = 0;
    if (distance) {
      if (selectedCar === "bike") {
        calculatedFare = distance * 13;
      } else if (selectedCar === "cng") {
        calculatedFare = distance * 18;
      } else if (selectedCar === "car") {
        calculatedFare = distance * 22;
      }
    }
    setFare(calculatedFare.toFixed(2)); // Set fare to 2 decimal places
  }, [distance, selectedCar]);

  const handleBookNow = async () => {
    if (pickupAddress && destinationAddress && selectedPayment && selectedCar) {
      Swal.fire({
        title: "Confirm Booking",
        text: `Are you sure you want to book a ride from ${pickupAddress} to ${destinationAddress}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, book it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const requestData = {
            start_location: pickupAddress,
            destination_location: destinationAddress,
            payment_method: selectedPayment,
            travel_vehicle: selectedCar,
            path_distance: distance,
            travel_fare: fare,
            driver_booked: false,
            rider: user?.id,
          };

          console.log(JSON.stringify(requestData));

          try {
            await api.post("/travel/request/list/", requestData);
            Swal.fire("Booked!", "Your ride has been booked.", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  setSearchDriver(true);
                  // Redirect to the searching for driver page
                  navigate("/searching-for-driver", {
                    state: {
                      currentLocation,
                    },
                  });
                }
              }
            );
          } catch (error) {
            console.error("Error booking ride:", error);
            Swal.fire(
              "Error",
              "Failed to book the ride. Please try again later.",
              "error"
            );
          }
        }
      });
    } else {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill out all required fields before booking.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
    console.log("mew");
  };

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
                <span className="font-medium text-gray-800">
                  Bike( 1 person){" "}
                </span>
                {selectedCar === "bike" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {fare} Tk</p>
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
                <span className="font-medium text-gray-800">
                  CNG (2 person){" "}
                </span>
                {selectedCar === "cng" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {fare} Tk</p>
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
                <span className="font-medium text-gray-800">
                  Car (3person){" "}
                </span>
                {selectedCar === "car" &&
                distance &&
                pickupAddress &&
                destinationLocation ? (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Distance: {distance} km</p>
                    <p>Fare: {fare} Tk</p>
                  </div>
                ) : null}
              </label>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center my-10">
            <button
              onClick={handleBookNow}
              className={`px-6 py-2 font-semibold rounded-full transition duration-200 ${
                pickupAddress &&
                destinationAddress &&
                selectedPayment &&
                selectedCar
                  ? "bg-black text-white hover:bg-gray-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={
                !pickupAddress ||
                !destinationAddress ||
                !selectedPayment ||
                !selectedCar
              }
            >
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
      {/* Conditionally render the driver search component */}
      {searchDriver && (
        <LiveSearchDriverComponent
          from={pickupAddress}
          to={destinationAddress}
          payment_method={selectedPayment}
          vehicle={selectedCar}
          fare={fare}
          distance={distance}
          setSearchDriver={setSearchDriver}
        />
      )}
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

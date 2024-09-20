import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Map from "../../../components/Map/Map";
import tw from "tailwind-styled-components";

const Ride = () => {
  const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectPickUpLocation, setSelectPickUpLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [selectedCar, setSelectedCar] = useState(null);
   // Function to get the user's current location using the Geolocation API
   const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords = [longitude, latitude];
          setCurrentLocation(userCoords);
          setSelectPickUpLocation(userCoords); // Set as the default pick-up location
        },
        (error) => {
          console.error("Error retrieving user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to fetch coordinates from the Mapbox API
  const getCoordinates = (location, setLocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
        new URLSearchParams({
          access_token: accessToken,
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.features?.length > 0) {
          setLocation(data.features[0].center); // Setting the coordinates
        }
      })
      .catch((err) => console.error(err));
  };

  // Input handlers for pickup and destination locations
  const handleInLocation = (event) => {
    const location = event.target.value;
    if(location){
      getCoordinates(location, setSelectPickUpLocation); // Fetch and set pickup coordinates
    }
    else{
      setSelectPickUpLocation(currentLocation);
    }
  };

  const handleDesLocation = (event) => {
    const location = event.target.value;
    getCoordinates(location, setDestinationLocation); // Fetch and set destination coordinates
  };

  // Payment method handler
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  // Car selection handler
  const handleCarSelection = (car) => {
    setSelectedCar(car.target.value);
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
              onChange={handleInLocation}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

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
              onChange={handleDesLocation}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
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
          </div>
          {/* Selected Car */}
          <div className="mb-4">
            <span className="block text-gray-700 font-semibold mb-2">
              Selected Car
            </span>
            <div className="flex justify-between">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="bike"
                  checked={selectedPayment === "bike"}
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">Bike(1person)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="cng"
                  checked={selectedPayment === "cng"}
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">CNG(2person)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="car"
                  checked={selectedPayment === "car"}
                  onChange={handleCarSelection}
                  className="form-radio text-yellow-500"
                />
                <span className="ml-2">Car(3person)</span>
              </label>
            </div>
          </div>
          {/* Book Now Button */}
          <div className="flex justify-center">
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

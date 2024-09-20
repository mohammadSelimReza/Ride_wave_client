import { NavLink } from "react-router-dom";


const Ride = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">Let&apos;s Ride</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Ride With RideWave</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="ride-content flex flex-col md:flex-row max-w-screen-lg mx-auto">
          {/* Ride Form */}
          <div className="ride-form w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg mb-6 md:mb-0">
            
            <form>
              {/* Pickup Input */}
              <div className="form-group mb-6">
                <label
                  htmlFor="pickup"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  From
                </label>
                <input
                  type="text"
                  id="pickup"
                  // value={pickupLocation}
                  // onChange={(e) => handleLocationChange(e, "pickup")}
                  placeholder="Select Pickup"
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Destination Input */}
              <div className="form-group mb-6">
                <label
                  htmlFor="destination"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Where to?
                </label>
                <input
                  type="text"
                  id="destination"
                  // value={destinationLocation}
                  // onChange={(e) => handleLocationChange(e, "destination")}
                  placeholder="Select Destination"
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {/* Payment Method */}
              <div className="form-group mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Payment Method
                </label>
                <div className="flex flex-wrap items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="Cash"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Cash</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="Net Banking"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Net Banking</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="Debit Card"
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Car Selection */}
              <div className="form-group mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Selected Car
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <label className="inline-flex flex-col items-center">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="scooter"
                        value="Scooter"
                        // onChange={() => setSelected?Car("Scooter")}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="material-symbols-outlined text-blue-600 md:text-4xl">
                        two_wheeler
                      </span>
                    </div>
                    <span>
                      1x <br /> Scooter
                    </span>
                  </label>
                  <label className="inline-flex flex-col items-center">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="cng"
                        value="mini_car"
                        // onChange={() => setSelectedCar("Scooter")}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="material-symbols-outlined md:text-4xl text-yellow-300">
                        directions_car
                      </span>
                    </div>
                    <span>
                      2x <br /> Alto
                    </span>
                  </label>
                  <label className="inline-flex flex-col items-center">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="car"
                        value="private_car"
                        // onChange={() => setSelectedCar("Scooter")}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="material-symbols-outlined md:text-4xl text-green-300">
                        directions_car
                      </span>
                    </div>
                    <span>
                      3x <br /> Swift Dzire
                    </span>
                  </label>
                  <label className="inline-flex flex-col items-center">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="jeep"
                        value="family_car"
                        // onChange={() => setSelectedCar("Scooter")}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="material-symbols-outlined md:text-4xl text-orange-300">
                        directions_car
                      </span>
                    </div>
                    <span>
                      4x <br /> Luxury
                    </span>
                  </label>
                  <label className="inline-flex flex-col items-center">
                    <div className="flex gap-4">
                      <input
                        type="radio"
                        name="micro"
                        value="tour_car"
                        // onChange={() => setSelectedCar("Scooter")}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="material-symbols-outlined md:text-4xl text-yellow-300">
                        directions_car
                      </span>
                    </div>
                    <span>
                      5x <br /> Tourist
                    </span>
                  </label>
                </div>
              </div>

              {/* Book Now Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                // disabled={!pickupCoordinates || !destinationCoordinates}
              >
                BOOK NOW
              </button>
            </form>
          </div>

          {/* Ride Map */}
          <div className="ride-map w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
            <h2>Map</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;

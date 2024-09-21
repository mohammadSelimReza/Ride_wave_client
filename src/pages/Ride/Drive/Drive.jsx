import React, { useState } from 'react';

const Ride = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequests, setRideRequests] = useState([
    { id: 1, passengerName: 'John Doe', pickup: '123 Main St, Dhaka', dropoff: '456 Park Ave, Dhaka', distance: '12km', fare: '300 Tk' },
    { id: 2, passengerName: 'Jane Smith', pickup: '789 Oak St, Dhaka', dropoff: '101 Pine Ave, Dhaka', distance: '15km', fare: '350 Tk' },
  ]);
  const [currentRide, setCurrentRide] = useState(null);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const acceptRide = (ride) => {
    setCurrentRide(ride);
    // Remove the accepted ride from the requests list
    setRideRequests(rideRequests.filter(request => request.id !== ride.id));
  };

  const endRide = () => {
    setCurrentRide(null);
  };

  return (
    <div className="md:max-w-screen-lg mx-auto p-4">
      {/* Driver Info */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Hi, Selim Reza</h1>
        <p className="text-gray-600">Vehicle: Toyota Prius (ABC-1234)</p>
        <p className="text-gray-600 mb-4">Status: {isOnline ? 'Online' : 'Offline'}</p>
        <button
          onClick={toggleOnlineStatus}
          className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
            isOnline ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-green-500 text-white hover:bg-green-700'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* Available Ride Requests */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Ride Requests</h2>
        {currentRide ? (
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Pickup:</strong> {currentRide.pickup}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Dropoff:</strong> {currentRide.dropoff}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Distance:</strong> {currentRide.distance}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Fare:</strong> {currentRide.fare}
            </p>
            <button
              onClick={endRide}
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-200"
            >
              End Ride
            </button>
          </div>
        ) : (
          <div>
            {rideRequests.length > 0 ? (
              rideRequests.map((ride) => (
                <div key={ride.id} className="mb-4">
                  <p className="text-gray-600">
                    <strong>Passenger:</strong> {ride.passengerName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p className="text-gray-600">
                    <strong>Dropoff:</strong> {ride.dropoff}
                  </p>
                  <p className="text-gray-600">
                    <strong>Distance:</strong> {ride.distance}
                  </p>
                  <p className="text-gray-600">
                    <strong>Fare:</strong> {ride.fare}
                  </p>
                  <button
                    onClick={() => acceptRide(ride)}
                    className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-700 transition duration-200"
                  >
                    Accept Ride
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No ride requests at the moment.</p>
            )}
          </div>
        )}
      </div>

      {/* Earnings Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Earnings</h2>
        <p className="text-gray-600 mb-2">
          <strong>Today's Earnings:</strong> 1200 Tk
        </p>
        <p className="text-gray-600 mb-2">
          <strong>This Week:</strong> 8500 Tk
        </p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-700 transition duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Ride;

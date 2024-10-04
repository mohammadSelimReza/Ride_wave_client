import { useEffect, useState } from "react";
import api from "../../../api";
import useAuth from "../../../context/useAuth";

const Ride = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequests, setRideRequests] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  console.log(user?.id);
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  // Fetch available ride requests
  useEffect(() => {
    const fetchReqData = async () => {
      try {
        const res = await api.get("/travel/request/list/");
        // Filter rides where driver_booked is false
        const availableRides = res.data.filter(
          (ride) => ride.driver_booked === false
        );
        console.log(availableRides);
        setRideRequests(availableRides);
      } catch (error) {
        console.error("Error fetching travel requests", error);
      }
    };
    fetchReqData();
    const interval = setInterval(() => {
      fetchReqData();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); 
  }, []);

  // Handle accepting a ride
  const acceptRide = async (ride) => {
    setCurrentRide(ride);

    // Remove the accepted ride from the requests list
    setRideRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== ride.id)
    );

    // Prepare ride data
    const rideData = {
      start_location: ride.start_location,
      destination_location: ride.destination_location,
      end_date: null,
      end_time: null,
      distance: ride.path_distance,
      price: ride.travel_fare,
      payment_method: ride.payment_method,
      payment_status: false,
      travel_running: true,
      rider: ride.rider,
      driver: user?.id,
      request_no: ride.request_no,
    };
    const updateStatus = {
      driver_booked: true,
    };
    console.log(JSON.stringify(rideData));
    // Post ride data to start the ride
    try {
      const res = await api.post("/travel/request/detail/", rideData);
      console.log(ride.id);
      console.log(JSON.stringify(updateStatus));
      await api.patch(`/travel/request/list/${ride.request_no}/`, updateStatus);
      console.log("Ride started:", res.data);
    } catch (error) {
      console.error("Error starting the ride", error);
    }
    
    // Delete accepted ride request from list
    // try {
    //   await api.delete(`/travel/request/list/${ride.id}`);
    // } catch (error) {
    //   console.error("Error deleting the ride request", error);
    // }
  };
  
  useEffect(() => {
    const findRide = async () => {
      console.log("Fetching the current ride for the driver...");
      try {
        const res = await api.get("/travel/request/detail/");
        console.log("Ride data:", res.data);
        console.log("Driver ID:", user?.id);
  
        // Filter to find the current active ride where travel_running is true
        const activeRide = res.data.find(ride => ride?.driver === user?.id && ride?.travel_running === true);
        
        if (activeRide) {
          console.log("Active ride found:", activeRide);
          setCurrentRide(activeRide);
        } else {
          console.log("No active ride found.");
        }
      } catch (error) {
        console.error("Error fetching driver's current ride:", error);
      }
    };
  
    if (user?.id) {
      findRide();
    }
  }, [user?.id]);
  

  // End the current ride
  const endRide = async (requestNo) => {
    if (!currentRide) return;
  
    // Get the current date and time
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // yyyy-mm-dd format
    const formattedTime = now.toTimeString().split(" ")[0]; // hh:mm:ss format
  
    const updateStatus = {
      travel_running: false,
      end_date: formattedDate, // Current date in ISO format
      end_time: formattedTime, // Current time in hh:mm:ss format
    };
  
    try {
      // Update ride status on the server to mark it as ended
      await api.patch(`/travel/request/detail/${currentRide.request_no}/`, updateStatus);
  
      // Clear current ride data on the frontend
      setCurrentRide(null);
      console.log("Ride ended successfully.");
    } catch (error) {
      console.error("Error ending the ride", error);
    }
    try {
      const response = await api.post(`/travel/request/end_ride/${requestNo}/`);
      console.log(response.data);
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  };
  
  console.log(currentRide);

  return (
    <div className="md:max-w-screen-lg mx-auto p-4">
      {/* Driver Info */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Hi, Selim Reza
        </h1>
        <p className="text-gray-600">Vehicle: Toyota Prius (ABC-1234)</p>
        <p className="text-gray-600 mb-4">
          Status: {isOnline ? "Online" : "Offline"}
        </p>
        <button
          onClick={toggleOnlineStatus}
          className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
            isOnline
              ? "bg-red-500 text-white hover:bg-red-700"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
        >
          {isOnline ? "Go Offline" : "Go Online"}
        </button>
      </div>

      {/* Available Ride Requests */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Ride Requests
        </h2>
        {currentRide ? (
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Pickup:</strong> {currentRide.start_location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Dropoff:</strong> {currentRide.destination_location}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Distance:</strong> {currentRide.path_distance}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Fare:</strong> {currentRide.travel_fare}
            </p>
            <button
              onClick={()=> endRide(currentRide.request_no)}
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
                    <strong>Passenger:</strong> {ride.rider}
                  </p>
                  <p className="text-gray-600">
                    <strong>Pickup:</strong> {ride.start_location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Dropoff:</strong> {ride.destination_location}
                  </p>
                  <p className="text-gray-600">
                    <strong>Distance:</strong> {ride.path_distance}KM
                  </p>
                  <p className="text-gray-600">
                    <strong>Fare:</strong> {ride.travel_fare}TK
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

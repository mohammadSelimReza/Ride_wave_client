import { useEffect, useState } from "react";
import api from "../../../api";
import PuffLoader from "react-spinners/PuffLoader";
import useAuth from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

const RidingTime = () => {
  const { user } = useAuth();
  const [rideData, setRideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReq, setUserReq] = useState([]);
  const [reqData, setReqData] = useState([]);
  const [currentRide, setCurrentRide] = useState(0);
  const navigate = useNavigate();
  // Fetching all travel requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/travel/request/detail/");
        console.log(res.data);
        setReqData(res.data);
      } catch (error) {
        console.error("Error fetching travel requests", error);
      }
    };
    fetchData();
  }, []);

  // Filter the requests where the rider matches the current user
  useEffect(() => {
    const filteredRequests = reqData.filter(
      (data) => data?.rider === user?.id && data.travel_running === true
    );
    setUserReq(filteredRequests);
  }, [reqData, user?.id]);

  // Fetch ride data for the ongoing request (if any)
  useEffect(() => {
    const fetchRideData = async () => {
      if (userReq.length > 0) {
        // Ensure there's at least one ride
        try {
          const response = await api.get(
            `/travel/request/detail/${userReq[0].request_no}/`
          );
          setRideData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching ride data", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRideData();
  }, [userReq]);
  useEffect(() => {
    const getDriver = async () => {
      try {
        const response = await api.get("/travel/request/detail/");
        const findData = response.data.find(
          (data) => data.id === userReq?.id && data.travel_running === true
        );
        console.log(findData);
        setCurrentRide(findData.request_no);
      } catch (error) {
        console.error("Error fetching driver data", error);
      }
    };

    getDriver(); // Initial call to fetch data

    // Set up polling every 2 seconds
  }, [userReq?.id]);
  console.log(userReq?.[0]?.request_no); // For debugging purposes
  useEffect(() => {
    const finishingRide = async () => {
      try {
        // Make sure currentRide is valid
        if (currentRide) {
          const response = await api.get(
            `/travel/request/detail/${currentRide}/`
          );
          const requestData = response.data; // Accessing the data from the response
          console.log(requestData);

          // Check if the ride is no longer running
          if (requestData.travel_running === false) {
            navigate("/after_ride"); // Navigate to the 'after ride' page if the ride is finished
          } else {
            console.log("Ride is still running...");
          }
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };

    finishingRide(); // Initial call to check if the ride is finished

    // Set an interval to check periodically (every 2 seconds)
    const interval = setInterval(() => {
      finishingRide();
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentRide]);

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg max-w-md mx-auto mt-8">
      {loading ? (
        <div className="flex justify-center items-center">
          <PuffLoader size={50} color="#36d7b7" />
        </div>
      ) : rideData && rideData.travel_running ? (
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            Ride In Progress
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Start Location:</span>
              <span className="text-end">{rideData.start_location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Destination:</span>
              <span className="text-end">{rideData.destination_location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Start Time:</span>
              <span>{rideData.start_time.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Distance:</span>
              <span>{rideData.distance} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Price:</span>
              <span>{rideData.price} BDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment Method:</span>
              <span className="badge badge-info">
                {rideData.payment_method}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment Status:</span>
              <span className="badge badge-warning">
                {rideData.payment_status ? "Paid" : "Not Paid"}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="btn btn-success btn-wide text-white font-bold">
              Ongoing
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No ongoing ride found.</p>
      )}
    </div>
  );
};

export default RidingTime;

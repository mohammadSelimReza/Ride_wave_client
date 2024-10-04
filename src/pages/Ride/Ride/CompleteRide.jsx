import { useEffect, useState } from "react";
import api from "../../../api";
import useAuth from "../../../context/useAuth";
import PuffLoader from "react-spinners/PuffLoader";

const CompleteRide = () => {
  const { user } = useAuth();
  const [rideData, setRideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReq, setUserReq] = useState([]);
  const [reqData, setReqData] = useState([]);

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
      (data) => data?.rider === user?.id && data.travel_running === false
    );
    setUserReq(filteredRequests);
  }, [reqData, user?.id]);

  // Fetch ride data for the completed request (if any)
  useEffect(() => {
    const fetchRideData = async () => {
      if (userReq.length > 0) {
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

  console.log(userReq?.[0]?.request_no); // For debugging purposes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader size={50} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 shadow-lg rounded-lg max-w-md mx-auto mt-8">
      {rideData ? (
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            Ride Completed Successfully!
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Start Location:</span>
              <span>{rideData.start_location}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Destination:</span>
              <span>{rideData.destination_location}</span>
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
            <a href='/ride-with-ridewave'>
              <button className="btn btn-success btn-wide">
                Book Another Ride
              </button>
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No completed ride found.</p>
      )}
    </div>
  );
};

export default CompleteRide;

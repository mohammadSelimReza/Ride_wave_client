import { useEffect, useState } from "react";
import api from "../../../api";
import useAuth from "../../../context/useAuth";
import Map from "../../../components/Map/Map";
import useMap from "../../../context/useMap";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";

const LiveSearchDriverComponent = () => {
  const [reqData, setReqData] = useState([]);
  const [userReq, setUserReq] = useState([]);
  const { user } = useAuth();
  const { selectPickUpLocation, getUserLocation } = useMap(); // Assuming mapInstance is provided from useMap
  // const [loading, setLoading] = useState(true);
  //  const {driverFound,setDriverFound} = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/travel/request/list/");
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
      (data) => data?.rider === user?.id && data.driver_booked === false
    );
    setUserReq(filteredRequests);
  }, [reqData, user?.id]);

  useEffect(() => {
    const getDriver = async () => {
      try {
        const response = await api.get("/travel/request/detail/");
        const findData = response.data.find((data) => data.id === userReq?.id && data.travel_running === true);
        if (findData) {
          console.log("Driver found");
          navigate("/ride-status");
        } else {
          console.log("Driver not found");
        }
      } catch (error) {
        console.error("Error fetching driver data", error);
      }
    };

    getDriver(); // Initial call to fetch data

    // Set up polling every 2 seconds
    const interval = setInterval(() => {
      getDriver();
    }, 2000);

    // Clear interval when the component unmounts
    return () => clearInterval(interval);
  }, [userReq?.id]); // Add userReq.id as dependency

  useEffect(() => {
    getUserLocation(); // Fetch user's current location on load
  }, []);
  return (
    <div>
      <div>
        <h2>Your Travel Requests</h2>
        {userReq.length > 0 ? (
          <div>
            <ul>
              {userReq.map((request) => (
                <li key={request?.id}>
                  {request?.start_location} to {request?.destination_location} -
                  Vehicle: {request.travel_vehicle}
                </li>
              ))}
            </ul>
            <p className="flex justify-center items-center">
              Searching for driver: <PuffLoader />
            </p>
          </div>
        ) : (
          <p>No travel requests found for you.</p>
        )}
      </div>
      <div style={{ position: "relative" }}>
        <Map pickUpCord={selectPickUpLocation} />
      </div>
    </div>
  );
};

export default LiveSearchDriverComponent;

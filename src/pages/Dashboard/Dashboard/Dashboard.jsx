import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../context/useAuth";
import api from "../../../api";

const Dashboard = () => {
  const { driverData } = useAuth();
  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trip details from the API
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await api.get("/travel/request/detail/");
        const driverTrips = response.data.filter(
          (trip) => trip.driver === driverData?.user?.id
        );
        setTripData(driverTrips);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip details", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchTripData();
  }, [driverData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading trip details.</p>;
  }

  // Aggregate total earnings and rides
  const totalEarnings = tripData.reduce((sum, trip) => sum + trip.price, 0);
  const totalRides = tripData.length;
  const totalDistance = tripData.reduce((sum, trip) => sum + trip.distance, 0);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-10 bg-orange-100 py-6">
        <h2 className="md:text-2xl font-bold max-w-screen-lg mx-auto">Dashboard</h2>
      </div>
      <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <img
            src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1725597284/k8f8ympr4sorkrxv6c1a.avif`}
            className="rounded-full w-16 h-16 object-cover"
            alt="User Profile"
          />
          <div>
            <h3 className="md:text-xl font-bold">
              {driverData?.user?.first_name} {driverData?.user?.last_name}
            </h3>
            <p className="md:text-base font-thin">ID: {driverData?.user?.id} </p>
            <p className="md:text-base font-thin space-x-2">
              <NavLink to="/user/profile/">Edit</NavLink>
              <NavLink to="/user/profile/">Profile</NavLink>
            </p>
          </div>
        </div>
        <p className="text-gray-600">Partnership with RideWave</p>
      </div>

      {/* Area Chart Section */}
      <div className="max-w-screen-lg mx-auto">
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={tripData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="start_date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overview Section */}
      <div className="max-w-screen-lg mx-auto my-6">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div className="flex justify-around items-center">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-value">{totalRides}</div>
              <div className="stat-desc">Total Rides</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-value">{totalDistance.toFixed(2)} km</div>
              <div className="stat-desc">Total Distance</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-value">${totalEarnings.toFixed(2)}</div>
              <div className="stat-desc">Total Earnings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Section */}
      <div className="max-w-screen-lg mx-auto">
        <h2 className="md:text-2xl font-bold mb-4">Trip Details</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Time</th>
                <th>Fare</th>
                <th>Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {/* Table Body */}
              {tripData.map((trip, index) => (
                <tr key={trip.request_no}>
                  <td>{index + 1}</td>
                  <td>{trip.start_location}</td>
                  <td>{trip.destination_location}</td>
                  <td>{trip.start_date}</td>
                  <td>
                    {new Date(`1970-01-01T${trip.start_time}`).toLocaleTimeString()} -{" "}
                    {new Date(`1970-01-01T${trip.end_time}`).toLocaleTimeString()}
                  </td>
                  <td>${trip.price.toFixed(2)}</td>
                  <td>{trip.distance.toFixed(2)} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

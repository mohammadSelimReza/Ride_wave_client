import { useEffect, useState } from "react";
import api from "../../../../../api";
import useAuth from "../../../../../context/useAuth";

const RiderHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch travel history data and travel details
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch travel history
        const historyResponse = await api.get("/travel/request/history/");
        const filteredHistory = historyResponse.data.filter(
          (history) => history.rider === user?.id
        );

        // Fetch travel details
        const detailsResponse = await api.get("/travel/request/detail/");
        const travelDetails = detailsResponse.data;

        // Combine history with travel details
        const combinedData = filteredHistory.map((history) => {
          const matchingDetails = travelDetails.find(
            (details) => details.request_no === history.travel_details
          );
          return { ...history, travel_details: matchingDetails };
        });

        setHistoryData(combinedData); // Save combined data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching rider history", error);
        setError(error);
        setLoading(false); // Stop loading if there's an error
      }
    };
    fetchHistory();
  }, [user?.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading rider history.</p>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Rider History</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Completed Date & Time</th>
            <th>From</th>
            <th>To</th>
            <th>Fare</th>
            <th>Time</th>
            <th>Driver ID</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((history, index) => (
            <tr key={history.id}>
              <th>{index + 1}</th>
              <td>{new Date(history.completed_date_time).toLocaleString()}</td>
              <td>{history.travel_details?.start_location}</td>
              <td>{history.travel_details?.destination_location}</td>
              <td>{history.travel_details?.price}</td>
              <td>
                {new Date(`1970-01-01T${history.travel_details?.start_time}Z`).toLocaleTimeString()} -{" "}
                {new Date(`1970-01-01T${history.travel_details?.end_time}Z`).toLocaleTimeString()}
              </td>
              <td>{history.driver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderHistory;

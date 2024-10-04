import { useState, useEffect } from "react";
import useAuth from "../../../../../context/useAuth";

const ProfileMain = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, driverData, riderData } = useAuth();

  useEffect(() => {
    // Determine if data is loaded
    if (user && (driverData || riderData)) {
      setLoading(false);
    }
  }, [user, driverData, riderData]);

  if (error) return <p className="text-red-500">{error}</p>;

  const userData = driverData || riderData;

  return (
    <div className="flex">
      <div className="mx-auto p-4 w-3/4">
        <h1 className="md:text-2xl font-bold text-center mb-10">My Profile (<span className="capitalize">{userData?.user_type}</span>) </h1>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Username:</label>
          <p>{user?.username}</p>
        </div>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Full Name:</label>
          <p>{user?.first_name} {user?.last_name}</p>
        </div>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Email:</label>
          <p>{user?.email}</p>
        </div>

        {/* Conditional Rendering for Driver or Rider Data */}
        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Birth Date:</label>
          <p>{userData?.birth_date || "N/A"}</p>
        </div>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Gender:</label>
          <p>{userData?.gender || "N/A"}</p>
        </div>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">NID:</label>
          <p>{userData?.nid || "N/A"}</p>
        </div>

        <div className="mb-4 md:flex">
          <label className="block mb-2 font-semibold md:w-40">Phone Number:</label>
          <p>{userData?.phone_number || "N/A"}</p>
        </div>

        {/* Driver-specific information */}
        {driverData && (
          <>
            <div className="mb-4 md:flex">
              <label className="block mb-2 font-semibold md:w-40">Driving License No:</label>
              <p>{driverData?.driving_license_no || "N/A"}</p>
            </div>
          </>
        )}
      </div>

      {/* Profile Photo */}
      <div className="w-1/4">
        <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
        <img
          src={userData?.user_photo || "N/A"}
          className="rounded"
          alt={`${user?.first_name}'s profile`}
        />
      </div>
    </div>
  );
};

export default ProfileMain;

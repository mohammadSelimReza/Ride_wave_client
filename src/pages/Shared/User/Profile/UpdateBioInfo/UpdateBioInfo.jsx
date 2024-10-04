import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../../../context/useAuth";
import api from "../../../../../api";

const UpdateBioInfo = () => {
    const [formData, setFormData] = useState({
        birth_date: "",
        gender: "",
        nid: "",
        phone_number: "",
        driving_license_no: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { user, driverData, riderData } = useAuth(); // Get driverData or riderData based on the user's role
    const navigate = useNavigate();

    useEffect(() => {
        // Pre-fill the form with existing user data based on role (driver or rider)
        const data = driverData || riderData;
        if (data) {
            setFormData({
                birth_date: data.birth_date || "",
                gender: data.gender || "",
                nid: data.nid || "", // NID will only be available for drivers
                phone_number: data.phone_number || "",
                driving_license_no: data.driving_license_no || "", // Only available for drivers
            });
        }
    }, [driverData, riderData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Determine if the user is a driver or a rider and make the appropriate API call
            const endpoint = driverData 
                ? `/driver/register/${user.id}/` 
                : `/rider/register/${user.id}/`;

            const response = await api.patch(endpoint, formData);

            if (response.status === 200) {
                setSuccess(true);
                toast.success("Profile updated successfully.");
                navigate("/user/profile"); // Redirect to the profile page
            } else {
                setError("Failed to update your profile. Please try again.");
            }
        } catch (error) {
            setError("An error occurred while updating your profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-96 mx-auto p-4">
            <h1 className="md:text-2xl font-bold text-center mb-10">Update Your Profile</h1>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Birth Date:</span>
                <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className="grow"
                    required
                />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Gender:</span>
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="grow"
                    required
                />
            </label>

            {driverData && (
                <>
                    <label className="input input-bordered flex items-center gap-2">
                        <span className="text-sm w-32">NID:</span>
                        <input
                            type="text"
                            name="nid"
                            value={formData.nid}
                            onChange={handleChange}
                            className="grow"
                            disabled // NID should not be editable
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <span className="text-sm w-32">Driving License No:</span>
                        <input
                            type="text"
                            name="driving_license_no"
                            value={formData.driving_license_no}
                            onChange={handleChange}
                            className="grow"
                            required
                        />
                    </label>
                </>
            )}

            <label className="input input-bordered flex items-center gap-2">
                <span className="text-sm w-32">Phone Number:</span>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="grow"
                    required
                />
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">Profile updated successfully!</p>}
        </form>
    );
};

export default UpdateBioInfo;

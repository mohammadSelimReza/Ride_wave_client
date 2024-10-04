import { useState } from "react";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("Rider");
  const [selectUserType, setUserType] = useState("rider");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [nid, setNid] = useState("");
  const navigate = useNavigate();

  const gender_option = [
    { label: "Select gender", value: "select" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setUserType(role.toLowerCase());
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      user: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password2: confirmPassword,
      },
      user_type: selectUserType,
      user_photo: null,
      gender: gender,
      birth_date: birthDate,
    };

    if (selectedRole === "Driver") {
      userData.phone_number = phoneNumber;
      userData.driving_license_no = drivingLicense;
      userData.nid = nid;
    }

    console.log(JSON.stringify(userData));

    try {
      await api.post('/rider/register/',userData);
      navigate("/user/login");
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        console.error("Error Message:", error.message);
        alert(error.message);
      }
    }
  };

  return (
    <form className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Please Sign Up</h2>

        {/* Role Selector */}
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 w-1/2 ${
              selectedRole === "Rider"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange("Rider");
            }}
          >
            Sign up to Ride
          </button>
          <button
            className={`px-4 py-2 w-1/2 ${
              selectedRole === "Driver"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange("Driver");
            }}
          >
            Sign up to Drive
          </button>
        </div>

        {/* First Name and Last Name */}
        <div className="flex mb-4">
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
          />
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Set a username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Gender and Birth Date */}
        <div className="flex mb-4">
          <select
            onChange={handleGenderChange}
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
          >
            {gender_option.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
            placeholder="Enter birth date"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Additional Fields for Drivers */}
        {selectedRole === "Driver" && (
          <>
            <div className="mb-4">
              <input
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                onChange={(e) => setDrivingLicense(e.target.value)}
                placeholder="Driving License No"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                onChange={(e) => setNid(e.target.value)}
                placeholder="NID"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </>
        )}

        {/* Sign Up Button */}
        <button
          onClick={formSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Sign In Link */}
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="#" className="text-blue-600">
            Sign in »
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUp;

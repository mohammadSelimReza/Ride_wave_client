import { useState } from "react";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Rider");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Please sign in</h2>

        {/* Role Selector */}
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 w-1/2 ${
              selectedRole === "Rider"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            }`}
            onClick={() => handleRoleChange("Rider")}
          >
            Rider
          </button>
          <button
            className={`px-4 py-2 w-1/2 ${
              selectedRole === "Driver"
                ? "border-b-2 border-black font-bold"
                : "font-normal"
            }`}
            onClick={() => handleRoleChange("Driver")}
          >
            Driver
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Remember me</span>
          </label>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Sign in
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600">
            Sign up »
          </a>
        </div>

        {/* Social Media Login */}
        {selectedRole === "Rider" ? (
          <>
            <div className="flex justify-center space-x-2 mt-6">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
                <i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook
              </button>
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg">
                <i className="fab fa-google mr-2"></i> Sign up with Google
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Login;

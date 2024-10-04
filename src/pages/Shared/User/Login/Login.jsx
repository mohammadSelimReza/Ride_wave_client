import { useState } from "react";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../../constants";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Rider");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e, customUsername, customPassword) => {
    e.preventDefault();
    const data = {
      username: customUsername || username,
      password: customPassword || password,
    };

    try {
      const res = await api.post("/api/token/", data);
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    } finally {
      alert("Logged in successfully");
    }
  };

  // Test Login Handlers
  const handleDriverTestLogin = (e) => {
    handleLogin(e, "dv_driver", "Selim.Reza@easy@1999");
  };

  const handleRiderTestLogin = (e) => {
    handleLogin(e, "prx", "Selim.Reza@django@1999");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
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

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md"
      >
        {/* Username Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          <button type="submit" className="text-blue-600">
            Sign up »
          </button>
        </div>

        {/* Test Login Buttons */}
        <div className="mt-6">
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 mb-2"
            onClick={handleDriverTestLogin}
          >
            Driver Test Login
          </button>
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
            onClick={handleRiderTestLogin}
          >
            Rider Test Login
          </button>
        </div>

        {/* Social Media Login */}
        {selectedRole === "Rider" ? (
          <div className="flex justify-center space-x-2 mt-6">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
              <i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook
            </button>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg">
              <i className="fab fa-google mr-2"></i> Sign up with Google
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default Login;

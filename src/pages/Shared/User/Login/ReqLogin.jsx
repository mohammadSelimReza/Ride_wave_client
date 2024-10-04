import { useState } from "react";
import api from "../../../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../../constants";

const ReqLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      const res = await api.post("/api/token/", data);
      console.log(res.status);
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // Redirect after successful login
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-center text-2xl font-bold mb-6">
        You have to login as Driver first.
      </h2>

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-lg w-full max-w-md"
      >
        {/* Username Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Driver Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Driver Password"
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
          Driver Sign in
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <button type="submit" className="text-blue-600">
            Sign up »
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReqLogin;

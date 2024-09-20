import { useState } from "react";

const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState('Ride');

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6">Please Sign Up</h2>

        {/* Role Selector */}
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 w-1/2 ${selectedRole === 'Ride' ? 'border-b-2 border-black font-bold' : 'font-normal'}`}
            onClick={() => handleRoleChange('Ride')}
          >
            Sign up to Ride
          </button>
          <button
            className={`px-4 py-2 w-1/2 ${selectedRole === 'Drive' ? 'border-b-2 border-black font-bold' : 'font-normal'}`}
            onClick={() => handleRoleChange('Drive')}
          >
            Sign up to Drive
          </button>
        </div>

        {/* First Name and Last Name */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mr-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Set a username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Sign Up Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>

        {/* Sign In Link */}
        <div className="text-center mt-4 text-sm">
          Already have an account? <a href="#" className="text-blue-600">Sign in »</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

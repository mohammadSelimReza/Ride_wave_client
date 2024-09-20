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

const Dashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="mb-10 bg-orange-100 py-6">
        <h2 className="md:text-2xl font-bold max-w-screen-lg mx-auto">
          Dashboard
        </h2>
      </div>
      <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <img
            src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1725597284/k8f8ympr4sorkrxv6c1a.avif`}
            className="rounded-full w-16 h-16 object-cover"
            alt="User Profile"
          />
          <div>
            <h3 className="md:text-xl font-bold">John Doe</h3>
            <p className="md:text-base font-thin">ID: 5236214244</p>
            <p className="md:text-base font-thin space-x-2">
              <NavLink to="/edit">Edit</NavLink>
              <NavLink to="/profile">Profile</NavLink>
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
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <h2>Overview</h2>
        <div className="flex justify-center items-center">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Total Rides</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Total Passengers</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Drivers</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Today Rides</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="overflow-x-auto">
            <h2 className="md:text-2xl font-bold">Total Earnings:</h2>
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200">
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

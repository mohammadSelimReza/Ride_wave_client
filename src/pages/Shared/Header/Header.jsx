import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="navbar bg-base-100 flex">
        {/* Logo Section */}
        <div className="navbar-start w-1/5">
          <NavLink className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-4xl md:text-6xl text-primary">search_hands_free</span>
            <div className="flex flex-col">
              <p className="font-extrabold text-2xl md:text-4xl">
                <span className="text-yellow-500">Ride</span>Wave
              </p>
              <small className="text-start font-light text-sm md:text-base">
                Taxi Service
              </small>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-end hidden w-4/5 lg:flex items-center space-x-6">
          {/* Location Input */}
          <div className="join border border-black hover:border-yellow-500 rounded-full flex">
            <span className="join-item px-4">
              <span className="material-symbols-outlined text-black">location_on</span>
            </span>
            <input
              className="input join-item rounded-l-full border-none focus:outline-none"
              placeholder="Tell us your location"
            />
            <button className="btn join-item rounded-r-full bg-black hover:bg-yellow-500">
              <span className="material-symbols-outlined text-white">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Links */}
          <NavLink
            to="/my-driver-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : "text-black hover:text-yellow-500 bg-white hover:bg-white text-xl font-medium p-3 rounded-full"
            }
          >
            Driver Dashboard
          </NavLink>

          <NavLink
            to="/drive-with-us"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : "text-black hover:text-yellow-500 bg-white hover:bg-white text-xl font-medium p-3 rounded-full"
            }
          >
            <span className="material-symbols-outlined text-3xl bg-yellow-300 p-3 rounded-full">
              person
            </span>
            DRIVE WITH US
          </NavLink>

          <NavLink
            to="/ride-with-ridewave"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : "text-black hover:text-yellow-500 bg-white hover:bg-white text-xl font-medium p-3 rounded-full"
            }
          >
            <span className="material-symbols-outlined text-3xl bg-yellow-300 p-3 rounded-full">
              local_taxi
            </span>
            BOOK A RIDE
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="navbar-end md:hidden">
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-end">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  <NavLink to="/dashboard">Driver Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/drive-with-us">Drive With Us</NavLink>
                </li>
                <li>
                  <NavLink to="/book-ride">Book a Ride</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-2 bg-gray-700 text-white hidden md:flex justify-center items-center gap-x-10">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/services'>Our Services</NavLink>
        <NavLink to='/vehicles'>Our Vehicles</NavLink>
        <NavLink to='/pakages'>Packages</NavLink>
        <NavLink to='/blog'>Blog</NavLink>
        <NavLink to='/contact'>Contact</NavLink>
        <NavLink>
          <button className="btn">Get Started</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

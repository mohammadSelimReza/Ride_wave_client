import { NavLink } from "react-router-dom";

const Header3 = () => {
  return (
    <div>
      <div className="navbar bg-orange-100 py-4 flex justify-center items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-2xl md:text-4xl text-primary">
            search_hands_free
          </span>
          <div className="flex flex-col">
            <p className="font-extrabold text-2xl md:text-2xl">
              <span className="text-yellow-500">Ride</span>Wave
            </p>
            <small className="text-start font-light text-sm md:text-sm">
              Taxi Service
            </small>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header3;

import { NavLink } from "react-router-dom";

const Header2 = () => {
  return (
    <div className="md:max-w-screen-lg mx-auto navbar bg-base-100">
      <div className="flex-1">
        <NavLink to='/' className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-4xl md:text-6xl text-primary">
            search_hands_free
          </span>
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
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Help</a>
          </li>
          <li>
            <details>
              <summary>Login</summary>
              <ul className="bg-base-100 rounded-t-none p-2 md:w-32">
                <li className="w-full">
                  <NavLink to='/user/login'>SIGN IN</NavLink>
                </li>
                <li>
                  <NavLink to='/user/registration' >SiGN UP</NavLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header2;

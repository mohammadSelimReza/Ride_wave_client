import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
// import { FaChevronDown } from "react-icons/fa";

const Header2 = () => {
  const { isAuth,setIsAuth, user } = useAuth();
  console.log(isAuth);
  console.log(user);
  const navigate = useNavigate();
  const hadleLogOut = (e) =>{
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate("/");
    setIsAuth(false);
  }
  return (
    <div className="md:max-w-screen-lg mx-auto navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/" className="flex items-center space-x-2">
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
            {isAuth ? (
              <details className="dropdown">
              <summary className="btn m-1">
                {user?.username}
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <NavLink to='/user/profile'><a>My Profile</a></NavLink>
                <li><a onClick={hadleLogOut} >Logout</a></li>
              </ul>
            </details>
            ) : (
              <details>
                <summary>Login</summary>
                <ul className="bg-base-100 rounded-t-none p-2 md:w-32">
                  <li className="w-full">
                    <NavLink to="/user/login">SIGN IN</NavLink>
                  </li>
                  <li>
                    <NavLink to="/user/registration">SiGN UP</NavLink>
                  </li>
                </ul>
              </details>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header2;

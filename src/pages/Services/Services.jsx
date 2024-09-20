import { NavLink } from "react-router-dom";

const Services = () => {
  return (
    <div>
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">Our Services</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Our Services</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center md:text-4xl font-bold">Our Services</h2>
        <div className="flex flex-wrap gap-4 md:max-w-screen-lg mx-auto my-4">
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">local_taxi</span>
            <p className="md:text-2xl font-bold">Taxi</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">local_taxi</span>
            <p className="md:text-2xl font-bold">Car Book</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">share_location</span>
            <p className="md:text-2xl font-bold">Share</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">car_rental</span>
            <p className="md:text-2xl font-bold">Rental</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">restaurant</span>
            <p className="md:text-2xl font-bold">Food</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
          <div className="w-80 flex justify-center items-center flex-col border-black border-2">
            <span className="material-symbols-outlined md:text-4xl">flight_takeoff</span>
            <p className="md:text-2xl font-bold">Airport Transfer</p>
            <p className="text-center">
              Aenean dictum odio sit amet congue semper. In laoreet metus nec
              dolor ullamcorper, ut iaculis risus scelerisque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

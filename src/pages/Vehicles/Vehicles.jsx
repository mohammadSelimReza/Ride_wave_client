import { NavLink } from "react-router-dom";

const Vehicles = () => {
  return (
    <div>
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">Our Vehicles</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Our Vehicles</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center md:text-4xl font-bold">Our Vehicles</h2>
      </div>
    </div>
  );
};

export default Vehicles;

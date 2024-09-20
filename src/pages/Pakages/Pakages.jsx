const Pakages = () => {
  return (
    <div className="p-10 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Prime Plan */}
        <div className="card shadow-xl">
          <div className="card-body items-center text-center">
            <div className="bg-black w-full h-20 py-4 relative">
              {/* Icon centered at the bottom */}
              <span className="material-symbols-outlined bg-white rounded-full text-5xl absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                local_taxi
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-12">Prime</h2>
            <p className="text-4xl font-bold">$599</p>
            <p className="text-gray-400">/24hour</p>
            <div className="divider my-4"></div>
            <ul className="text-gray-600">
              <li>City travel Prime</li>
              <li>AC Vehicle</li>
              <li>Your Choice 3 Tourism Places</li>
              <li>Tourist Guide</li>
              <li>Quality Vehicle</li>
            </ul>
            <button className="btn btn-warning mt-4">GET NOW</button>
          </div>
        </div>

        {/* Superior Plan */}
        <div className="card shadow-xl">
          <div className="card-body items-center text-center">
            <div className="bg-black w-full h-20 py-4 relative">
              {/* Icon centered at the bottom */}
              <span className="material-symbols-outlined bg-white rounded-full text-5xl absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                local_taxi
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4">Superior</h2>
            <p className="text-4xl font-bold">$1399</p>
            <p className="text-gray-400">/24hour</p>
            <div className="divider my-4"></div>
            <ul className="text-gray-600">
              <li>Any Location Under 400 Km</li>
              <li>AC Vehicle</li>
              <li>Your Choice 3 Tourism Places</li>
              <li>Tourist Guide</li>
              <li>Quality Vehicle</li>
            </ul>
            <button className="btn btn-warning mt-4">GET NOW</button>
          </div>
        </div>

        {/* Prime Plan */}
        <div className="card shadow-xl">
          <div className="card-body items-center text-center">
            <div className="bg-black w-full h-20 py-4 relative">
              {/* Icon centered at the bottom */}
              <span className="material-symbols-outlined bg-white rounded-full text-5xl absolute left-1/2 transform -translate-x-1/2 -bottom-6">
                local_taxi
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-4">Prime</h2>
            <p className="text-4xl font-bold">$2599</p>
            <p className="text-gray-400">/24hour</p>
            <div className="divider my-4"></div>
            <ul className="text-gray-600">
              <li>City travel Prime</li>
              <li>AC Vehicle</li>
              <li>Your Choice 3 Tourism Places</li>
              <li>Tourist Guide</li>
              <li>Quality Vehicle</li>
            </ul>
            <button className="btn btn-warning mt-4">GET NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pakages;

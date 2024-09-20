const Features = () => {
  return (
    <div className="my-10 px-4 md:max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center items-start md:pr-10 text-center md:text-left">
          <h2 className="font-semibold text-3xl md:text-4xl">How it works</h2>
          <p className="my-6 text-sm md:text-base text-justify md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className="btn btn-secondary text-sm md:text-base">
            Read more
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="flex flex-col space-y-10">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-5 text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <span className="material-symbols-outlined text-4xl md:text-5xl bg-yellow-400 rounded-full p-4 md:p-5">
                  ads_click
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg md:text-xl">Book in Just 2 Taps</h2>
                <p className="text-sm md:text-base">
                  Curabitur ac quam aliquam urna vehicula semper sed vel elit.
                  Sed et leo purus. Vivamus vitae sapien.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-5 text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <span className="material-symbols-outlined text-4xl md:text-5xl bg-yellow-400 rounded-full p-4 md:p-5">
                  account_circle
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg md:text-xl">Get a Driver</h2>
                <p className="text-sm md:text-base">
                  Curabitur ac quam aliquam urna vehicula semper sed vel elit.
                  Sed et leo purus. Vivamus vitae sapien.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-5 text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <span className="material-symbols-outlined text-4xl md:text-5xl bg-yellow-400 rounded-full p-4 md:p-5">
                  monitoring
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg md:text-xl">Track your Driver</h2>
                <p className="text-sm md:text-base">
                  Curabitur ac quam aliquam urna vehicula semper sed vel elit.
                  Sed et leo purus. Vivamus vitae sapien.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-5 text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <span className="material-symbols-outlined text-4xl md:text-5xl bg-yellow-400 rounded-full p-4 md:p-5">
                  location_on
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg md:text-xl">Arrive Safely</h2>
                <p className="text-sm md:text-base">
                  Curabitur ac quam aliquam urna vehicula semper sed vel elit.
                  Sed et leo purus. Vivamus vitae sapien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

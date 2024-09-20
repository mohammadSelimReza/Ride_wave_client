import { useState } from "react";

const Banner = () => {
  const [formType, setFormType] = useState("ride");

  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        className="w-full h-[150vh] md:h-[75vh] lg:h-[90vh] object-cover"
      >
        <source
          src="https://res.cloudinary.com/dofqxmuya/video/upload/v1725950835/short_hero_section_video2_cbkkxk.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="banner-top absolute inset-0 flex flex-col md:flex-row justify-center items-center w-full md:w-3/4 mx-auto p-4 md:p-8 lg:p-12">
        <div className="text-center md:text-left md:w-1/2 space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Earn, Connect
            <br />
            Contribute to
            <br />
            Society
          </h1>

          <p className="text-white text-sm md:text-base lg:text-lg">
            Partner with us to drive your own livelihood and more. Partner with
            us to drive your own livelihood and more.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <button className="bg-black text-white py-2 px-4 rounded-md w-32">
              Apple
            </button>
            <button className="bg-black text-white py-2 px-4 rounded-md w-32">
              Google Play
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl w-full mt-8 md:mt-0 md:w-1/2">
          <div className="flex justify-around mb-6">
            <button
              className={`btn ${
                formType === "ride" ? "bg-yellow-500" : "bg-gray-700"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setFormType("ride")}
            >
              Take a Ride
            </button>
            <button
              className={`btn ${
                formType === "drive" ? "bg-yellow-500" : "bg-gray-700"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setFormType("drive")}
            >
              Apply to Drive
            </button>
          </div>

          <div className="text-center">
            {formType === "ride" ? (
              <>
                <h3 className="text-xl font-semibold">
                  Get member exclusive rewards
                </h3>
                <p className="text-gray-600">
                  Egestas sed vulputate eleifend ac adipiscing quisque. Hac
                  vulputate integer sapien et.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">
                  Start driving now and get paid
                </h3>
                <p className="text-gray-600">
                  Egestas sed vulputate eleifend ac adipiscing quisque. Hac
                  vulputate integer sapien et.
                </p>
              </>
            )}
          </div>

          {formType === "ride" ? (
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your location"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                placeholder="Destination"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <button className="btn bg-yellow-500 text-white w-full py-2 rounded-lg">
                Request a Ride
              </button>
            </form>
          ) : (
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                placeholder="Email"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="input w-full rounded-lg border-gray-300 focus:outline-none focus:border-yellow-500"
              />
              <button className="btn bg-yellow-500 text-white w-full py-2 rounded-lg">
                Apply to Drive
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

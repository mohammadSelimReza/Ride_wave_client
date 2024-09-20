import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">Contact US</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        <div>
          <div className="w-80 h-56 p-10 text-center border-2">
            <span className="material-symbols-outlined md:text-7xl text-yellow-400 text-center">
              pin_drop
            </span>
            <h3 className="text-xl font-bold">Address</h3>
            <address>
              <p>Address : #24, St No. 58, RideWave Company,Dhaka,Bangladesh</p>
            </address>
          </div>
        </div>
        <div>
          <div className="w-80 h-56 p-10 text-center border-2">
            <span className="material-symbols-outlined md:text-7xl text-yellow-400 text-center">
              phone_iphone
            </span>
            <h3 className="text-xl font-bold">Phone number</h3>
            <p>Phone : +911234567890, +911267345987</p>
          </div>
        </div>
        <div>
          <div className="w-80 h-56 p-10 text-center border-2">
            <span className="material-symbols-outlined md:text-7xl text-yellow-400 text-center">
              mail
            </span>
            <h3 className="text-xl font-bold">E-mail</h3>
            <p>Email : ridewave@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start p-6">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold mb-6">Send us an Email</h2>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Content"
                  className="textarea textarea-bordered w-full"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-block bg-black text-white"
              >
                Send
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="w-full md:w-1/2 h-screen">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.743403189075!2d-73.97283578459664!3d40.80834987932166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f61e37230d05%3A0x992bdf290ad4782c!2s2880%20Broadway%2C%20New%20York%2C%20NY%2010025%2C%20USA!5e0!3m2!1sen!2sbd!4v1695192338505!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-2 border-gray-300 rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

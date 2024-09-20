const App = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-lg mx-auto my-10">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 md:p-0">
        <h2 className="text-3xl font-bold mb-4">Download RideWave</h2>
        <h6 className="text-lg font-semibold mb-4">
          Download the CarrGo mobile application
        </h6>
        <p className="mb-6">
          Nunc volutpat tincidunt est a scelerisque. Aliquam erat volutpat.
          Donec varius ex in justo pharetra, nec mollis erat porta. Donec sit
          amet facilisis neque. In hac habitasse platea dictumst.
        </p>
        <div className="flex gap-4">
          <button className="bg-black text-white py-2 px-6 rounded-md">
            APP Store
          </button>
          <button className="bg-black text-white py-2 px-6 rounded-md">
            Google Play Store
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <figure className="relative w-full flex justify-center items-center">
          <img
            src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726477729/ced70af9-3487-44bd-b72b-f38bc4f29886-removebg-preview_qotoeu.png`}
            alt="Background Blob"
            className="w-3/4"
          />
          <img
            src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726479464/RideWave-removebg-preview_d3acjd.png`}
            alt="Centered Image"
            className="absolute w-44 md:w-56 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </figure>
      </div>
    </div>
  );
};

export default App;

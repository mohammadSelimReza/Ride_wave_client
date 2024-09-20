const About = () => {
  return (
    <div className="md:flex px-10 md:px-0 md:max-w-screen-lg mx-auto">
      <div className="md:w-1/2 flex flex-col justify-center pr-10">
        <h2>About CarrGo</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco
        </p>
        <div className="grid grid-cols-2 grid-rows-2">
          <div>
            <div>
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div>
            <div>
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div>
            <div>
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div>
            <div>
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2">
        <figure className="relative">
          <div className="relative">
            <div>
              <img
                src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726465891/Abstract_blobs_-_Icons_by_Canva-removebg-preview_csgujr.png`}
                alt=""
              />
            </div>
            <div className="absolute top-10 left-10">
              <img
                src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726465974/who-we-are-01_1_twfbcq.jpg`}
                alt=""
              />
            </div>
          </div>
          <div className="absolute bottom-0">
            <img
              src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726465973/who-we-are-02_1_owfo4v.jpg`}
              alt=""
            />
          </div>
        </figure>
      </div>
    </div>
  );
};

export default About;

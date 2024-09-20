const Trusted = () => {
    return (
      <div className="flex flex-col md:flex-row max-w-screen-lg mx-auto px-4 md:px-0 my-10">
        <div className="flex flex-col md:w-2/5 w-full mb-6 md:mb-0">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Trusted Cab Services in the World</h2>
          <p className="mb-4">
            Curabitur placerat cursus nisi nec pharetra. Proin quis tortor fringilla, placerat nisi nec, auctor ex. 
            Donec commodo orci ac lectus mattis, sed interdum sem scelerisque.
          </p>
          <p className="flex items-center mb-2">
            <span className="material-symbols-outlined text-white bg-black rounded-full mr-2">check_circle</span>
            Cras justo odio
          </p>
          <p className="flex items-center mb-2">
            <span className="material-symbols-outlined text-white bg-black rounded-full mr-2">check_circle</span>
            Dapibus ac facilisis in
          </p>
          <p className="flex items-center mb-4">
            <span className="material-symbols-outlined text-white bg-black rounded-full mr-2">check_circle</span>
            Morbi leo risus
          </p>
          <button className="btn btn-secondary w-max">Read More</button>
        </div>
        <div className="flex justify-center items-center md:w-3/5 w-full">
          <figure className="w-full">
            <img
              src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726475658/Background_rl3jbe.png`}
              alt="Trusted Cab Service"
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
      </div>
    );
  };
  
  export default Trusted;
  
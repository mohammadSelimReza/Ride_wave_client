import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="mb-10 bg-orange-100 py-6">
        <div className="max-w-screen-lg mx-auto flex justify-between px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold">About US</h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>About</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-lg mx-auto my-20">
        <div className="w-1/2">
          <h1>Trusted Cab Services in the World</h1>
          <p>
            Curabitur placerat cursus nisi nec pharetra. Proin quis tortor
            fringilla, placerat nisi nec, auctor ex. Donec commodo orci ac
            lectus mattis, sed interdum sem scelerisque. Vivamus at euismod
            magna. Aenean semper risus nec dolor bibendum cursus. Donec eu odio
            eu ligula sagittis fringilla. Phasellus vulputate velit eu vehicula
            auctor. Nam vel pellentesque libero. Fusce dui metus, interdum ac
            malesuada eu, ornare nec neque. Fusce hendrerit, tortor id egestas
            rutrum, orci lorem lacinia velit, sed mollis augue diam eget ipsum.
            Curabitur euismod, tellus sit amet tincidunt semper, dui odio
            pharetra orci, sed molestie odio libero sed libero. Sed volutpat
            ornare mauris. Sed gravida pulvinar urna, eget euismod mi mattis a.
          </p>
          <button className="btn btn-secondary text-white">Read More</button>
        </div>
        <div className="w-1/2">
            <figure>
                <img src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726475658/Background_rl3jbe.png`} alt="" />
            </figure>
        </div>
      </div>
    </div>
  );
};

export default About;

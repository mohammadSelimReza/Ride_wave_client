import Slider from "react-slick";

const Comment = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="relative mb-32">
      <div>
        <img
          src={`https://res.cloudinary.com/dofqxmuya/image/upload/v1726480267/Background_1_ue9oqn.png`}
          alt=""
          className="h-80 w-full"
        />
      </div>
     <div className="absolute -bottom-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
     <div className="slider-container max-w-screen-lg mx-auto">
        <Slider {...settings}>
          <div className="flex justify-center relative top-1/3">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Maxime quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
          </div>
          <div className="flex justify-center relative top-1/3">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Maxime quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
          </div>
          <div className="flex justify-center relative top-1/3">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Maxime quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
          </div>
          <div className="flex justify-center relative top-1/3">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Maxime quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
          </div>
          <div className="flex justify-center relative top-1/3">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <img
                  src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
                  className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
                  alt=""
                  loading="lazy"
                />
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      COMMENTOR
                    </p>
                    <a className="text-gray-500 text-xl" href="#">
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                Maxime quisquam vero adipisci beatae voluptas dolor ame.
              </p>
            </div>
          </div>
        </Slider>
      </div>
     </div>
    </div>
  );
};

export default Comment;

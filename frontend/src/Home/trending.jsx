import React from "react";
import { useAuth } from "../context/authprovider.jsx";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Trending() {
  const { games } = useAuth();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className=" container mx-auto">
      <h1 className=" text-2xl font-semibold mb-4 ">Trending</h1>
      <Carousel responsive={responsive}>
        {games && games.length > 0 ? (
          games.slice(0, 7).map((element) => {
            return (
              <div
                key={element._id}
                className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2"
              >
                <Link to={`/game/${element._id}`}>
                  <div className="relative">
                    <img
                      src={element.gameImage.url}
                      alt="game"
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {element.category}
                    </div>
                    <h1 className='absolute left-4 bottom-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300 '>{element.gamename}</h1>
                  </div>
                  
                </Link>
              </div>
            );
          })
        ) : (
          <div className=" flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
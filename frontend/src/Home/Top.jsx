import React from 'react'
import { useAuth } from '../context/authprovider'
import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

export default function Top() {

  const [cat, setCat] = useState("multiplayer");
  const {games}= useAuth()
  const catgames = games?.filter((game) => game.category === cat);

 console.log(catgames)
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
    <div className='container mx-auto my-10'>
      <h1 className=" text-2xl font-semibold mb-4">Category</h1>
      <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-50 p-2 mb-4 border rounded-md"
            >

              <option value="multiplayer">Multiplayer</option>
              <option value="shooting">Shooter</option>
              <option value="single">Single</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
            </select>
            <Carousel responsive={responsive}>
        {catgames && catgames.length > 0 ? (
          catgames.slice(0, 6).map((element) => {
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

  )
}

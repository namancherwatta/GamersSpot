import React from "react";
import { useAuth } from '../context/authprovider'
import { Link } from "react-router-dom";

function Games() {
  const { games } = useAuth();

  console.log(games);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">List of All Games!!!</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {games && games.length > 0 ? (
            games.map((game, index) => (
              <Link
                to={`/game/${game._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={game?.gameImage?.url}
                  alt={game?.gamename}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{game?.gamename}</h2>
                  <p className="text-sm">{game?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Games;
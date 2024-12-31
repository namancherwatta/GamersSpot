import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {BACKEND_URL} from "../utils.js"

export default function mygames() {
    const [mygames,setMyGames]=useState([])
   useEffect(()=>{
    const fetchmyGames=async()=>{
      try {
        const {data}= await axios.get(BACKEND_URL+"/api/games/myGames/",{withCredentials:true})
        console.log(data.myGames)
        setMyGames(data.myGames)
      } catch (error) {
        console.log(error)
      }
    }
    fetchmyGames();
   },[])

   const handleDelete = async (id) => {
    await axios
      .delete(BACKEND_URL+`/api/games/delGame/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Game deleted successfully");
        setMyGames((value) => value.filter((game) => game._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || "Failed to delete game");
      });
  };

  return (
    <div className='ml-40'>
    <div className="container mx-auto my-12 p-4">
    <div className=" grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
      {/* <h1 className=" text-2xl font-semibold mb-4 ">Games</h1> */}
        {mygames && mygames.length > 0 ? (
          mygames.map((element) => {
            return (
              <div
                key={element._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {element?.gameImage && (
                  <img
                    src={element?.gameImage.url}
                    alt="gameImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  {/* <span className="text-sm text-gray-600">
                    {element.category}
                  </span> */}
                  <h4 className="text-xl font-semibold my-2">
                    {element.gamename}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/game/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
              </div>
             </div>
            </div>
            );
          })
        ) : (
          <div className=" flex h-screen items-center justify-center">
           No Games Added
          </div>
        )}
    </div>
  </div>
  </div>
  )
}

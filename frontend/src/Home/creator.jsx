import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authprovider'
import { Link } from 'react-router-dom';
import BACKEND_URL from "../utils"

export default function creator() {
  const { games } = useAuth();
  const [creators,setCreators]=useState([])
  const [topCreators, setTopCreators] = useState([]);
 
  useEffect(()=>{
     const fetchCreators= async ()=>{
      const {data}=await axios.get(`BACKEND_URL/api/users/Creators`,{
        withCredentials:true,
      })
      console.log(data)
      setCreators(data)
     }
     
     fetchCreators()
  },[])
 
  useEffect(() => {
    if (games && creators) {
      const creatorCounts = games.reduce((counts, game) => {
        const creatorId = game.createdBy; 
        if (!creatorId) return counts; 
        

        if (counts[creatorId]) {
          counts[creatorId].gameCount++;
        } else {
          const creatorDetails = creators.find(
            (creator) => creator._id === creatorId
          );
          if (creatorDetails) {
            counts[creatorId] = {
              ...creatorDetails,
              gameCount: 1,
            };
          }
        }
        return counts;
      }, {});

      const sortedCreators = Object.values(creatorCounts)
        .sort((a, b) => b.gameCount - a.gameCount)
        .slice(0, 4); // Take top 4 creators

      setTopCreators(sortedCreators);
    }
  }, [games, creators]); // Recompute when `games` or `creators` changes
  
  return (
    <div className=" container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Top contributors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {topCreators && topCreators.length > 0 ? (
          topCreators.slice(-4).map((element) => {
            return (
              <div key={element._id}>
                <div className="">
                  <img
                    src="usericon.svg"
                    alt="logo"
                    className="md:w-56 md:h-56 object-cover border border-black rounded-full items-center "
                  />
                  <div className="text-center md:ml-[-130px]">
                    <p>{element.name}</p>
                    <p className="text-gray-600 ">Games contributed: {element.gameCount}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

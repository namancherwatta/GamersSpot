import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authprovider';
import { useNavigate } from 'react-router-dom';

export default function playgame() {
   const {isAuthenticated} =useAuth()
   const navigateTo=useNavigate()
    const {id} =useParams()
   
    const gohome=()=>{
        navigateTo("/")
    }

    // console.log(id)
    const [games,setGames]=useState({})
    useEffect(() => {
        const fetchGame = async () => {
         if(isAuthenticated){
          try {
           
            const { data } = await axios.get(
              `http://localhost:4001/api/games/singleGame/${id}`,{
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(data.sgame);
            setGames(data?.sgame)
          } catch (error) {
            console.log(error);
            toast.error("Please fill the required fields");
          }
        }else{
            toast.error("Need to login first")
            navigateTo("/login")

        }
    }
        fetchGame();
      }, [id]);
  return (
    <div className="h-screen">
  <div>
    <div className="flex justify-center">
      <h1 className="my-5 font-bold text-3xl text-blue-700">
        {games.gamename + ".io"}
      </h1>
    </div>
  </div>
  <div className="flex justify-center items-center h-[75%]">
    <div className="w-3/4 h-full">
      <iframe 
        src={games.gameURL} 
        className="w-full h-full border-0"
        title="Embedded Website"
      ></iframe>
    </div>
  </div>
  <div className="flex justify-center">
      <button onClick={gohome} className="my-3 font-bold text-2xl text-blue-700">
        Go Back
      </button>
    </div>
</div>


  )
}

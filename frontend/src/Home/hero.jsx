import React from 'react'
import { useAuth } from '../context/authprovider'
import { Link } from 'react-router-dom'

export default function hero() {
  const {games}= useAuth()
  

  return (
    <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6'>{games && games.length>0 ?(
       games.slice(-4).map((element)=>{
        return <Link to={`/game/${element._id}`} key={element._id} className='bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
              <div className='relative'>
                <img src={element.gameImage.url} alt="" className='w-full h-56 object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300  '></div>
                <h1 className='absolute left-4 bottom-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300 '>{element.gamename}</h1>
                <div className="absolute top-3 right-2 bg-white bg-opacity-80 text-black text-xs font-bold px-2 py-1 rounded-md shadow-md  "><i className=''>New</i></div>
              </div>

             {/* <div className='p-2 items-center'><p className='text-xs text-gray-500'>New</p></div> */}
        </Link>
          
       })

    ):<div className=" flex h-screen items-center justify-center">Loading....</div>}</div>
  )
}

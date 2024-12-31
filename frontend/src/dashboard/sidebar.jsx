import React, { useState } from 'react'
import { useAuth } from '../context/authprovider';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";
export default function sidebar({setComponent}) {
     const {profile,setIsAuthenticated}=useAuth()
     const [show,setShow]=useState(false)
     const navigateTo=useNavigate();
     console.log(profile)
     const handleComponents=(value)=>{
        setComponent(value);
     }

     const gotoHome=()=>{
          navigateTo("/")
     }

     const handleLogout=async(e)=>{
        e.preventDefault();
        try {
            const data= await axios.get("http://localhost:4001/api/users/logout",{withCredentials:true})
            toast.success("Logged out");
            setIsAuthenticated(false)
            navigateTo("/");
        } catch (error) {
            console.log(error)
            alert(error.response.messsage || "Failed to logout")
        }
     }

  return (
    <>
    <div className='sm:hidden fixed top-4 left-4 z-50 ' onClick={()=>{setShow(!show)}}>
        <GiHamburgerMenu className='text-2xl'/>
    </div>
    <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-grey-50 transition-transform duration-300 transform sm:translate-x-0 ${show ? "translate-x-0":"-translate-x-full" } `} >
        <div className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer' onClick={()=>{setShow(!show)}}><FaArrowLeft /></div>
        <div className='text-center my-4'>
         <img className='w-24 h-24 rounded-full mx-auto mb-2'src="usericon.svg" alt="usericon" />
         <p className='text-lg font-semibold'>{profile.name}</p>
        </div>
        <ul className='space-y-6 mx-4'>
            <button onClick={()=>{handleComponents("My Games")}}  className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300'>My Games</button>
            <button onClick={()=>{handleComponents("Create Game")}} className='w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300'>Create Game</button>
            <button onClick={()=>{handleComponents("My Profile")}} className='w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300'>My Profile</button>
            <button onClick={gotoHome} className='w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300'>Home</button>
            <button onClick={handleLogout} className='w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300'>Logout</button>
            
        </ul>
    </div>
  </>
  )
}

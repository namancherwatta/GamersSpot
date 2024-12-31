import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/authprovider'
import toast from 'react-hot-toast'
export default function register() {
    const {isAuthenticated,setIsAuthenticated}=useAuth()
    const navigateTo=useNavigate()

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [role,setRole]=useState("")
    const [password,setPassword]=useState("")
  
    const handleRegister = async(e)=>{
     e.preventDefault()
     const formData= new FormData()
     formData.append('name',name)
     formData.append('email',email)
     formData.append('phone',phone)
     formData.append('password',password)
     formData.append('role',role)
     try {
      const {data} =await axios.post("http://localhost:4001/api/users/register",formData,{
        withCredentials:true,
        headers:{"Content-Type":"multipart/form-data"}
      })
      console.log(data) 
      toast.success(data.message || 'User registered successfully')
      setIsAuthenticated(true)
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setRole("")
      navigateTo("/");
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Please fill required fields")
     }
    }



  return (
    <div><div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form action="" onSubmit={handleRegister}>
        <div className='font-semibold text-xl  text-center'>
          Gamers<span className='text-blue-500'>Spot</span>
          </div>
          <h1 className='text-xl font-semibold mb-6'>Register</h1>
          <select value={role} onChange={(e)=>{setRole(e.target.value)}} className='w-full p-2 mb-4 border rounded-md '>
            <option value="">Select Role</option>
            <option value="Gamer">Gamer</option>
            <option value="Creator">Creator</option>
          </select>
          <div>
          <input type='text' placeholder='Your name' onChange={(e)=>{setName(e.target.value)}} value={name} className='w-full p-2 border mb-4 rounded-md '/>
          <input type='email' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-full p-2 border mb-4 rounded-md '/>                  
          <input type='number' placeholder='Contact number' value={phone} onChange={(e)=>{setPhone(e.target.value)}} className='w-full p-2  mb-4 border rounded-md '/>        
          <input type='password' placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-full p-2  mb-4  border rounded-md '/>        
          </div>
          <p className='text-center mb-4'>Already Registered?{"  "}<Link to={"/login"} className="text-blue-600">Login now</Link></p>
          <button type='submit' className='w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white' >Register</button>
        </form>
      </div>
      </div></div>
  )
}

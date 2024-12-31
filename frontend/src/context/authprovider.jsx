import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"


export const Authcontext=createContext()
export const AuthProvider= ({children})=> {
    const [games,setGames]=useState()
    const [profile,setProfile]=useState()
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    useEffect(()=>{
        const fetchprofile=async()=>{
            try {
                let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
               console.log(token)
                if(token){
                const {data} = await axios.get("http://localhost:4001/api/users/myProfile", { withCredentials: true,headers: {
                    "Content-Type": "application/json",
                  }, })
                console.log(data)
                setProfile(data)
                setIsAuthenticated(true)
            }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchGames=async()=>{
            try {
                const {data} = await axios.get("http://localhost:4001/api/games/allgames", { withCredentials: true })
                console.log(data)
                setGames(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchGames()
        fetchprofile()
    },[])
  return (
   <Authcontext.Provider value={{games,profile,isAuthenticated,setIsAuthenticated,setProfile}}>{children}</Authcontext.Provider>
  )
}

export const useAuth=()=> useContext(Authcontext)

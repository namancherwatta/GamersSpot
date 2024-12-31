import React, { useState } from 'react'
import { useAuth } from '../context/authprovider'
import Sidebar from '../dashboard/sidebar'
import Myprofile from '../dashboard/myprofile'
import AddGame from '../dashboard/Addgame'
import UpdateGame from '../dashboard/updategame'
import MyGames from '../dashboard/mygames'

export default function dashboard() {
  const {profile,isAuthenticated}=useAuth()
  const [component,setComponent]=useState("My Games")
 
  return (
    <div>
      <div><Sidebar component={component} setComponent={setComponent}/>
           {component==="My Profile"?(<Myprofile />): component==="Create Game"?(<AddGame/>):component==="Update game"?(<UpdateGame/>):(<MyGames/>) }
      </div>
    </div>
  )
}

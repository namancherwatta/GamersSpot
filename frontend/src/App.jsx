import React from "react";
import Navbar from "../src/components/navbar";
import Home from "./components/home";
import Footer from "./components/footer"
import Games from "./Pages/games";
import Contact from "./Pages/contact";
import Login from "./Pages/login";
import Register from "./Pages/register";
import About from "./Pages/about"
import Dashboard from "./Pages/dashboard"
import Creators from "./Pages/creators"
import Updategame from "./dashboard/updategame";
import Notfound from "./Pages/notfound";
import Playgame from "./Pages/playgame";
import {Routes, Route, useLocation} from "react-router-dom"
import { useAuth } from "./context/authprovider"
import { Toaster } from "react-hot-toast";

function App() {
  
  const location=useLocation()
  const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname)

 const { games, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage to maininting the routes protect (Go to login.jsx)
  
  console.log(isAuthenticated)
 


  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Games" element={<Games />}></Route>
        <Route exact path="/About" element={<About />}></Route>
        <Route exact path="/Contact" element={<Contact />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Register" element={<Register />}></Route>
       <Route exact path="/Dashboard" element={<Dashboard />}></Route> 
       <Route exact path="/Creators" element={<Creators />}></Route>
       <Route exact path="/game/update/:id" element={<Updategame />}></Route>
       <Route exact path="/game/:id" element={<Playgame />}></Route>
       <Route exact path="*" element={<Notfound/>}></Route>
      </Routes>
      <Toaster />
     {!hideNavbarFooter && <Footer />}
    </div>
  );
}


export default App;
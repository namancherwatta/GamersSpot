import React, { useState } from 'react'
import toast from "react-hot-toast"
import axios from 'axios'


export default function Addgame() {
     const [gamename,setGamename]=useState("")
      const [category,setCategory]=useState("")
      const [gameURL,setGameURL]=useState("")
      const [about,setAbout]=useState("")
      const [gameImage,setGameImage]=useState("")
      const [gameImagePreview, setGameImagePreview] = useState("");
    
      const handleAddGame = async(e)=>{
       e.preventDefault()
       const formData= new FormData()
       formData.append('gamename',gamename)
       formData.append('category',category)
       formData.append('gameURL',gameURL)
       formData.append('about',about)
       formData.append('gameImage',gameImage)
       try {
        const {data} =await axios.post("http://localhost:4001/api/games/addGame",formData,{
          withCredentials:true,
          headers:{"Content-Type":"multipart/form-data"}
        })
        console.log(data) 
        toast.success(data.message || 'Game is added')
        setGamename("")
        setCategory("")
        setGameURL("")
        setAbout("")
        setGameImage("")
        setGameImagePreview('')
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Please fill required fields")
       }
      }
      const changePhotoHandler = (e) => {
        console.log(e);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setGameImagePreview(reader.result);
          setGameImage(file);
        };
      };


  return (
    <div>
    <div className="min-h-screen  py-10">
      <div className="max-w-4xl mx-auto p-6 border  rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">Create Blog</h3>
        <form onSubmit={handleAddGame} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            >
              <option value="">Select Category</option>
              <option value="Multiplayer">Multiplayer</option>
              <option value="single">Single</option>
              <option value="action">Action</option>
              <option value="shooting">Shooting</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter your blog title"
              value={gamename}
              onChange={(e) => setGamename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-lg">URL</label>
            <input
              type="text"
              placeholder="Enter game URL"
              value={gameURL}
              onChange={(e) => setGameURL(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">Game Image</label>
            <div className="flex items-center justify-center">
              <img
                src={gameImagePreview ? `${gameImagePreview}` : "/imgPL.webp"}
                alt="Image"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">About</label>
            <textarea
              rows="5"
              placeholder="Write something about your game"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

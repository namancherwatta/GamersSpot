import mongoose from "mongoose";
import { game } from "../model/game.model.js";
import { v2 as cloudinary } from "cloudinary"



export const AddGame=async(req,res)=>{
    try{  const {gamename,gameURL,category,about}=req.body
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({ message: "Game Image is required" });
        }
        const { gameImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(gameImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
      console.log(gamename)
    if(!gamename || !gameURL || !category || !about){
        
        return res.status(400).json({message:"Please fill all required fields"})
    }
    
    const cloudinaryResponse = await cloudinary.uploader.upload(
        gameImage.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log(cloudinaryResponse.error);
      }
        
      const createdBy=req?.user?._id;
      const gamedata={gamename,gameURL,category,about,createdBy, gameImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },}
      
      const newgame=await game.create(gamedata);
      if(newgame){
        console.log(newgame)
        return res.status(201).json({message:"Game is added successfully",newgame})
      }
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"}) 
    }
    };

export const DelGame=async(req,res)=>{
    const {id} =req.params
    const dgame=await game.findById(id)
    if(!game){
        return res.status(404).json({messsage: "Game with ID given not found"})
    }
    await dgame.deleteOne()
    res.status(200).json({message:"Game removed successfully"})

}

export const GetAllGames=async(req,res)=>{
     const allGames=await game.find()
     res.status(200).json(allGames)
}

export const GetSingleGame=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid game ID"})
    }
    const sgame=await game.findById(id);
    if(!sgame){
        return res.status(404).json({message:"Game not found "})
    }
    res.status(200).json({sgame})

}

export const GetMyGames=async(req,res)=>{
    const createdBy=req.user._id;
    const myGames=await game.find({createdBy});
    res.status(200).json({myGames})
}

export const UpdateGame=async(req,res)=>{
    const {id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid Game ID"})
    }
    console.log(req.body)
    const ugame=await game.findByIdAndUpdate(id, req.body,{new:true})
    if(!ugame){
        return res.status(404).json({message:"Game not found"})
    }
    res.status(200).json({ugame})
}
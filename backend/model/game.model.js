import mongoose from "mongoose";
import validator from "validator";


const gameSchema=new mongoose.Schema({
        gamename:{
            type:String,
            required: true,
            unique: true
        },
        gameImage:{
            public_id: {
                type: String,
                required: true,
            },  url: {
                type: String,
                required: true,
              },
        },
        gameURL:{
            type: String,
            required: true,
            unique: true,
            validate:[validator.isURL,"Kindly enter a valid URL"]
        },
        category:{
            type:String,
            required:true
        },
        about:{
            type:String,
            required:true,
            minlength:[200,"Please add 200 characters about game"]
        },
        createdBy:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },

});

export const game=mongoose.model("Game",gameSchema)
import mongoose from "mongoose";
import validator from "validator";


const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate:[validator.isEmail,"Kindly enter a valid Email"]

        },
        phone:{
            type: Number,
            required : true,
            unique: true
        },
        role:{
            type: String,
            required: true,
            enum:["Gamer","Creator"]
        },
        password:{
            type: String,
            required:true,
            select: false,
            minlength: 8
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        token:{
            type:String,
        }

});

export const User=mongoose.model("User",userSchema)
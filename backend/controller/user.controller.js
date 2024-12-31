import { User } from "../model/user.model.js"
import bcryptjs from "bcryptjs";
import createTokenandSaveCookie from "../jwt/authToken.js";

export const register=async(req,res)=>{
try{  const {name,email,password,phone,role}=req.body
  const securepasswd =await bcryptjs.hash(password,10)
  console.log(name)
if(!name || !email || !password || !phone || !role){
    
    return res.status(400).json({message:"Please fill all required fields"})
}
  const user= await User.findOne({email})
  if(user){
    return res.status(400).json({message:"Email already exists"})
  }

  const newUser= new User({name,email,password:securepasswd,phone,role})
  await newUser.save()
  if(newUser){
    let token=await createTokenandSaveCookie(newUser._id,res)
    //console.log(token)
    return res.status(201).json({message:"User is added successfully",user,token:token})
  }
}catch(error){
    return res.status(500).json({error:"Internal server error"}) 
}
};


export const login=async(req,res)=>{
    const {email,password,role}=req.body;
    try {
        if(!email || !password || !role ){
            return res.status(400).json({message:"Please fill required fields"})
        }
        const user= await User.findOne({email}).select("+password");;
        console.log(user)
        if(!user.password){
            return res.status(400).json({message:"User password not found"})
        }
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(400).json({message:"Username or Password is incorrect"})
        }
        if(user.role != role){
            return res.status(400).json({message:`Given role ${role} not found`})
        }
        const token= await createTokenandSaveCookie(user._id,res)
        res.status(200).json({message:"User logged in successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
                },token:token
    })
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
        
    }

};

export const logout =(req,res)=>{
try{res.clearCookie("jwt",{httpOnly:true});
res.status(200).json({message:"User logged out successfully"})
}catch(error){
    console.log(error)
    return res.status(500).json({error:"Internal server error"})
}


};


export const getmyprofile=async(req,res)=>{
    const user=await req.user
    res.status(200).json(user)
}

export const getCreators=async(req,res)=>{
  const creators=await User.find({role:"Creator"});
  res.status(200).json(creators)
}




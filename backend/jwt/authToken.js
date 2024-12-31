import jsonwebtoken from "jsonwebtoken";
import {User} from "../model/user.model.js"

const createTokenandSaveCookie=async (userID, res)=>{
    const token=jsonwebtoken.sign({userID},process.env.jwtSecretKey,{expiresIn:"7d"});
    res.cookie("jwt",token,{
        httpOnly:false,
        secure:true,
        sameSite:"none"
    })
    await User.findByIdAndUpdate(userID,{token}
    )
    return token
    
}

export default createTokenandSaveCookie;
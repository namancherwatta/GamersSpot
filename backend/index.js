import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRoute from "./routes/user.route.js"
import gamesRoute from "./routes/game.route.js"
import cookieParser from 'cookie-parser';
import cors from "cors";
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from "cloudinary"


dotenv.config()
const port = process.env.port
const app = express()
const mongourl=process.env.mongoURI

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: process.env.FrontendUrl,credentials: true, methods:["GET","POST","PUT","DELETE"] }));
app.use(fileUpload({useTempFiles: true,tempFileDir: "/tmp/",}));

//Connecting to DB
try {
    mongoose.connect(mongourl)
    console.log("Connected to DB")
} catch (error) {
    console.log(error)
}

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

//Define routes
app.use("/api/users",userRoute)
app.use("/api/games",gamesRoute)



app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
import express from "express";
import { getCreators, getmyprofile, login, logout, register } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";


const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get("/logout", isAuthenticated ,logout)
router.get('/myProfile',isAuthenticated,getmyprofile)
router.get('/Creators',getCreators)
export default router;
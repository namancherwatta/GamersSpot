import express from "express";
import { AddGame,DelGame, GetAllGames, GetSingleGame, GetMyGames, UpdateGame } from "../controller/game.controller.js";
import { isCreator, isAuthenticated } from "../middleware/authUser.js";


const router=express.Router()


router.post('/addGame',isAuthenticated,isCreator("Creator"),AddGame)
router.delete('/delGame/:id',isAuthenticated,isCreator("Creator"),DelGame)
router.get('/allgames',GetAllGames)
router.get('/singleGame/:id',isAuthenticated,GetSingleGame)
router.get('/myGames',isAuthenticated,isCreator("Creator"),GetMyGames)
router.put('/updGame/:id',isAuthenticated,isCreator("Creator"),UpdateGame)


export default router;
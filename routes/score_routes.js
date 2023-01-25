import express from "express";
import { newScore, getLastScore, getAllScores} from '../controllers/score_controllers.js'
import { authenticateToken, checkAdmin } from "../controllers/auth_controllers.js";


const router = express.Router();

// ROUTES //

        // route to retrieve a logged in user's latest score
        router.get('/latest', authenticateToken, getLastScore)

        // route to retrieve all scores from a logged in user (newest to oldest) 
        router.get('/all', authenticateToken, getAllScores)

        // route to create a new 'score' entry in the score mongoDB collection  
        router.post('/new', authenticateToken, newScore)


// export the router 
export default router 
        
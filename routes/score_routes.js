import express from "express";
import { newScore, getLastScore, getAllScores} from '../controllers/score_controllers'


const router = express.Router();

// ROUTES //

        // route to retrieve a logged in user's latest score
        router.get('/latest', getLastScore)

        // route to retrieve all scores from a logged in user (newest to oldest) 
        router.get('/all', getAllScores)

        // route to create a new 'score' entry in the score mongoDB collection  
        router.post('/new', newScore)


// export the router 
export default router 
        
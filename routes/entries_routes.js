import express from "express";
import { getUserEntries, postEntry, getDailyTag, getMonthsTags, deleteEntry } from '../controllers/entries_controllers.js'
import { authenticateToken, checkAdmin } from "../controllers/auth_controllers.js";

const router = express.Router();

    // returns all user entries from loged in user organised from latest to oldest 
    router.get('/all', authenticateToken, getUserEntries) 
    

    // posts new entry document to database 
    router.post('/new', authenticateToken, postEntry)

    // deletes a logged in user's specified entry
    router.delete('/delete/:id', authenticateToken, deleteEntry)

    // returns all user tags from 'todays' date
    router.get('/tags/today', authenticateToken, getDailyTag)


    // returns all user tags from the past 30 days
    router.get('/tags/month', authenticateToken, getMonthsTags)



// export the router 
export default router 
        
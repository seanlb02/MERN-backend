import express from "express";
import { getUserEntries, postEntry } from '../controllers/entries_controllers.js'
import { authenticateToken, checkAdmin } from "../controllers/auth_controllers.js";

const router = express.Router();

    // returns all user entries from loged in user organised from latest to oldest 
    router.get('/all', authenticateToken, getUserEntries) 
    

    // posts new entry document to database 
    router.post('/new', authenticateToken, postEntry)




// export the router 
export default router 
        
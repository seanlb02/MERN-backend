import express from 'express';

// import controllers/middleware 
import { getAllUsers, getUserData, updateMemo } from '../controllers/user_controllers.js';
import { authenticateToken, checkAdmin } from '../controllers/auth_controllers.js';

const router = express.Router();

// admin protected route to fetch all users in database 
router.get('/all', authenticateToken, checkAdmin, getAllUsers)


// route to get a logged in user's data (identity taken from JWT autenticator) 
router.get ('/data', authenticateToken, getUserData)
 
//  route to update a users's memo 
router.patch('/memo/update', authenticateToken, updateMemo)

// route for logged in user to delete their account
router.delete('/account/delete', authenticateToken )


// export the router 
 export default router 



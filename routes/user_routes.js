import express from 'express';

// import controllers/middleware 
import { deleteSelf, getAllUsers, getUserData, updateMemo, searchUsernames, deleteUser } from '../controllers/user_controllers.js';
import { authenticateToken, checkAdmin } from '../controllers/auth_controllers.js';

const router = express.Router();

// admin protected route to fetch all users in database 
router.get('/all', authenticateToken, checkAdmin, getAllUsers)

// admin protected route to delete a specific user 
router.delete('/admin/delete/:user', authenticateToken, checkAdmin, deleteUser)

// route to search all userNAMES in the database (no other data)
router.get('/search', authenticateToken, searchUsernames)

// route to get a logged in user's data (identity taken from JWT autenticator) 
router.get ('/data', authenticateToken, getUserData)
 
//  route to update a users's memo 
router.patch('/memo/update', authenticateToken, updateMemo)

// route for logged in user to delete their account
router.delete('/account/delete', authenticateToken, deleteSelf)

// route for logged in user to add a username to their 'tracking' field



// route for a username to be added to a user's 'tracker' field 

// search usernames
router.get('/search/:user', authenticateToken, searchUsernames)








// export the router 
 export default router 



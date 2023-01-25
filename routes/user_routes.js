import express from 'express';

// import controllers/middleware 
import { getUserData } from '../controllers/user_controllers.js';
import { authenticateToken, checkAdmin } from '../controllers/auth_controllers.js';

const router = express.Router();

// admin protected route to fetch all users in database 
router.get('/:adminusername/all', authenticateToken, checkAdmin)


// route to get a logged in user's data (identity taken from JWT autenticator) 
router.get ('/data', authenticateToken, getUserData)
 

// export the router 
 export default router 



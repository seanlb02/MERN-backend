import express from 'express';

// import controllers/middleware 

import { authenticateToken, checkAdmin } from '../controllers/auth_controllers.js';
import { authoriseTracker } from '../controllers/track_ controllers.js';

// Routes 


// route to return user 'tracking' field 



// route to return user 'tracker' field 



// route to add user to tracking field (and simultaneously add logged in user to tracker's 'tracking field')
router.get('/authorise/:user', authenticateToken, authoriseTracker);

// route to revoke authorization rights for a tracker 



const router = express.Router();









// export the router 
export default router 
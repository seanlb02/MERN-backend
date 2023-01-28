import express from 'express';

// import controllers/middleware 

import { authenticateToken, checkAdmin } from '../controllers/auth_controllers.js';
import { authoriseTracker, getTrackers, getTracking, revokeAccess } from '../controllers/track_ controllers.js';


const router = express.Router();

// route to return user 'tracking' field 

router.get('/list/tracking', authenticateToken, getTracking)

// route to return user 'tracker' field 

router.get('/list/trackers', authenticateToken, getTrackers)


// route to add user to tracking field (and simultaneously add logged in user to tracker's 'tracking field')

router.post('/authorise/:tracker', authenticateToken, authoriseTracker)

// route to revoke authorization rights for a tracker (reverse of the above endpoint) 

router.patch('/revoke/:user', authenticateToken, revokeAccess)












// export the router 
export default router 

import express from 'express';

// import controllers/middleware 
import { registerUser, handleLogin } from '../controllers/auth_controllers.js';

const router = express.Router();

// ROUTES //
    
        // route to create a new 'user' entry in user mongoDB collection  
        router.post('/register', registerUser)

        //  route to log a user in (give them a token)
        router.post('/login', handleLogin)



 // export the router 
export default router 
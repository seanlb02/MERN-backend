
import express from 'express';

// import controllers/middleware 
import { registerUser, handleLogin } from '../controllers/auth_controllers.js';

const router = express.Router();

// ROUTES //
    
        // route to create a new 'user' entry in user mongoDB collection  
        router.post('/register', registerUser)

        //  route to log a user in (give them a token)
        router.post('/auth/login', async (req, res) => {
            try {
                // this function/controller will return an access token (JWT)
                handleLogin();
            }
            catch (err) {
                // since the controller handles its own errors, the final error caught means an error in the app
                res.status(500).send({'error' : 'Server error'})
            }
            
        })



        // export the router 
        export default router 
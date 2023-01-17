import { Express } from "express";
import { UsersModel } from "../models/Users_model"

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



// All functions that are nested in auth routes go in this file 

        // this function/middleware is responsible for creating a new user document 
        const registerUser = async (req, res, next) => {
            //1. deconstruct/extract variables from the request body sent by client 
            const { user, pwd, email } = req.body;
            //2. if client app does not send data in the request body then return an error message:
            if (!user || !pwd || !email) return res.staus(400).json({'message': 'All fields are required'})
            //3. encrypt and salt the incoming password
            const encryptedPassword = await bcrypt.hash(pwd, salt);
            //4. create the new user document (with password encrypted)
            try {
                UsersModel.create({username: `${user}`, password: `${encryptedPassword}}`, email: `${email}`})
                return res.send(200, {'success': 'new user created'});
            } 
            catch (error) {
                // if we get a mongoosee verification error (since we set username to unique) send it to client:
                console.log(JSON.stringify(error));
                if(error.code === 11000){
                    return res.send({status:'error',error:'username already exists'})
                }
            }
        }


        // this function/middleware takes a request body and cross-checks it with the database, then returns a token if exits 
        const handleLogin = async (req, res, next) => {
            // the route this function belongs to will require {username: username, password: password} from the client 
            // deconstruct/extract data from request body sent by client 
            const { user, pwd } = req.body;
            // if client app does not send data in the request body then return an error message:
            if (!user || !pwd) return res.staus(400).json({'message': 'Username and password must be provided'})
            // build a select statement to query mongoDB User collection for the entered username
            const foundUsername = UsersModel.find({username: `${user}`})
            // if username does not exist in database, then return a no-data error message:
            if (!foundUsername) return res.staus(400).json({'message': 'Username or password is invalid'})
            // if userame exists in system, then check the password against the stored encrypted password
            const match = await bcrypt.compare(pwd, foundUsername.password);
            // if the state of match is 'true':
            if (match) {
                // create a JWT for user that expires in 24 hrs (requiring a re-log in)
                const accessToken = jwt.sign(
                    foundUsername.username,
                    process.env.TOKEN_SECRET,
                    '1d' 
                );
                // return the token to the client:
                res.json({ 'token' : accessToken})
            } else {
                // return error saying no data found 
                return res.staus(400).json({'message': 'Username or password is invalid'})
            }


        }

export  {
    registerUser,
    handleLogin
}
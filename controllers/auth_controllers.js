import express from "express";
import  UsersModel  from "../models/Users_model.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"


        //middleware is responsible for creating a new user document 
        const registerUser = async (req, res, next) => {
            //1. deconstruct the request body sent by client 
            const { email, user, pwd, age } = req.body;
            //2. if client app does not send data in the request body then return an error message:
            if (!email || !user || !pwd || !age) return res.status(400).json({'error': 'All fields are required'})
            //3. encrypt and salt the incoming password
            const encryptedPassword =  bcrypt.hash(pwd, 10);
            //4. create the new user document (with password hashed/salted)
            try {
                await UsersModel.create({email: `${email}`, username: `${user}`, password: `${encryptedPassword}}`, age: `${age}`})
                res.send({'success': 'new user created'})
                next();
                } 
            catch (error) {
                return res.send( {'error': error.message });
                next();
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
                return res.status(400).json({'message': 'Username or password is invalid'})
            }


        }

export  {
    registerUser,
    handleLogin
}
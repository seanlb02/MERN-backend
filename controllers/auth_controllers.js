import express from "express";
import  UsersModel  from "../models/Users_model.js"

import bcrypt from "bcryptjs"
const saltRounds = 10
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"


        //middleware is responsible for creating a new user document 
        const registerUser = async (req, res, next) => {
            //1. deconstruct the request body sent by client 
            const { email, user, pwd, age } = req.body;
            //2. if client app does not send data in the request body then return an error message:
            if (!email || !user || !pwd || !age) return res.status(400).json({'error': 'All fields are required'})
            // generate salt

            //3. encrypt and salt the incoming password
             
            //4. create the new user document (with password hashed/salted)
            try {
                bcrypt.hash(pwd, saltRounds, async function (err, hash){
                   await UsersModel.create({email: `${email}`, username: `${user}`, password: hash, age: `${age}`})
                })
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
            const { usr, pwd } = req.body;
            // if client app does not send data in the request body then return an error message:
            if (!usr || !pwd) return res.send({'message': 'Username and password must be provided'})
            // build a select statement to query mongoDB User collection for the entered username
            const foundUsername = await UsersModel.find({username: `${usr}`})
            // if username does not exist in database, then return a no-data error message:
            if (!foundUsername){
                 return res.status(400).res.send({'message': 'Username or password is invalid'})
            }
            // if userame exists in system, then check the password against the stored encrypted password
            const hashedpass = foundUsername[0].password
            const match = await bcrypt.compare(pwd, hashedpass);
            // if the state of match is 'true': 
            try{
            if (match) {
                // create a JWT for user that expires in 24 hrs (requiring a re-log in)
                function getAccessToken(username){ 
                    return jwt.sign(username,'secret', {expiresIn:'1d'})
                };
                const accessToken = getAccessToken({username: usr})
                // return the token to the client:
                res.send({ 'token' : accessToken})
                next();
            } else {
                // return error saying no data found if passwords dont match 
                return res.status(400).json({'message': 'Username or password is invalid'})
                next();
            }
        }
            catch (error) {
                return res.send( {'error': error.message });
                next();
                }
        }

export  {
    registerUser,
    handleLogin
}
import express from "express";
import  UsersModel  from "../models/Users_model.js"
import uniqueValidator from "mongoose-unique-validator"


// all middleware functions to handle 'users' resources 


// function to get all a specific users data (for profile rendering) 

    const getUserData = async function(req, res, next) {
        // note: the req.params are set by the JWT authenticator middleware! and not in the route URL
        const {username} = req.params
        const userData = await UsersModel.find({username:username}).select('-_id -__v -password')
        res.send(userData)

    }

    export {
        getUserData,
    }


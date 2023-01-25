import express from "express";
import  UsersModel  from "../models/Users_model.js"
import uniqueValidator from "mongoose-unique-validator"


// all middleware functions to handle 'users' resources 


    // middleware function to get all a specific users data (for profile rendering) 

    const getUserData = async function(req, res, next) {
        // note: the req.params are set by the JWT authenticator middleware! and not in the route URL
        const {username} = req.params
        const userData = await UsersModel.find({username:username}).select('-_id -__v -password')
        res.send(userData)
    }

    // middleware function get all user data (admins only)
    const getAllUsers = async function(req, res, next) {
        const users = await UsersModel.find().select('-__v -password')
        res.send(users)
        next();
    }

    //  function for user to update their memo 
    const updateMemo = async function(req, res, next) {
        const {username} = req.params 
        const {memo} = req.body
        
        const filter = { username: username };
        const update = { memo: memo };
        const newMemo = await UsersModel.findOneAndUpdate(filter, update)
        res.send({'success': 'memo updated successfully'})
    }


    export {
        getUserData,
        getAllUsers,
        updateMemo
    }


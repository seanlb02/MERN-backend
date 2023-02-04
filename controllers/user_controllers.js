import express from "express";
import  UsersModel  from "../models/Users_model.js"
import EntriesModel from "../models/Entries_model.js";
import ScoresModel from "../models/Score_model.js";
import uniqueValidator from "mongoose-unique-validator"


// all middleware functions to handle 'users' resources 


    // middleware function to get all a specific users data (for profile rendering) 

    const getUserData = async function(req, res, next) {
        // note: the req.params are set by the JWT authenticator middleware! and not in the route URL
        const {username} = req.params.username
        const userData = await UsersModel.find({username:username}).select('-_id -__v -password -trackers -tracking -email')
        res.send(userData)
        next();
    }

    // middleware function get all user data (admins only)
    const getAllUsers = async function(req, res, next) {
        const users = await UsersModel.find().select('-__v -password')
        res.send(users)
        next();
    }

    //  function for user to update their memo 
    const updateMemo = async function(req, res, next) {
        const {username} = req.params.username 
        const {memo} = req.body
        
        const filter = { username: username };
        try {
        const update = { memo: memo };
        const newMemo = await UsersModel.findOneAndUpdate(filter, update)
        res.send({'success': 'memo updated successfully'})
        next();
        }
        catch (err) {
            res.send({'error': err.message})
        }

    }
// middleware for an admin to delete a specified user (admin protected route)
    const deleteUser = async function(req, res, next) {
        const {username} = req.params.user
        try {
        // delete the user, their entries, their scores 
        const remove = await UsersModel.deleteOne({username: username})
        const removeEntries = await EntriesModel.deleteMany({username: username})
        const removeScores = await ScoresModel.deleteMany({username: username})
        res.send({success: "user deleted from database"})
        next()
        } 
        catch (err) {
            res.send({'error': err.message})
        }
    }

    // function for user to delete their account 
    const deleteSelf = async function(req, res, next) {
        const {username} = req.params.username
        try {
        // delete the user, their entries, their scores 
        const remove = await UsersModel.deleteOne({username: username})
        const removeEntries = await EntriesModel.deleteMany({username: username})
        const removeScores = await ScoresModel.deleteMany({username: username})
        res.send("account successfully deleted")
        next()
        } 
        catch (err) {
            res.send({'error': err.message})
        }
    }

    // function to search usernames in the database - returns a simple string username if exists
    const searchUsernames = async function(req, res, next) {
        
        const user = req.params.user
        try {
            const result = await UsersModel.find({username:user}, 'username').select('-_id')
            if(result.length > 0) {
                res.send(result)
                next();
            }
            else {
                res.status(400).send({'error': 'user not found'});
                next();
            }
        }
        catch (err) {
            res.send({'error': err.message})
            next();
        }
    }

    


    export {
        getUserData,
        getAllUsers,
        updateMemo,
        deleteSelf,
        searchUsernames,
        deleteUser
    }


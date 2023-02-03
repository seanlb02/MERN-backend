import express from "express";
import  UsersModel  from "../models/Users_model.js"



    // function to facilitiate 'authorisiating' a user to follow their summary page 
    //  take client input as a username and 'insert/push' it into the logged in user's trackers field, THEN insert the logged in user to the trackers 'tracking' field
        const authoriseTracker = async function(req, res, next) {
            const {username} = req.params.username;
            const {tracker} = req.params.tracker;
            const currentUser = {user: `${username}`}
            const chosenUser = {user: `${req.params.tracker}`}
            try{
                // check to see if tracker even exists
                const exists = await UsersModel.find({username: req.params.tracker}, 'username')
                
                if(exists.length < 1){res.status(404).send({'error': 'User does not exist'})}
                // first check if the user is already being tracked by requested tracker 
                const match = await UsersModel.find({username: `${username}`, trackers:{user: `${req.params.tracker}` }}, 'trackers')
                const trackerArr = match.trackers
                if(match.length > 0) 
                    {res.status(404).send({error: "user is already being tracked by requested tracker"})
                
                }
                if (exists.length > 0 && match.length < 1) {
                    // add username to logged in user's trackers field
                    await UsersModel.findOneAndUpdate({username: `${username}`}, { $push: {trackers: chosenUser}})
                    // then add logged in user to username's tracking field
                    await UsersModel.findOneAndUpdate({username: `${req.params.tracker}`}, { $push: {tracking: currentUser}})
                    res.send(exists)
            
                }
                next()
            }
            catch (err) {
                return res.send( {'error': err.message });
            }
        }


    // function to delete a user from their tracker field (REVOKING ACCESS)
        const revokeAccess = async function (req, res, next) {
            const {username} = req.params.username

            try {
                await UsersModel.updateOne({username: username}, {$pullAll: {trackers:[{user: `${req.params.user}`}] }})
                await UsersModel.updateOne({username: req.params.user}, {$pullAll: {tracking:[{user: `${username}`}]}})
                res.send(`access revoked for ${req.params.user}`)
                next();
            }
            catch (err) {
                res.send({"error": err.message})
            }

        }



    // function to retrieve list of users a logged in user can VIEW (i.e. their tracking field...)
        const getTrackers = async function(req, res, next) {
            const {username} = req.params.username;
            try {
                const trackers = await UsersModel.find({username: username}, 'trackers')
                res.send(trackers)
                next();
            }
            catch (err) {
                return res.send({'error': err.message});
                next();
            }
        }


    // function to retrieve list of users that are TRACKING their summary (i.e their tracker field..)
        const getTracking = async function(req, res, next) {
            const {username} = req.params.username;
            try {
                const trackingList = await UsersModel.find({username: username}, 'tracking')
                res.send(trackingList)
                next();
            }
            catch (err) {
                return res.send({'error': err.message});
                next();
            }
        }

       const validateTracker = async function(req, res, next) {

            const {username} = req.params.username;
            const {tracked} = req.params.tracked;
            try {
                const result = await UsersModel.find({username: username, tracking: {user: req.params.tracked}}, 'tracking')
                res.send(result)
            }
            catch (err) {
                return res.send({'error': err.message});
            }

       }



    export {
        authoriseTracker,
        revokeAccess, 
        getTrackers,
        getTracking,
        validateTracker
    }
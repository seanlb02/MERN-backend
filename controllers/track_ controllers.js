
import express from "express";
import  UsersModel  from "../models/Users_model.js"





    // function to facilitiate 'authorisiating' a user to follow their summary page 

    //  take client input as a username and 'insert/push' it into the logged in user's trackers field, THEN insert the logged in user to the trackers 'tracking' field
        const authoriseTracker = async function(req, res, next) {
            const {username} = req.params.username;
            const {tracker} = req.params.tracker;

            try{
                // add username to logged in user's trackers field
                await UsersModel.findOneAndUpdate({username: `${username}`}, { $push: {trackers: `${tracker}`}})
                // then add logged in user to username's tracking field
                await UsersModel.findOneAndUpdate({username: `${tracker}`}, { $push: {tracking: `${username}`}})
                res.send({'success': 'score added'})
                next();
            }
            catch (err) {
                return res.send( {'error': error.message });
                next();
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


    // function to delete a user from their tracker field (REVOKING ACCESS)
    // 1. username is taken from rendering the list (inserted into the <link> tag which triggers the 'fetch' on client side)



    export {
    authoriseTracker,

    }
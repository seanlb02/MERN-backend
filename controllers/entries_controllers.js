import express from "express";
import  EntriesModel  from "../models/Entries_model.js"


// middleware function to return logged in user's entries in order of latest to oldest
const getUserEntries = async function (req, res, next) {
        const {username} = req.params.username
        const allEntries = await EntriesModel.find({username : username}).sort({timestamp: -1})
        res.send(allEntries)
        next();
    }

// middleware function to post a new entry to the database
    const postEntry = async function (req, res, next) {
    const {username} = req.params.username
    const {timestamp, title, text, tags} = req.body 
    const tagItems = [...tags]
    //If client app does not send data in the request body then return an error message:
    if (!username || !timestamp || !title || !text || !tags) return res.status(400).json({'error': 'All fields are required'})
    try{
        await EntriesModel.create({username: `${username}`, timestamp: `${timestamp}`, title: `${title}`, text: `${text}`, tags: tags})
        res.send({'success': 'entry added'})
        next();
    }
    catch (error) {
        return res.send( {'error': error.message });
        next();
    }
    }

    // get a list of entry tags from the CURRENT date 
    const getDailyTag = async function (req, res, next) {
        // generate const of the current date when the route was hit 
        const todaysDate = new Date();
        const {username} = req.params.username;
        try {
            const tag = await EntriesModel.find({username: username, timestamp: {$gt: todaysDate}}, 'tags timestamp').select('-_id')
            res.send(tag);
            next();
        }
        catch (err) {
            res.send({'error': err.message});
            next();
        }
    }

    // get a list of entry tags from the PAST 30 days from current date 
    const getMonthsTags = async function (req, res, next) {
        // generate current date and the date 30 days prior 
            const {username} = req.params.username;
            const currentDate = new Date();
            const past30 = currentDate.setDate(currentDate.getDate() - 30);
            try {
                const monthsTags = await EntriesModel.find({username: username, timestamp: {$gt: past30}}, 'tags timestamp').sort({timestamp: -1}).select('-_id')
                res.send(monthsTags);
                next();
            }
            catch (err) {
                res.send({'error': err.message});
                next();
            }
    }

    // // middleware to edit a logged-in user's post 
    // const editEntry = async function (req, res, next) {


    // }

export {
    getUserEntries,
    postEntry,
    getDailyTag,
    getMonthsTags
}
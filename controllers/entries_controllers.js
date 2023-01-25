import express from "express";
import  EntriesModel  from "../models/Entries_model.js"


// middleware function to return logged in user's entries in order of latest to oldest
const getUserEntries = async function (req, res, next) {
        const {username} = req.params
        const allEntries = await EntriesModel.find({username : username}).sort({timestamp: -1})
        res.send(allEntries)
        next();
    }

// middleware function to post a new entry to the database
    const postEntry = async function (req, res, next) {
    const {username} = req.params
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


export {
    getUserEntries,
    postEntry,
}
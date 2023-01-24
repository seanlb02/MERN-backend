import express from "express";
import  ScoresModel  from "../models/Score_model.js"
import uniqueValidator from "mongoose-unique-validator"


// middleware function to add the latest questionnaire score to the database

const newScore = async (req, res, next) => {
    //1. deconstruct the request body sent by client 
    const { username, timestamp, score } = req.body;
    //2. if client app does not send data in the request body then return an error message:
    if (!username || !timestamp || !score) return res.status(400).json({'error': 'All fields are required'})
    //3. create new score document for the logged in user  
    try{
        await ScoresModel.create({username: `${username}`, timestamp: `${timestamp}`, score: `${score}`})
        res.send({'success': 'score added'})
        next();
    }
    catch (error) {
        return res.send( {'error': error.message });
        next();
    }
}

// middleware function to retrieve the latest questionnaire stored

const getLastScore = async (req, res, next) => {
    //1. deconstruct the username param sent by client within url 
    const {username} = req.params
    try{
        const currentScore = await ScoresModel.findOne({username: username}, 'score').sort({timestamp: -1})
        res.send({ 'current_user_score': currentScore });
        next();
    }
    catch (error){
        res.send({ 'error': error.message });
        next();
    }
    
    

}
// middleware function to retrieve the all questionnaire scores recorded 

const getAllScores = async (req, res, next) => {


}


export  {
    newScore,
    getLastScore,
    getAllScores,
}

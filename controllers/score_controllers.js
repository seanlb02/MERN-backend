import express from "express";
import  ScoresModel  from "../models/Score_model.js"
import uniqueValidator from "mongoose-unique-validator"
import UsersModel from "../models/Users_model.js";



// middleware function to add the latest questionnaire score to the database

const newScore = async (req, res, next) => {
    const {username} = req.params.username
    //1. deconstruct the request body sent by client 
    const {timestamp, score } = req.body;
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
    const {username} = req.params.username
    try{
        const currentScore = await ScoresModel.findOne({username: username}, 'score').sort({timestamp: -1}).select('-_id')
        res.send({ 'current_user_score': currentScore });
        next();
    }
    catch (error){
        res.send({ 'error': error.message });
    }
    
    

}

const getLastUserScore = async (req, res, next) => { 
    const {username} = req.params.username
    const {tracked} = req.params.tracked
    const connected = await UsersModel.find({username: username, tracking: {user:`${req.params.tracked}`}})
    res.send(connected)

}




const getAllScores = async (req, res, next) => {
        //1. deconstruct the username param sent by client within url 
        const {username} = req.params.username
        try{
            const allScores = await ScoresModel.find({username: username}, 'score timestamp').sort({timestamp: -1})
            res.send({ 'User_scores': allScores });
            next();
        }
        catch (error){
            res.send({ 'error': error.message });
            next();
        }

}

    // middleware to get a list of scores from the PAST 30 days from current date 
    const getMonthsScores = async function (req, res, next) {
        // generate current date and the date 30 day prior 
            const {username} = req.params.username;
            const currentDate = new Date();
            const past30 = currentDate.setDate(currentDate.getDate() - 30);
            try {
                const monthsScores = await ScoresModel.find({username: username, timestamp: {$gt: past30}}, 'timestamp score').sort({timestamp: -1}).select('-_id')
                res.send(monthsScores);
                next();
            }
            catch (err) {
                res.send({'error': err.message});
                next();
            }
    }


export  {
    newScore,
    getLastScore,
    getAllScores,
    getMonthsScores,
    getLastUserScore
}

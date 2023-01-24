import express from "express";
import  ScoresModel  from "../models/Score_model.js"
import uniqueValidator from "mongoose-unique-validator"


// middleware function to add the latest questionnaire score to the database

const newScore = async (req, res, next) => {


}

// middleware function to retrieve the latest questionnaire stored

const getLastScore = async (req, res, next) => {


}
// middleware function to retrieve the all questionnaire scores recorded 

const getAllScores = async (req, res, next) => {


}


export  {
    newScore,
    getLastScore,
    getAllScores,
}

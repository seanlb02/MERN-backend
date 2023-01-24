import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'


// this file is for creating the Score model and schema

// define the schema 
const scoreSchema = new mongoose.Schema({
    username: { type: String, required: true},
    timestamp: {type: Date, required: true},
    score: {type: Number, required: true}
})

// Create Scores model
const ScoresModel = mongoose.model("score", scoreSchema)

// Apply the uniqueValidator plugin to scoreSchema.
scoreSchema.plugin(uniqueValidator);

export default ScoresModel
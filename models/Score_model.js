import { mongoose } from "mongoose";

// this file is for creating the Score model and schema

// define the schema 
const scoreSchema = new mongoose.Schema({
    username: { type: String, required: true},
    timestamp: {type: Date, required: true},
    score: {type: Number, required: true}
})

const ScoresModel = mongoose.model("score", scoreSchema)

export default ScoresModel
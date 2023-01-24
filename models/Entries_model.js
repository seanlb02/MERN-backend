import { mongoose } from "mongoose";

// this file is for creating the Entries model and schema

// define the schema 
const entriesSchema = new mongoose.Schema({
    username: { type: String, required: true},
    timestamp: {type: Date, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: Array, "default": [], "required": true},
})

const EntriesModel = mongoose.model("entry", entriesSchema)

export default EntriesModel 
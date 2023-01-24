import { mongoose } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

// this file is for creating the Users model and schema --> the Users "collection" in db

// define the schema 
const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    age: {type: Date, required: true}, // defulat format for date is: 'YYYY-MM-DD'
    // for the usernames that have access to this users summary
    trackers: {type: Array, "default" : [], required: false},
    // for the users who's summary this user can access
    tracking: {type: Array, "default" : [], required: false},
    is_admin: {type: Boolean, required: false, default: false}
},
{ strict: 'throw' }
)

// define the model using the usersSchema template 
const UsersModel = mongoose.model("user", usersSchema); 

// Apply the uniqueValidator plugin to userSchema.
usersSchema.plugin(uniqueValidator);

export default UsersModel
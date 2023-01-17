import { mongoose } from "mongoose";

// this file is for creating the Users model and schema --> the Users "collection" in db

// define the schema 
const usersSchema = new mongoose.Schema({
    // Each user entry has 5 fields (username, password, keyholders, keys_held and is_admin)
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    // for the usernames that have access to this users calendar
    keyholders: {type: Array, "default" : [], required: false},
    // for the users who's caldendar this user can access
    keys_held: {type: Array, "default" : [], required: false},
    is_admin: {type: Boolean, required: false, default: false}
})

// define the model using the usersSchema template 
const Users = mongoose.model("Users", usersSchema); 

export default UsersModel
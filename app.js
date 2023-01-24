import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser'

// import routes 
import authRoutes from './routes/auth_routes.js'
import scoresRoutes from './routes/scores.js'



// by configuring/initalising the dotenv file, we can use process.env method to interpolate the db URL string 
dotenv.config()

// Config token secret
process.env.TOKEN_SECRET;

const app = express();
const port = 4003

// this middleware will take any json response from an express app route and parse it to a js object
app.use(express.json())

// enable cors
app.use(cors())

// enable bodyParser
app.use(bodyParser.json())

mongoose.set('strictQuery', true)

// connect mongoose to the database 
mongoose.connect(process.env.ATLAS_DB_URL)
.then((m) => console.log(m.connection.readyState === 1 ? 'Mongoose connected!' : 'Failed to connect'))
.catch((err) => console.log(err))

// set up the relative links for the Routes
app.use('/auth', authRoutes)
app.use('/scores/', scoresRoutes)

// tell express server to run on port 4001 (for development only)
app.listen(port, () => console.log(`Server listening on port ${port}`))
import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from 'body-parser'

// import routes 
import authRoutes from './routes/auth_routes.js'
import scoresRoutes from './routes/score_routes.js'
import userRoutes from './routes/user_routes.js'
import entriesRoutes from './routes/entries_routes.js'
import trackRoutes from './routes/track_routes.js'



// by configuring/initalising the dotenv file, we can use process.env method to interpolate the db URL string 
dotenv.config()

// Config token secret
process.env.TOKEN_SECRET;

const app = express();
const port = 4004

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
app.use('/scores', scoresRoutes)
app.use('/users', userRoutes)
app.use('/entries', entriesRoutes)
app.use('/track', trackRoutes)

// tell express server to run on port 4001 (for development only)
app.listen(port, () => console.log(`Server listening on port ${port}`))
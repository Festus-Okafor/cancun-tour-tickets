//import react from 'react'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'
import bodyParser from 'body-parser'
import router from './routes/userRoutes.js'
//import userRouter from './routes/userRoutes.js'
//const userRouter = require('./routes/route_users.js')




const app = express()
router.use(express.json());
  
//middleware configuration
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
const port = process.env.PORT  

//database connection
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongoDB connected`)
   

app.use("/api/registerUser", router);
app.use("/api/loginUser", router);
app.use("/api/getUser", router);
app.use("/api/updateUser", router);
app.use("/api/deleteUser", router);


app.listen(port, ()=>{
    console.log('app is listening on port:', port)
    connectDb()
})

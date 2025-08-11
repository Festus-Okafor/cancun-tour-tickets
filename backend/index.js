import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'
import routeUsers from './routes/route_users.js'
import bodyParser from 'body-parser'
//import routeLogin from './routes/route_login.js'


const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
const port = process.env.PORT  
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongoDB connected`)
   

app.use("/users", routeUsers)


app.listen(port, ()=>{
    console.log('app is listening on port:', port)
    connectDb()
})

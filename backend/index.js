import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'



const app = express()
const port = process.env.PORT  
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongoDB connected`)
   

app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.send('trial working')
})

app.listen(port, ()=>{
    console.log('app is listening on port:', port)
})
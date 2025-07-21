import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'
import users from './models/users.js'

const app = express()
const port = process.env.PORT  
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongoDB connected`)
   

app.use(express.json())
app.use(cors())

app.get('/users', async (req, res) =>{
  try{
       const users = users.find({})
        res.status(200).json(users)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
     }
   // res.json('trial working')
})


app.post("/users", async(req, res) => {
      try{
    const users = await users.create(req.body)
    res.status(200).json(users)
      } catch(error){
        res.status(400).json(error)
      }
})


app.listen(port, ()=>{
    console.log('app is listening on port:', port)
    connectDb()
})
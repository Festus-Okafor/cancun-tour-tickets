import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './db.js'
import Users from './models/users.js'

const app = express()
const port = process.env.PORT  
await mongoose.connect(process.env.MONGO_URL)
console.log(`mongoDB connected`)
   

app.use(express.json())
app.use(cors())

app.get('/users', async (req, res) =>{
  try{
       const users = await Users.find({})
       console.log(users)
        res.status(200).json(users)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
     }
   // res.json('trial working')
})

//
app.post('/users', async(req, res) => {
      try{
    const users = await Users.create(req.body)
    res.status(200).json(users)
      } catch(error){
        res.status(400).json(error)
      }
})

app.delete('/users/:id', async (req, res) =>{
    try{
        console.log("DELETE/users/:id")
        const response = await Users.findByIdAndDelete(req.params.id)
        console.log(response)
    }
    catch (error){
        console.log(error)
        res.status(400).json(error)
    }
})
//posting user input from the frontend
app.put('/users/:id',  async(req, res) => {
    try{
         console.log('PUT/users/:id')
         const users = await Users.findById(req.params.id)
         await users.save()
         console.log(users)

         }catch (error){
            console.log(error)
            res.json(error)
         }
         
})


app.listen(port, ()=>{
    console.log('app is listening on port:', port)
    connectDb()
})
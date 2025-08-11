import express from 'express'
import Users from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//import cookieParser from 'cookie-parser'




const routeUsers = express.Router()
routeUsers.use(express.json())





// now designing your crud operations
//get operation
routeUsers.get('/', async (req, res) =>{
  try{
       const users = await Users.find({})
       //console.log(users)
        res.status(200).json(users)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
     }
   // res.json('trial working')
})


//post operation
routeUsers.post('/', async(req, res) => {
   const {name, email, password} = req.body;
   const users = await Users.findOne({email})
   if (users){
    return res.json({message: "user already exist!"})
   }

   const hashpassword = await bcrypt.hash(password, 10)
   const newUser = new Users({
    name,
    email,
    password: hashpassword,
   })
           await newUser.save()

           return res.json({message: "record registered"})
})

//patching/put usersinputs
routeUsers.patch('/:id',  async(req, res) => {
    try{

        let {id} = req.params
        const {name, email} = req.body
         //console.log('/:id')
         const users = await Users.findByIdAndUpdate(id, {name, email})
         await users.save()
         //console.log(users)
         return res.json({message: "user information updated successfully"})

    }catch (error){
            console.log("error pls check")
            res.json(error)
         }
         
})

//delete operation
routeUsers.delete('/:id', async (req, res) =>{

    try{
        let {id} = req.params
        //console.log("/:id")
        const response = await Users.findByIdAndDelete(id)
         return res.status(201).json({ message: 'user deleted successfully', response})

       // console.log(response)
    }
    catch (error){
        console.log(error)
        res.status(400).json(error)
    }
})



/*
routeUsers.post('/loginAuth', async(req, res) =>{
    const {email, password} = req.body;

  //below we querry the database to check if the inputted existed.
  const users = await Users.findOne({email})
  if(users){
    //if user does not exist, we display the below string
    return res.status(200).json({message: "Email exist"})
  }
  else{
   return res.status(401).json({message: "Invalid Email"})

  }
   // if the customer or user exist, we compare with the hashed password
  const validPassword = await bcrypt.compare(password, Users.password)
  if(validPassword){
     
  const token =jwt.sign({email:users.email}, process.env.KEY, {expireIn: '1h'})
  res.cookie('token', token, {httpOnly: true, maxAge: 365000})
  return res.json({status: true, message: "Login successful"})
}})
    return res.json({message: "password is incorrect"})
  
  
})
*/





export default routeUsers
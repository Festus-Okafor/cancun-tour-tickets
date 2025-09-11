
import Users from "../models/users.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
//import cookieParser from 'cookie-parser'


// now designing your crud operations
//get operation
export const getUser = async function (req, res){
  try {
    const users = await Users.find({});
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  // res.json('trial working')
};

//Reister user to database
export const registerUser = async function (req, res){
  try {
    const { name, email, password } = req.body;

    // check if user already exist
    const existinguser = await Users.findOne({email});
    if (existinguser) {
      return res.json({ message: "email already registered!" });
    }
    

    //hash password before saving to database
    const hashpassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new Users({
      name,
      email,
      password: hashpassword
    });
   
    await newUser.save();
    return res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "error registering user" });
    console.log(error);
  }
};
  
//LOGIN USER
export const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Query the database to check if the user exists or find user by email
    const alreadyuser = await Users.findOne({email});
    if (!alreadyuser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, alreadyuser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: alreadyuser._id, email: alreadyuser.email, role: alreadyuser.role }, process.env.KEY, {expiresIn: "1h"}
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 1 }); // Set cookie with token
    return res.json({ status: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "error logging in user" });
  }
};

//patching/put usersinputs
export const updateUser = async function (req, res) {
  try {
    let { id } = req.params;
    const { name, email } = req.body;
    //console.log('/:id')
    const users = await Users.findByIdAndUpdate(id, { name, email });
    await users.save();
    //console.log(users)
    return res.json({ message: "user information updated successfully" });
  } catch (error) {
    console.log("error pls check");
    res.json(error);
  }
};

//delete operation
export const deleteUser = async function (req, res) {
  try {
    let {id} = req.params;
    //console.log("/:id")
    const response = await Users.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ message: "user deleted successfully", response });

    // console.log(response)
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
}};






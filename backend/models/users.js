import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: Number},
    
})

const Users = mongoose.model('users', usersSchema)
export default Users
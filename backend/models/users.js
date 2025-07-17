import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: Number},
    age: {type: Number},
    gender: {type: String}
})

const users = mongoose.model('users', usersSchema)
export default users
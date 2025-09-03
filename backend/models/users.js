
import mongoose from 'mongoose'
const schema = mongoose.Schema;
const usersSchema = new schema({

    name: {
        type: String
    },

    email: {
        type: String ,
         required: true,
         unique: true
        },
    password: {
        type: String ,
        required: true
        },
},
   {timestamps: true});


const Users = mongoose.model('Users', usersSchema)
export default Users
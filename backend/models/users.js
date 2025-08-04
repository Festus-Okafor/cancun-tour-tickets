
import mongoose from 'mongoose'
const schema = mongoose.Schema;
const usersSchema = new schema({

    name: {
        type: String
    },

    email: {
        type: String ,
         required: true
        },
    password: {
        type: String ,
        },
},
   {timestamps: true});


const Users = mongoose.model('Users', usersSchema)
export default Users
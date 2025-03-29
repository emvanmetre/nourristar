import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  { collection: 'Users' },
)

const Users = mongoose.model('Users', userSchema)
export default Users

import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  { collection: 'Users' },
)

// TODO: add recipe title to recipe schema
const recipeSchema = new Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    text: { type: String },
    dateTime: { type: Date, default: Date.now },
    tags: { type: String },
    pictureURL: { type: String },
    title: { type: String },
    content: { type: String, required: true },
  },
  { collection: 'Recipes' },
)

const Recipes = mongoose.model('Recipes', recipeSchema)
const Users = mongoose.model('Users', userSchema)
export { Recipes, Users }

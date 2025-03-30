//schemas.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

// )
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // COMMENT THE BELOW CODE BACK IN TO HASH THE PASSWORD
}, { collection: 'Users'});

// with hashed password
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });




// saved recipe
const savedRecipeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  rating: { type: Number, min: 1, max: 5 }, // Rating 1-5
}, { collection: 'SavedRecipes'});

// TODO: add recipe title to recipe schema
const recipeSchema = new Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    text: { type: String },
    dateTime: { type: Date, default: Date.now },
    tags: { type: String },
    pictureURL: { type: String },
    title: { type: String },
  },
  { collection: 'Recipes' },
)

const Recipes = mongoose.model('Recipes', recipeSchema)
const Users = mongoose.model('Users', userSchema)
export { Recipes, Users }

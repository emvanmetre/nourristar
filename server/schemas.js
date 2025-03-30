//schemas.js
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully")
})


// users
// const userSchema = new Schema(
//   {
//     username: { type: String },
//     password: { type: String },
//   },
//   { collection: 'Users' },
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


// recipe
const recipeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  picture: { type: String }, // URL to image
}, { collection: 'Recipes', timestamps: true});

// saved recipe
const savedRecipeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  rating: { type: Number, min: 1, max: 5 }, // Rating 1-5
}, { collection: 'SavedRecipes'});

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);

export { User, Recipe, SavedRecipe };
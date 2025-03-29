import mongoose from "mongoose";

const Schema = mongoose.Schema;

const savedRecipeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
  rating: { type: Number, min: 1, max: 5 }, // Rating 1-5
}, { collection: "SavedRecipes", timestamps: true });

const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);
export default SavedRecipe;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }], 
  picture: { type: String }, // URL to an image
}, { collection: "Recipes" });

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;

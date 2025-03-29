import express from "express";
import SavedRecipe from "../models/SavedRecipe.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save Recipe
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { mealId, rating } = req.body;
    const newSavedRecipe = new SavedRecipe({ userId: req.user.userId, mealId, rating });
    await newSavedRecipe.save();

    res.status(201).json({ message: "Recipe saved", savedRecipe: newSavedRecipe });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Saved Recipes
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({ userId: req.user.userId }).populate("mealId");
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

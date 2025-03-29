import express from "express";
import Recipe from "../models/Recipe.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Recipe
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { text, tags, picture } = req.body;
    const newRecipe = new Recipe({ userId: req.user.userId, text, tags, picture });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Recipes
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("userId", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

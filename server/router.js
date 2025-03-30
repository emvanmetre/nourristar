//router.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Recipe, SavedRecipe } from "./schema.js";
import authMiddleware from "./authMiddleware.js"; 

const router = Router();

router.post('/post', async (req, res) => {
  const { username, password } = req.body
  const userData = { username: username, password: password }
  const newUsers = new User(userData)
  const saveUsers = await newUsers.save()
  if (saveUsers) {
    res.send('Component successfully saved!')
  }
  res.end()
})

router.get('/Nourristar', async (req, res) => {
  const users = await User.find({}, "username").exec();
  res.json(users);
  
  const userData = await users.find({}).exec()
  if (userData) {
    res.send(JSON.stringify(userData))
  }
  res.end()
})

//////////////// login
// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ message: "User already exists, please login" })

    const newUser = new User({ username, password })
    await newUser.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error("Error in /signup route:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Login
// Login or create user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username })

    if (!user) {
      // User does not exist -> create new user
      user = new User({ username, password }) // No hashing for now
      await user.save()
      return res.json({ message: "Account created!", token: "fake-jwt-token" })
    }

    // User exists, check password (ignoring hashing for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    // Successful login
    res.json({ message: "Login successful!", token: "fake-jwt-token" })

  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})



//////////////// recipes
// Add recipe
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { text, tags, picture } = req.body;
    const newRecipe = new Recipe({ userId: req.user.userId, text, tags, picture })
    await newRecipe.save()

    res.status(201).json({ message: "Recipe added", recipe: newRecipe })
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
})

// Get all recipes
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("userId", "username")
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

//////////////// saved recipes
// Save Recipe
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { mealId, rating } = req.body;
    const newSavedRecipe = new SavedRecipe({ userId: req.user.userId, mealId, rating })
    await newSavedRecipe.save();

    res.status(201).json({ message: "Recipe saved", savedRecipe: newSavedRecipe })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Get Saved Recipes
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({ userId: req.user.userId }).populate("mealId")
    res.json(savedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})
export default router

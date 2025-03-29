import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Recipe, SavedRecipe } from "./schema.js";
import authMiddleware from "./authMiddleware.js"; 

const router = Router();

router.post('/post', async (req, res) => {
  const { username, password } = req.body
  const userData = { username: username, password: password }
  const newUsers = new Users(userData)
  const saveUsers = await newUsers.save()
  if (saveUsers) {
    res.send('Component successfully saved!')
  }
  res.end()
})

router.get('/Nourristar', async (req, res) => {
  const users = schemas.Users

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
    if (existingUser) return res.status(400).json({ message: "User already exists" })

    const newUser = new User({ username, password })
    await newUser.save();

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
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

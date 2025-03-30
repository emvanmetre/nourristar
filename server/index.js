import express from 'express'
import cors from 'cors'
// import bodyparser from 'body-parser'
// const router = require('./routes/router')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// const router = express.Router()
import { Users, Recipes } from './schemas.js'

dotenv.config()
const app = express()
const JWT_SECRET = process.env.JWT_SECRET;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
  optionsSuccessSatus: 200,
}

app.use(cors(corsOptions))
//app.use('/', router)

//// zdded
app.post('/signup', async (req, res) => {
const { username, password } = req.body

if (!username || !password) {
  return res.status(400).json({ message: 'Please provide username and password' })
}

try {
  // Check if the user exists already
  const existingUser = await Users.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }
   // Hash the password before saving
   const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = new Users({ username, password: hashedPassword })
   await newUser.save()

   res.status(201).json({ message: 'Signup successful!' })
 } catch (error) {
   console.error('Error during signup:', error)
   res.status(500).json({ message: 'Internal server error' })
 }
})


app.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' })
  }

  try {
    // Find user by username
    const user = await Users.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
   // Generate a token (expires in 1 hour)
   const JWT_SECRET = process.env.JWT_SECRET;
   const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
} catch (error) {
  console.error('Error during login:', error)
  res.status(500).json({ message: 'Internal server error' })
}
})

app.post('/post', async (req, res) => {
  const { username, password } = req.body
  const userData = { username: username, password: password }
  const newUser = new Users(userData)
  const saveUser = await newUser.save()
  if (saveUser) {
    res.send('Users successfully saved!')
  }
  res.end()
})

app.post('/post-recipe', async (req, res) => {
  console.log(req.body)
  const { userid, text, dateTime, tags, pictureURL, title, content } = req.body
  const recipeData = { userid: userid, text: text, dateTime: dateTime, tags: tags, pictureURL: pictureURL, title: title, content: content }
  const newRecipe = new Recipes(recipeData)
  try {
    const saveRecipe = await newRecipe.save()
    res.status(201).send('Recipe successfully saved!')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error saving recipe')
  }
})

app.get('/Nourristar', async (req, res) => {
  // const users = Users

  try {
    const userData = await Users.find({})
    // const userData = await users.find({}).exec()
    res.send(JSON.stringify(userData))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/Nourristar/Recipes/:title', async (req, res) => {
  const recipes = Recipes
  const { title } = req.params
  try {
    const recipeData = await recipes.findOne({ title: title }).exec()
    if (recipeData) {
      // If the recipe is found, return it as a JSON response
      res.json(recipeData)
    } else {
      // If no recipe is found, return a 404 error
      // res.status(404).json({ message: 'Recipe not found' })
      res.send(null)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/Nourristar/Recipes/', async (req, res) => {
  const recipes = Recipes

  try {
    const recipeData = await recipes.find({}).exec()
    console.log(JSON.stringify(recipeData))
    res.send(JSON.stringify(recipeData))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/Nourristar/:id', async (req, res) => {
  // const users = Users
  try {
    const userData = await Users.findById(req.params.id)
    if (!userData) {
      res.status(404).json({ message: 'User not found' })
    } else {
      res.send(JSON.stringify(userData))
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(process.env.ATLAS_URI, dbOptions)
  .then(() => {
    console.log('DB Connected!')
  })
  .catch(err => console.error(err))

const port = 4001
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

mongoose.connection.once('open', async () => {
  console.log('✅ MongoDB connection established')

  try {
    const collections = await mongoose.connection.db.listCollections().toArray()
    // console.log('Collections in DB:', collections)
  } catch (err) {
    console.error('❌ Error listing collections:', err)
  }
  const users = Users
  try {
    const userData = await users.find({}).exec()
    // console.log(userData)
  } catch (err) {
    console.log(err)
  }
})

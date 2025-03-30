import express from 'express'
import cors from 'cors'
// import bodyparser from 'body-parser'
// const router = require('./routes/router')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// const router = express.Router()
import { Users, Recipes } from './schemas.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
  optionsSuccessSatus: 200,
}

app.use(cors(corsOptions))
//app.use('/', router)

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
  const users = Users

  try {
    const userData = await users.find({}).exec()
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
    const recipeData = await Recipes.findOne({ title: title }).exec()
    if (recipeData) {
      // If the recipe is found, return it as a JSON response
      res.json(recipeData)
    } else {
      // If no recipe is found, return a 404 error
      res.status(404).json({ message: 'Recipe not found' })
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
  const users = Users
  try {
    const userData = await users.findById(req.params.id)
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
    console.log('Collections in DB:', collections)
  } catch (err) {
    console.error('❌ Error listing collections:', err)
  }
  const users = Users
  try {
    const userData = await users.find({}).exec()
    console.log(userData)
  } catch (err) {
    console.log(err)
  }
})

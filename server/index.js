import express from 'express'
import cors from 'cors'
// import bodyparser from 'body-parser'
// const router = require('./routes/router')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// const router = express.Router()
import Users from './schemas.js'

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

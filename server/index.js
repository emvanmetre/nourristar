import express from 'express'
import cors from 'cors'
// import bodyparser from 'body-parser'
// const router = require('./routes/router')
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
// const router = express.Router()
import Components from './models/schemas.js'

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
  const { name, html, css, js } = req.body
  const componentData = { name: name, html: html, css: css, js: js }
  const newComponent = new Components(componentData)
  const saveComponent = await newComponent.save()
  if (saveComponent) {
    res.send('Component successfully saved!')
  }
  res.end()
})

app.get('/Nourristar', async (req, res) => {
  const components = Components

  try {
    const componentData = await components.find({}).exec()
    res.send(JSON.stringify(componentData))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/Nourristar/:id', async (req, res) => {
  const components = Components
  try {
    const componentData = await components.findById(req.params.id)
    if (!componentData) {
      res.status(404).json({ message: 'Component not found' })
    } else {
      res.send(JSON.stringify(componentData))
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
  const components = Components
  try {
    const componentData = await components.find({}).exec()
    console.log(componentData)
  } catch (err) {
    console.log(err)
  }
})
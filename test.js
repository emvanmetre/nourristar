import { connect, disconnect } from 'mongoose'
import { User } from './server/schemas.js'

// Connect to MongoDB
connect('mongodb://localhost:27017/nourristar', {
}).then(async () => {
  console.log("Connected to MongoDB")

  // Create a new user
  const newUser = new User({ username: "testuser", password: "testpassword" })

  try {
    const savedUser = await newUser.save()
    console.log("User saved successfully! :", savedUser)
  } catch (error) {
    console.error("Error saving user:", error)
  }

  disconnect()
}).catch(err => console.error("MongoDB connection error:", err))

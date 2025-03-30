import mongoose from "mongoose"
import { User } from "./server/schemas.js" // Adjust the path based on your project structur

mongoose.connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true })

const testDatabase = async () => {
  const users = await User.find() // Query the 'Users' collection
  console.log("Stored users:", users)
  mongoose.connection.close()
}

testDatabase()

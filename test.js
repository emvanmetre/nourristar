import { connect, disconnect } from 'mongoose'
import { User, Recipe } from './server/schemas.js'

// Connect to MongoDB
connect('mongodb://localhost:27017/nourristar')
  .then(async () => {
    console.log("Connected to MongoDB")
    
    // get list of all users (testing persistence)
    try {
      const allUsers = await User.find({})
      console.log("List of all users:", allUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    }

    // create a new user
    ////////////!!! just change the username so it doesnt add duplicates
    const newUser = new User({ username: "testuser1", password: "testpassword" })
    let savedUser;

    try {
      savedUser = await newUser.save()
      console.log("User saved successfully!", savedUser)
    } catch (error) {
      console.error("Error saving user:", error)
      disconnect()
      return
    }

    // new recipe with prev userid
    const newRecipe = new Recipe({
      userId: savedUser._id,
      text: "banana bread",
      tags: ["dessert", "vegetarian"],
      picture: "https://example.com/test-recipe.jpg"
    })

    try {
      const savedRecipe = await newRecipe.save()
      console.log("Recipe saved successfully!", savedRecipe)
    } catch (error) {
      console.error("Error saving recipe:", error)
    }

    disconnect()
  })
  .catch(err => console.error("MongoDB connection error:", err))

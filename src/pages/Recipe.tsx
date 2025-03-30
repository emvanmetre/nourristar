import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Quill from 'quill'

const RecipePage = () => {
  document.body.classList.add('bg-light')
  document.body.classList.remove('bg-image')
  const { title } = useParams() // Get the dynamic 'title' from the URL
  const [recipe, setRecipe] = useState(null)
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && !editorRef.current._quill) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
      })
      editorRef.current._quill = quill // Attach Quill instance to the ref for safety
    }
  }, [])

  useEffect(() => {
    // Make an API call or search your data based on the title
    const fetchRecipe = async () => {
      try {
        // Assuming you have an endpoint like `/api/recipes/:title` to get recipe by title
        const response = await axios.get(`http://localhost:4001/Nourristar/Recipes/${title}`)
        setRecipe(response.data)
      } catch (error) {
        console.error('Error fetching recipe', error)
      }
    }

    if (title) {
      fetchRecipe()
    }
  }, [title]) // Re-fetch if the title changes

  if (!recipe) return <div>Loading...</div>

  return (
    <div>
      <div className="content center gap-none">
        {recipe.pictureURL && <img src={recipe.pictureURL} alt={recipe.title} />}
        <h1>{recipe.title}</h1>
        {/* <p>{recipe.text}</p> */}
        {/* Add more details or content here */}
        <div>
          {/* Add Quill's CSS to style the editor */}
          <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
          {/* Create a div for the Quill editor */}
          <div ref={editorRef} style={{ minHeight: '500px' }}></div>
          {/* Add Quill's JS script */}
          <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
        </div>
      </div>
    </div>
  )
}

export default RecipePage

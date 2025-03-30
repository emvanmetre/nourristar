import React, { useEffect, useState, useRef } from 'react'
import Quill from 'quill'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

type TextEditorProps = {
  id?: string
}

const TextEditor = (props: TextEditorProps) => {
  const editorRef = useRef(null)
  const [postTitle, setPostTitle] = useState('')
  const [jsonContent, setJsonContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'link', 'image'],

    [{ color: [] }, { background: [] }, { script: 'super' }], // dropdown with defaults from theme

    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ['clean'], // remove formatting button
  ]

  useEffect(() => {
    if (editorRef.current && !editorRef.current._quill) {
      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: 'snow',
      })
      editorRef.current._quill = quill // Attach Quill instance to the ref for safety
    }
  }, [])

  // load all the recipes in the beginning
  useEffect(() => {
    let processing = true
    if (props.id) {
      const axiosFetchData = async (processing: boolean) => {
        await axios
          .get(`http://localhost:4001/Nourristar/Recipes/${props.id}`, {
            withCredentials: true, // Required if using credentials
          })
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
      }
      axiosFetchData(processing)
    }
  }, [])

  const handleGetDelta = () => {
    if (editorRef.current) {
      const quill = editorRef.current._quill
      if (quill) {
        // Use the quill instance to get content
        const delta = quill.getContents()
        if (delta) {
          console.log(delta)
          return JSON.stringify(delta)
        }
      }
    }
  }

  const handleGetText = () => {
    if (editorRef.current) {
      const quill = editorRef.current._quill
      if (quill) {
        // Use the quill instance to get content
        const text = quill.getText()
        return text || ''
      }
    }
  }
  const checkRecipeExists = async title => {
    console.log(title)
    try {
      // Assuming you're searching for the recipe by title
      const response = await axios.get(`http://localhost:4001/Nourristar/Recipes/${title}`)
      if (response.data) {
        // Recipe exists, handle accordingly
        console.log('Recipe already exists:', response.data)
        return true // Indicating the recipe exists
      } else {
        console.log('recipe doesnt exist')
        return false // Recipe doesn't exist
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return false
      } else {
        console.error('Error checking recipe:', err)
        return false // Handle error, assuming no recipe exists}
      }
    }
  }

  const getUniqueTitle = async () => {
    // replace special characters and hyphens
    const cleanTitle = postTitle.replace(/[^\w\-]+/g, '').replace(/-/g, '')
    return cleanTitle
    // let sameTitle = true
    // let uniqueID = -1
    // let title = cleanTitle
    // check if this title already exists
    // while (sameTitle) {
    //   if (uniqueID > 100) {
    //     console.log('there was an error with finding a unique title')
    //     return 'bad title'
    //   }
    //   if (!loading) {
    //     setLoading(true)
    //     const titleExists = await checkRecipeExists(title)
    //     setLoading(false)
    //     if (titleExists) {
    //       uniqueID++
    //       title = cleanTitle + '-' + uniqueID
    //     } else {
    //       return title
    //     }
    //   }
    // }
  }

  const axiosPostData = async () => {
    const dateTime = new Date()
    const postData = {
      userid: props.id ?? '',
      text: handleGetText(),
      dateTime: dateTime,
      tags: '', // TODO: allow for tags
      pictureURL: '',
      title: postTitle, // getUniqueTitle(),
      content: handleGetDelta(),
    }
    await axios
      .post('http://localhost:4001/post-recipe', postData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.message))
  }

  const handleSetContent = () => {
    // Make sure the JSON string is valid before parsing
    try {
      if (jsonContent) {
        const delta = JSON.parse(jsonContent) // Parse the JSON string back into a Delta object
        console.log(delta)
        if (editorRef.current) {
          editorRef.current._quill.setContents(delta) // Set the Delta content into the editor
        } else {
          console.error('Quill instance is not available')
        }
      }
    } catch (error) {
      console.error('Error parsing JSON or setting content:', error)
    }
  }

  const currentElement = document.querySelector('.post-title') // The current element
  const nextElement = currentElement?.nextElementSibling // Get the next element

  const width = nextElement instanceof HTMLElement ? nextElement.offsetWidth : '75%'

  return (
    <div className="content center gap-none wide-flex-col">
      <TextField
        label="Recipe Title"
        variant="outlined"
        value={postTitle}
        onChange={e => setPostTitle(e.target.value)}
        className="post-title"
        style={{ width: width, marginBottom: '2rem' }}
      />
      <div>
        {/* Add Quill's CSS to style the editor */}
        <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
        {/* Create a div for the Quill editor */}
        <div ref={editorRef} style={{ minHeight: '500px' }}></div>
        {/* Add Quill's JS script */}
        <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
      </div>
      <Button variant="contained" onClick={axiosPostData}>
        Post
      </Button>
    </div>
  )
}

export default TextEditor

import React, { useEffect, useRef } from 'react'
import Quill from 'quill'

const TextEditor = () => {
  const editorRef = useRef(null)
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

  return (
    <div>
      {/* Add Quill's CSS to style the editor */}
      <link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet" />
      {/* Create a div for the Quill editor */}
      <div ref={editorRef} style={{ minHeight: '500px' }}></div>
      {/* Add Quill's JS script */}
      <script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
    </div>
  )
}

export default TextEditor

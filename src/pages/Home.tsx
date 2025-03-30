import React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { TextEditor } from '../components'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

const Home = () => {
  document.body.classList.add('bg-light')
  return (
    <>
      <div className="large-navbar-space"></div>
      <div className="content center gap-none">
        <TextEditor></TextEditor>
      </div>
    </>
  )
}

export default Home

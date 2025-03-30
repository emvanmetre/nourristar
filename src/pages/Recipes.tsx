import React, { useEffect, useState, useRef } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { RecipeDisplay } from '../components'

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

const Recipes = () => {
  document.body.classList.add('bg-light')
  return (
    <>
      <div className="large-navbar-space"></div>
      {/* <TextEditor id={props.id ?? null}></TextEditor> */}

      <RecipeDisplay></RecipeDisplay>
    </>
  )
}

export default Recipes

import React, { useState, useEffect } from 'react'
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import axios from 'axios'

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:4001/Nourristar/Recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err))
  }, [])

  const filteredRecipes = recipes.filter(recipe => recipe.text.toLowerCase().includes(search.toLowerCase()) && (filter ? recipe.tags.includes(filter) : true))

  return (
    <Container maxWidth="lg" style={{ display: 'flex', marginTop: '20px' }}>
      <div className="content">
        {/* Sidebar Filters */}
        <div className="content-bounded" style={{ width: '250px', marginRight: '50px' }}>
          <Typography variant="h6">Filters</Typography>
          <TextField fullWidth label="Search" variant="outlined" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: '15px' }} />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={filter} onChange={e => setFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="gluten-free">Gluten-Free</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Recipe Cards */}
        <Grid container spacing={3} style={{ flexGrow: 1 }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid size={6} key={index}>
              <Card>
                {recipe.pictureURL && <CardMedia component="img" height="140" image={recipe.pictureURL} alt="Recipe" />}
                <CardContent>
                  <Typography variant="h6">{recipe.text}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(recipe.dateTime).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  )
}

export default RecipeDisplay

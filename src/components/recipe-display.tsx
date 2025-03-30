import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  OutlinedInput,
  Typography,
  TextField,
  ThemeProvider,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import axios from 'axios'
import RecipeTags from '../core/recipeTags'
import theme from '../core/theme'
import { Link } from 'react-router-dom'

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([])
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([])

  const filter = [...selectedCategories, ...selectedMealTypes, ...selectedNutrients]

  const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const { value } = event.target
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value)
  }

  const handleMealTypeChange = (event: SelectChangeEvent<typeof selectedMealTypes>) => {
    const { value } = event.target
    setSelectedMealTypes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleNutrientChange = (event: SelectChangeEvent<typeof selectedNutrients>) => {
    const { value } = event.target
    setSelectedNutrients(typeof value === 'string' ? value.split(',') : value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:4001/Nourristar/Recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleClearCategories = () => {
    setSelectedCategories([]) // Clears selected categories
  }

  const handleClearMealTypes = () => {
    setSelectedMealTypes([]) // Clears selected categories
  }

  const handleClearNutrients = () => {
    setSelectedNutrients([]) // Clears selected categories
  }

  const filteredRecipes = recipes.filter(recipe => {
    const title = recipe.title ? recipe.title.toLowerCase() : ''
    const text = recipe.text ? recipe.text.toLowerCase() : ''
    const tags = recipe.tags ? recipe.tags.map(tag => tag.toLowerCase()) : []
    const matchesTags = filter.length > 0 ? filter.every(tag => tags.includes(tag.toLowerCase())) : true
    const searchFilter = search ? search.toLowerCase() : ''
    return (title.includes(searchFilter) || text.includes(searchFilter)) && matchesTags
  })

  return (
    <Container maxWidth="lg" style={{ display: 'flex', marginTop: '20px' }}>
      <div className="content">
        {/* Sidebar Filters */}
        <div className="content-bounded flex" style={{ width: '250px', marginRight: '50px' }}>
          <TextField fullWidth label="Search" variant="outlined" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: '15px' }} />
          <Typography variant="h6">Filters</Typography>
          <ThemeProvider theme={theme}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Categories" />}
                renderValue={selected => (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {RecipeTags.categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {/* Clear Button */}

              <Box mt={1}>
                <Button variant="outlined" color="primary" onClick={handleClearCategories} disabled={selectedCategories.length === 0}>
                  Clear Selection
                </Button>
              </Box>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Meals</InputLabel>
              <Select
                multiple
                value={selectedMealTypes}
                onChange={handleMealTypeChange}
                input={<OutlinedInput label="Meals" />}
                renderValue={selected => (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {RecipeTags.meal.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {/* Clear Button */}

              <Box mt={1}>
                <Button variant="outlined" color="primary" onClick={handleClearMealTypes} disabled={selectedMealTypes.length === 0}>
                  Clear Selection
                </Button>
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Nutrients</InputLabel>
              <Select
                multiple
                value={selectedNutrients}
                onChange={handleNutrientChange}
                input={<OutlinedInput label="Nutrients" />}
                renderValue={selected => (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {RecipeTags.nutrient.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {/* Clear Button */}

              <Box mt={1}>
                <Button variant="outlined" color="primary" onClick={handleClearNutrients} disabled={selectedNutrients.length === 0}>
                  Clear Selection
                </Button>
              </Box>
            </FormControl>
          </ThemeProvider>
        </div>

        {/* Recipe Cards */}
        <Grid container spacing={3} style={{ flexGrow: 1 }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid size={6} key={index}>
              <Link to={`/recipe/${recipe.title.replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                <Card>
                  {
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200, // Set fixed height
                        width: '100%', // Ensure it fills the card width
                        objectFit: 'cover', // Crop instead of stretching
                      }}
                      image={recipe.pictureURL || '../../recipe-not-found.png'}
                      alt="Recipe"
                    />
                  }
                  <CardContent>
                    <Typography variant="h6">{recipe.text.replace(/^\s*[\r\n]/gm, '')}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(recipe.dateTime).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  )
}

export default RecipeDisplay

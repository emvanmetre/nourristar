import React from 'react'
import { Container, Typography, Grid, Card, CardMedia, CardContent, Avatar, Box } from '@mui/material'

const sampleRecipes = {
  'Family Dinners': [
    { title: 'Homemade Lasagna', image: '/lasagna.jpg' },
    { title: 'Chicken Alfredo', image: '/chicken-alfredo.jpg' },
  ],
  'Gym Day': [
    { title: 'Protein Smoothie', image: '/protein-smoothie.jpg' },
    { title: 'Grilled Chicken Bowl', image: '/grilled-chicken.jpg' },
  ],
  'Sweet Treats': [
    { title: 'Chocolate Brownies', image: '/brownies.jpg' },
    { title: 'Strawberry Cheesecake', image: '/cheesecake.jpg' },
  ],
}

const UserRecipePage = () => {
  return (
    <div className="content wide-flex-col">
      <div className="navbar-space"></div>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* User Profile */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Avatar src="/user-avatar.jpg" sx={{ width: 56, height: 56 }} />
          <Typography variant="h5" fontWeight={600}>
            Emily's Recipes
          </Typography>
        </Box>

        {/* Recipe Categories */}
        {Object.entries(sampleRecipes).map(([category, recipes]) => (
          <Box key={category} mb={4}>
            <Typography variant="h6" fontWeight={500} mb={2}>
              {category}
            </Typography>
            <Grid container spacing={2}>
              {recipes.map((recipe, index) => (
                <Grid size={6} key={index}>
                  <Card>
                    <CardMedia component="img" height="160" image={recipe.image} alt={recipe.title} />
                    <CardContent>
                      <Typography variant="body1" fontWeight={500}>
                        {recipe.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </div>
  )
}

export default UserRecipePage

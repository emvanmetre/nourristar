import { createTheme } from '@mui/material/styles'
import { colors } from '../tokens'

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: colors.primary.green,
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: colors.secondary.yellow,
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

export default theme

import {createTheme} from '@mui/material'
import { red } from '@mui/material/colors'

export const greenTheme = createTheme({
    palette: {
        primary:{
            main: '#163621'
        },
        secondary: {
            main: '#235735'
        },
        error: {
            main: red.A400
        },
        personal: {
            main: '#465F3B'
        }
    }
})

import { useDispatch, useSelector } from 'react-redux'
import {Link as routerLink} from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import {Google} from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { useEffect, useMemo } from 'react'

import Swal from 'sweetalert2'

const loginFormFields={
  email: '',
  password: '',
}

export const LoginPage = () => {

  //Usar Redux 
  const dispatch = useDispatch(); 
  const {status, errorMessage, user } = useSelector(state => state.auth) 
   
  const {email, password, onInputChange, formState}=useForm(loginFormFields) 
  
  //const isAuthenticating = useMemo(()=>status === 'checking', [status])

  const onSubmit=async (event)=>{ 
    event.preventDefault();
    dispatch(startLoginWithEmailPassword(formState))
  } 

  const onGoogleSignIn = () => { 
    //dispatch(startGoogleSignIn()) //Función THUNKS 
    Swal.fire('Opción aún no implementada', 'error')
  }

  useEffect(()=>{
    if(errorMessage!== undefined && errorMessage!== null){
      console.log('errorMessage ', errorMessage)
      Swal.fire('Error en la Autenticación', errorMessage, 'error')
    }
  },[errorMessage])

  useEffect(()=>{
    if(user.name!==undefined && user.name!==null){
      Swal.fire({
        icon: 'success',
        title:  `${user.email} Loggin`,
        showConfirmButton: false,
        timer: 1500
      })
    } 
  },[user]) 
  


  return (
        
        // AuthLayout contiene la caja en el medio y el fondo
        <AuthLayout title='Login'>
        {/*
        xs: Tamaño elementio en pantalla pequeña (12 es toda)
        sm  Tamaño elemento en pantalla grande(12 es toda)
        sx  Espacio padding {{mb: abajo, mt: arriba}}
        */}
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Correo"
                  type="email"
                  placeholder="email@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  fullWidth
                  required
                  />
              </Grid>
 
              
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} sm={6}>
                  <Button type='submit' variant='contained' fullWidth>
                      Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button  onClick={onGoogleSignIn} variant='contained' fullWidth>
                    <Google />
                      <Typography sx={{ml:1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink} color='inherit' to='/register'>
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>   
  )
}

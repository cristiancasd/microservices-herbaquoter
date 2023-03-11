import {Link as routerLink} from 'react-router-dom'
import { Button, Grid, TextField, Typography, Link, Alert, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { AuthLayout } from '../layout/AuthLayout'
import { startRegisterWithEmailPassword } from '../../store/auth/thunks'
import Swal from 'sweetalert2'

const formData={
  password:'',
  password2:'',
  fullname: '',
  email: '',
  herbalifelevel:'cliente',
  rol:'user', 
  country:'',
}

const formValidations={
  email: [(value)=>value.includes('@'), 'El correo debe contener @' ],
  password: [(value)=>value.length>=6,  'El password debe tener mínimo 6 letras, 1 número, 1 mayuscula, 1 minuscula' ],
  password2: [(value)=>value===formData.password ,  'Las contraseñas no coinciden' ],
  fullname: [(value)=>value.length>=3,  'El nombre es obligatorio' ],
}


export const RegisterPage = () => {


  const dispatch = useDispatch();

  //Traigo los estados de las varaibles globales, /store/auth/authslices
  const {status, errorMessage}    = useSelector(state=>state.auth);

  //isCheckingAuthentication, sirve para desabilitar botón
  const isCheckingAuthentication  = useMemo(()=>status==='checking',[status])

  // Variable para saber si el formulario ya fue submitted
  const [formSubmitted, setFormSubmitted] = useState(false)



  const {password, password2,email, fullname, herbalifelevel, rol, 
    country,onInputChange, formState,  
    isFormValid, fullnameValid, emailValid, passwordValid, password2Valid,
  }=useForm(formData,formValidations) 

  const onSubmit=(event)=>{ 
    console.log('estoy en submit');
    event.preventDefault();
    console.log(email,password, password2)
    console.log('isFormValid', isFormValid)
    setFormSubmitted(true); //Cambiamos estado
    if(!isFormValid) return;
      dispatch(startRegisterWithEmailPassword(formState))
   }
  
   useEffect(()=>{
    if(errorMessage!== undefined && errorMessage!== null){
      console.log('errorMessage ', errorMessage)
      Swal.fire('Error en la Autenticación', errorMessage, 'error')
    }
  },[errorMessage])

  


  return (  
        <AuthLayout title='Crear cuenta'>       
          <form 
          className='animate__animated animate__fadeIn animate__faster'
          onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField  
                  required
                  label="Nombre completo"
                  type="text"
                  placeholder="Nombre completo"
                  fullWidth
                  name="fullname"
                  value={fullname}
                  onChange={onInputChange}
                  error={!!fullnameValid && formSubmitted /*Casilla roja por error*/}
                  helperText={fullnameValid /*Texto error bajo la casilla*/}
                  
                  />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  required
                  label="Correo"
                  type="email"
                  placeholder="email@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  error={!!emailValid && formSubmitted}
                  helperText={emailValid}
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Rol"
                  type="text"
                  placeholder="Rol"
                  fullWidth
                  name="rol"
                  value={rol}
                  onChange={onInputChange}
                  inputProps={{readOnly: true}}

                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Nacionalidad"
                  type="text"
                  placeholder="Nacionalidad"
                  fullWidth
                  name="country"
                  value={country}
                  onChange={onInputChange}
                  />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <InputLabel id="demo-simple-select-label">Nivel herbalife</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={herbalifelevel}
                        label="Herbalife Level"
                        onChange={onInputChange}
                        name="herbalifelevel"
                        >
                        <MenuItem value={'cliente'}>cliente</MenuItem>
                        <MenuItem value={'cliente-15'}>Descuento 15%</MenuItem>
                        <MenuItem value={'distribuidor-25'}>Descuento 25%</MenuItem>
                        <MenuItem value={'distribuidor-35'}>Descuento 35%</MenuItem>
                        <MenuItem value={'distribuidor-42'}>Descuento 42%</MenuItem>
                        <MenuItem value={'supervisor'}>Supervisor</MenuItem>

                    </Select>
                </Grid>

              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  error={!!passwordValid  && formSubmitted}
                  helperText={passwordValid}
                  required
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Confirmar contraseña"
                  type="password"
                  placeholder="confirmar password"
                  fullWidth
                  name="password2"
                  value={password2}
                  onChange={onInputChange}
                  error={!!password2Valid  && formSubmitted}
                  helperText={password2Valid}                  
                  required
                  />
              </Grid>

              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} 
                  display={!!errorMessage  ? '' :'none'}
                >
                  <Alert severity='error'>{errorMessage} </Alert>
                </Grid>               
              </Grid> 
 
              <Grid container spacing={2} sx={{mb:2, mt:1}}>              
                <Grid item xs={12} >
                  <Button type="submit" 
                  disabled={isCheckingAuthentication}
                  variant='contained' 
                  fullWidth>
                      Crear Cuenta
                  </Button>
                </Grid>               
              </Grid>
              
              <Grid container direction='row' justifyContent='end'>
                <Link component={routerLink } color='inherit' to='/auth/login'>
                  Ya tengo cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
        </AuthLayout>
  )
}

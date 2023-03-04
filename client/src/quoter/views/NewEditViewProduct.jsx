import { BorderColorOutlined, DeleteOutline, SaveOutlined, SignalCellularNull, UploadOutlined, } from "@mui/icons-material"
import { Grid, Select, TextField, Typography, MenuItem, InputLabel, Button } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef, useState } from "react";
import { startCreateProduct, startDeleteProduct, startUpdateProduct, startUploadingFiles } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setActiveProduct, setQuoterProcess } from "../../store/quoter/quoterSlice";
import { ButtonsManage } from "../components/ButtonsManage";
//import { communicatingBackend, setIsSaving } from "../../store/quoter/quoterSlice";


const formValidations={
    title: [(value)=>value.length>=2, 'El titulo debe tener al menos dos caracteres' ],
    sku: [(value)=>value.length>=4 ,  'El sku debe tener al menos 4 caracteres' ],
  }

  
export const NewEditViewProduct = () => {
    
    const{errorMessage, categories, activeProductToEdit, activeProduct,
        statusQuoter, quoterProcess, successMessage, initialProduct, onSaving }= useSelector(state=> state.quoter)

    const{user}= useSelector(state=> state.auth)
    const isReadOnly = user.rol=='user' || quoterProcess=== 'View'?{ readOnly: true } :{ readOnly: false }

    const {title, description, pv,sku, image,
    pricepublic, price15, price25, categoryId,
    price35, price42, price50,  formState, 
    isFormValid, titleValid, skuValid,
    onInputChange, onResetForm} =useForm(activeProductToEdit, formValidations)

    const dispatch=useDispatch();

    // Variable para saber si el formulario ya fue submitted
    const [formSubmitted, setFormSubmitted] = useState(false)
 

    useEffect(() => {
        if(onSaving){
          //event.preventDefault();
          setFormSubmitted(true); //Cambiamos estado
          let err='';
          if(titleValid) err=' -'+titleValid;
          if(err!=='')Swal.fire('Formulary incorrect', err, 'error');
          if(!isFormValid) return;
          quoterProcess==='Edit'
            ? dispatch(startUpdateProduct(formState, activeProduct.category))        
            : dispatch(startCreateProduct(formState)); 
          //dispatch(setOnSaving(false));
        }
    }, [onSaving])


    useEffect(()=>{
        if(errorMessage!== undefined && errorMessage!== null)
            Swal.fire('Error', errorMessage, 'error')
    },[errorMessage])

    useEffect(()=>{
    if(successMessage) 
        Swal.fire({icon: 'success', title: successMessage, showConfirmButton: false, timer: 1500})
    }),[successMessage]
        
    useEffect(()=>{
        onResetForm()
      },[quoterProcess])


    return (
        <form
        >
            {<ButtonsManage 
                title={title} 
                description={description}
                pricepublic= {pricepublic} 
                price15= {price15} 
                price25= {price25} 
                price35= {price35} 
                price42= {price42} 
                price50= {price50} 
                sku= {sku} 
                pv= {pv}  
                categoryId= {categoryId} 
            />}
            


            <Box sx={{ flexGrow: 1 }}>

                
                <Grid container  spacing={2}  alignItems='center'>
                    <Grid item xs={12}  md={3}>
                        <ImageGallery  />
                    </Grid>

                    <Grid item xs={12}  md={9}>
                        <TextField
                            type='text'
                            variant='filled'
                            fullWidth
                            name="title"
                            value={title}
                            onChange={onInputChange}
                            placeholder="Ingrese Titulo"
                            label='Titulo'             
                            sx={{border:'none', mb:1}}
                            error={!!titleValid && formSubmitted /*Casilla roja por error*/}
                            helperText={titleValid /*Texto error bajo la casilla*/}
                            required
                            inputProps={isReadOnly}
                        />
                        <TextField
                            type='text'
                            variant='filled'
                            fullWidth
                            name="description"
                            onChange={onInputChange}
                            value={description}
                            label='Descripción'
                            multiline
                            placeholder="Descripción"
                            minRows={3}
                            sx={{border:'none', mb:1}}
                            inputProps={isReadOnly}
                        />
                        
                    </Grid>    
                </Grid>
                <Grid container  spacing={2}>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                name="pricepublic"
                                onChange={onInputChange}
                                type='number'
                                variant='filled'
                                fullWidth
                                value={quoterProcess==='View'? pricepublic.toLocaleString('es-CO') :pricepublic}             
                                placeholder="Precio Público"
                                label='Precio Público'
                                sx={{border:'none', mb:1}}
                                required
                                inputProps={isReadOnly}
                                />
                            </Grid>

                            <Grid item xs={6}  md={6}>
                                <TextField
                                type='number'
                                variant='filled'
                                fullWidth 
                                name="price15"
                                onChange={onInputChange}
                                value={quoterProcess==='View'? price15.toLocaleString('es-CO') :price15}             
                                placeholder="Precio 15%"
                                label='Precio 15%'
                                sx={{border:'none', mb:1}}
                                required
                                inputProps={isReadOnly}
                                />
                            </Grid>

                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='number'
                                    variant='filled'
                                    fullWidth 
                                    name="price25"
                                    onChange={onInputChange}
                                    value={quoterProcess==='View'? price25.toLocaleString('es-CO') :price25}             
                                    placeholder="Precio 25%"
                                    label='Precio 25%'
                                    sx={{border:'none', mb:1}}
                                    required
                                    inputProps={isReadOnly}
                                    />
                            </Grid>

                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='number'
                                    variant='filled'
                                    fullWidth   
                                    name="price35"
                                    onChange={onInputChange}
                                    value={quoterProcess==='View'? price35.toLocaleString('es-CO') :price35}             
                                    placeholder="Precio 35%"
                                    label='Precio 35%'
                                    sx={{border:'none', mb:1}}
                                    required
                                    inputProps={isReadOnly}
                                    />
                            </Grid>

                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='number'
                                    variant='filled'
                                    fullWidth   
                                    name="price42"
                                    onChange={onInputChange} 
                                    value={quoterProcess==='View'? price42.toLocaleString('es-CO') :price42}                        
                                    placeholder="Precio 42%"
                                    label='Precio 42%'
                                    sx={{border:'none', mb:1}}
                                    required
                                    inputProps={isReadOnly}
                                    />
                            </Grid>

                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='number'
                                    variant='filled'
                                    fullWidth   
                                    name="price50"
                                    onChange={onInputChange}
                                    value={quoterProcess==='View'? price50.toLocaleString('es-CO') :price50}             
                                    placeholder="Precio 50%"
                                    label='Precio 50%'
                                    sx={{border:'none', mb:1}}
                                    required
                                    inputProps={isReadOnly}
                                    />
                            </Grid>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='number'
                                    step='2'
                                    variant='filled'
                                    fullWidth  
                                    name="pv"
                                    onChange={onInputChange} 
                                    value={pv}              
                                    placeholder="PV"
                                    label='PV'
                                    sx={{border:'none', mb:1}}
                                    required
                                    inputProps={isReadOnly}
                                    />
                            </Grid>
                            <Grid item xs={6}  md={6}>
                                <TextField
                                    type='text'
                                    variant='filled'
                                    fullWidth   
                                    name="sku"
                                    onChange={onInputChange}  
                                    value={sku}            
                                    placeholder="SKU"
                                    label='SKU'
                                    sx={{border:'none', mb:1}}
                                    error={!!skuValid && formSubmitted /*Casilla roja por error*/}
                                    helperText={skuValid /*Texto error bajo la casilla*/}
                                    required
                                    inputProps={quoterProcess!='Create' ?{ readOnly: true } :{ readOnly: false }}
                                    />
                            </Grid>


                            <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='categoryId'                        
                                    label="Categoría"                        
                                    onChange={onInputChange}
                                    value={categoryId}
                                    inputProps={isReadOnly}
                                    >
                                    {categories.map( category => (
                                        <MenuItem 
                                        key={category.id}
                                        value={category.id}>{category.title}</MenuItem>
                                    ))}                     
                                </Select>
                            </Grid>
                </Grid>
                
            </Box>
        </form>
    )
}



   
import { BorderColorOutlined, DeleteOutline, SaveOutlined, SignalCellularNull, } from "@mui/icons-material"
import { Grid, TextField, Typography, MenuItem, InputLabel, Button } from "@mui/material"

import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { startCreateCategory, startDeleteCategory, startUpdateCategory } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setQuoterProcess } from "../../store/quoter/quoterSlice";

export const NewEditViewCategory = () => {
    
    const{errorMessage, successMessage, activeCategory,
        statusQuoter, quoterProcess, }= useSelector(state=> state.quoter)

    const{user}= useSelector(state=> state.auth)
    const isReadOnly =user.rol=='user' || quoterProcess==='View' ?{ readOnly: true } :{ readOnly: false }
    const isHired = user.rol=='user' || quoterProcess==='View' ?{ display: 'none' } :{ display: '' }

    const {title, description,  formState, onInputChange, onResetForm} =useForm(activeCategory)

    // Variable para saber si el formulario ya fue submitted
    const [formSubmitted, setFormSubmitted] = useState(false)
    
    
    const dispatch=useDispatch();

    const onClickSaveCategory = (event) =>{
        event.preventDefault();
        setFormSubmitted(true);
        //dispatch(setIsSaving(true));        
        quoterProcess==='edit'
            ? dispatch(startUpdateCategory(formState))      
            : dispatch(startCreateCategory(formState));
    }

    useEffect(()=>{
        console.log('errorMessage en useEffect ',errorMessage)
        if(errorMessage!== undefined && errorMessage!== null){
          Swal.fire('Error', errorMessage, 'error')
        }
      },[errorMessage])

    useEffect(()=>{
        if(successMessage)
            Swal.fire({icon: 'success', title: successMessage, showConfirmButton: false, timer: 1500})
    }),[successMessage]
        
    useEffect(()=>{
        onResetForm()
      },[quoterProcess])


      const configConfirmSwal={
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }

    const onDeleteCategory=(event)=>{
        event.preventDefault();
        Swal.fire(
            configConfirmSwal
        ).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteCategory(activeCategory.id));
          }
        })
      }


  return (
<>
    <form
    onSubmit={onClickSaveCategory}>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> {user.rol=='user' ? 'View' :quoterProcess} Category</Typography>
            </Grid>
            <Grid item>
                <Button
                    color="primary"
                    disabled={statusQuoter=='communicating' || quoterProcess=='Create'}
                    onClick={()=>dispatch(setQuoterProcess('Edit'))}
                    style={quoterProcess=== 'View' ?{ display: '' } : { display: 'none' } }
                >
                    <BorderColorOutlined sx={{fontSize: 30, mr:1}}/>
                    Edit Category
                </Button>
                <Button 
                disabled={statusQuoter=='communicating'||
                (activeCategory.title==title && activeCategory.description==description)}
                type="submit" 
                style={isHired}
                color='primary' sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                    Save
                </Button>

                <Button 
                      onClick={onDeleteCategory}
                      disabled={
                        statusQuoter=='communicating' ||
                        quoterProcess!=='Edit'
                       }            
                      style={quoterProcess=== 'View' ?{ display: 'none' } : { display: '' }}         
                      color='error' sx={{padding:2}}>
                      <DeleteOutline sx={{fontSize: 25, mr:0}}/>
                          Delete
                  </Button>
            </Grid>    
        </Grid>

        <Grid container  spacing={2}  alignItems='center'>
                
            <Grid item xs={12}  md={12}>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    placeholder="Ingrese Titulo"
                    label='Titulo'              
                    inputProps={isReadOnly}
                    sx={{border:'none', mb:1}}
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
                    inputProps={isReadOnly}
                />
                
            </Grid>    
        </Grid>
    </Box>
    </form>

    
      

</>

  )
}



   
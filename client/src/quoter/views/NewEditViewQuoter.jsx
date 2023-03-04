import { AddShoppingCartOutlined,} from "@mui/icons-material"
import { Grid, Select, TextField, MenuItem, InputLabel, Button, FormControl } from "@mui/material"
import { ImageGallery } from "../components/imageGallery"
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect,  useRef, useState } from "react";
import { startCreateQuoter,  startUpdateQuoter,  } from "../../store/quoter/thunks";
import Swal from 'sweetalert2'
import { setActiveQuoter, setIsAddProductQuoterProcess, setOnSaving,  setPriceDiscountQuoter,  } from "../../store/quoter/quoterSlice";
import { adaptNewActiveQuoter } from "../../helpers/activeQuoterChanges";
import { TableBasicQuoter } from "../components/TableBasicQuoter";
import { ButtonsManage } from "../components/ButtonsManage";


const formValidations={
    title: [(value)=>value.length>=2, 'El titulo debe tener al menos dos caracteres' ],
  }

export const NewEditViewQuoter = () => {

    const{errorMessage, successMessage, statusQuoter, quoterProcess,
        activeQuoter, activeQuoterToEdit, 
        products, priceDiscountQuoter,
        initialQuoter,
        quoterSelected, onSaving
     }= useSelector(state=> state.quoter)

 

    const {title, description, formState, isFormValid, titleValid,
    onInputChange, onResetForm} =useForm(activeQuoterToEdit, formValidations)

    const fileInputRef=useRef();
    const dispatch=useDispatch();

 

    if(!initialQuoter) return 'algo'
    
    const [pricesQuoter, setPricesQuoter]= useState(['pricepublic', 'price15', 'price25', 
      'price35', 'price42', 'price50'])

    
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    useEffect(() => {
      if(onSaving){
        //event.preventDefault();
        setFormSubmitted(true); //Cambiamos estado
        let err='';
        if(titleValid) err=' -'+titleValid;
        if(err!=='')Swal.fire('Formulary incorrect', err, 'error');
        if(!isFormValid) return;
        quoterProcess==='Edit'
          ? dispatch(startUpdateQuoter({...activeQuoter, title, description}, products))        
          : dispatch(startCreateQuoter({...activeQuoter, title, description}, products));
        dispatch(setOnSaving(false));
      }
    }, [onSaving])
    


    useEffect(()=>{
        if(errorMessage!== undefined && errorMessage!== null)
          Swal.fire('Error', errorMessage, 'error')
      },[errorMessage])

    useEffect(()=>{
      if(successMessage)
        Swal.fire({icon: 'success',title: successMessage, showConfirmButton: false,timer: 1500})
    }),[successMessage]
      
    // reset form and 
    useEffect(()=> onResetForm(),[quoterProcess])

    const addNewProductsToQuoter=()=>{ 
      dispatch(setIsAddProductQuoterProcess(true))
    } 

    const selectChange=({target})=>{
      dispatch(setPriceDiscountQuoter(target.value))
      const newActiveQuoter=adaptNewActiveQuoter({activeQuoter,priceDiscountQuoter:target.value, products})
      dispatch(setActiveQuoter(newActiveQuoter))
    }

  
  console.log('quoterSelected.products, activeQuoter.products ', quoterSelected.products, activeQuoter.products )
  return (

  <form
    >
    {<ButtonsManage title={title} description={description}/>}
    
    {/* AddproductsButtom-Select Discount-Table*/} 
      <Box sx={{ 
        backgroundColor: '#F1F4F1',
        padding: '10px',
        marginBottom:2,
        maxWidth: '100%'
        }}> 



        <Grid container spacing={2}  alignItems='center' >
          <Grid item xs={6}  md={6}>
            <Button  
              variant="outlined"
              disabled={statusQuoter=='communicating'||quoterProcess==='View'}
              onClick={addNewProductsToQuoter}
              color='primary' 
              sx={{marginBottom:2}}>
                <AddShoppingCartOutlined sx={{fontSize: 24, mr:1}}/>
                Products
            </Button>
          </Grid>
          <Grid item xs={6}  md={6}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Price</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-small"
                id="demo-select-small"
                name='priceQuoter'                        
                label="Price"                        
                onChange={selectChange}
                value={priceDiscountQuoter}
              >
                  {pricesQuoter.map( price => (
                    <MenuItem 
                    key={price}
                    value={price}>{price}</MenuItem>
                  ))}                     
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {
        <TableBasicQuoter />
        }

        
      </Box>
      
      {/*Image and field data */}
      <Box sx={{ flexGrow: 1 }}>
          <Grid container  spacing={2}  alignItems='center'>
              <Grid item xs={12}  md={3}>
                  <ImageGallery  />
              </Grid>

              <Grid item xs={12}  md={9}>
                
                  <TextField
                      type='text'
                      variant='filled'
                      inputProps={quoterProcess=== 'View' && !activeQuoter.isDefaultQuoter ?{ readOnly: true } :{ readOnly: false }}
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
                  />
                  <TextField
                      type='text'
                      variant='filled'
                      inputProps={quoterProcess=== 'View' && !activeQuoter.isDefaultQuoter ?{ readOnly: true } :{ readOnly: false }}
                      fullWidth
                      name="description"
                      onChange={onInputChange}
                      value={description}
                      label='Descripción'
                      multiline
                      placeholder="Descripción"
                      minRows={3}
                      sx={{border:'none', mb:1}}
                  />
                  
              </Grid>    
          </Grid>
      </Box>
  </form>
  )
}



   
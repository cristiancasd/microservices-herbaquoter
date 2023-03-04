import { BorderColorOutlined, DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { isTargetFilesCorrect } from "../../helpers/validFile"
import { setOnSaving, setQuoterProcess } from "../../store/quoter/quoterSlice"
import { startDeleteQuoter, startUploadingImageQuoter } from "../../store/quoter/thunks"


export const ButtonsManage=(
    {
        title,
        description,
        pricepublic,
        price15,
        price25,
        price35,
        price42,
        price50,
        sku,
        pv,
        categoryId,
    }
    )=>{
    const {user}= useSelector(state=> state.auth)
    const {activeQuoter, quoterProcess, quoterSelected, products,
        statusQuoter, navBarSelection, activeProduct} = useSelector(state=> state.quoter);

    const fileInputRef=useRef();
    const dispatch=useDispatch();

    const onDelete=(event)=>{
        event.preventDefault();
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            navBarSelection==='Product'
                ? dispatch(startDeleteQuoter(activeProduct.id))
                : dispatch(startDeleteQuoter(activeQuoter.id));
          }
        })
    }

    const onSave=(event)=>{
        event.preventDefault();
        dispatch(setOnSaving(true)) 
    }

    const onEdit=(event)=>{
        event.preventDefault();
        dispatch(setQuoterProcess('Edit'))
    }

    const onFileInputChange=({target})=>{
        isTargetFilesCorrect(target.files)
          ? dispatch(startUploadingImageQuoter(target.files, products))
          : Swal.fire('Error', 'The file must be a image (jpg, jpeg, png)', 'error')
    }
    console.log('activeQuoter.isDefaultQuoter, navBarSelectio, quoterProcess', activeQuoter.isDefaultQuoter, navBarSelection, quoterProcess)
   
   
    return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}} item xs={12}  md={12}>
            
              <Grid item>
                    <Typography fontSize={34} fontWeight='light'> {quoterProcess} {navBarSelection}</Typography>
                    <Typography fontSize={20} fontWeight='light'>
                        {navBarSelection=='quoters' ? activeQuoter.title : activeProduct.title } 
                    </Typography>
              </Grid>
 
              <Grid item>  
                {/*Edit Button*/}  
                <Button
                    color="primary"
                    onClick={onEdit}
                    style=
                        {
                            navBarSelection==='quoters'
                                ? quoterProcess=== 'View' && !activeQuoter.isDefaultQuoter ?{ display: '' } : { display: 'none' }
                                : quoterProcess=== 'View' && user.rol !=='user' ?{ display: '' } : { display: 'none' }
                                
                        }
                    
                >
                    <BorderColorOutlined sx={{fontSize: 30, mr:1}}/>
                    Edit {navBarSelection}
                </Button>
                
                <input
                  type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={onFileInputChange}
                  style={{display:'none'}}
                />

                {/*Upload Image Button*/}
                <Button
                      color="primary"
                      disabled={statusQuoter=='communicating' || quoterProcess=='Create'}
                      onClick={()=>fileInputRef.current.click()}
                      style={
                        quoterProcess=== 'View' ?{ display: 'none' } : { display: '' }}
                  >
                      <UploadOutlined sx={{fontSize: 30, mr:1}}/>
                      Upload Image
                </Button>

                {/*Upload Image Button*/}
                <Button 
                    disabled={

                        navBarSelection==='quoters'
                            ? statusQuoter=='communicating' ||
                                (activeQuoter.title==title
                                && activeQuoter.description==description 
                                && activeQuoter.products==quoterSelected.products
                                )
                            : statusQuoter=='communicating' ||
                                (activeProduct.title==title && 
                                    activeProduct.description==description && 
                                    activeProduct.pricepublic==pricepublic &&
                                    activeProduct.price15==price15 && 
                                    activeProduct.price25==price25 && 
                                    activeProduct.price35==price35 &&
                                    activeProduct.price42==price42 && 
                                    activeProduct.price50==price50 &&
                                    activeProduct.sku==sku && 
                                    activeProduct.pv==pv && 
                                    activeProduct.category.id==categoryId 
                                )
                       }
                    
                    style={quoterProcess=== 'View' ?{ display: 'none' } : { display: '' }}
                    color='primary' sx={{padding:2}}
                    onClick={onSave}
                >
                    <SaveOutlined sx={{fontSize: 30, mr:1}}/>
                    Save
                </Button>
  
            {/*Delete Button*/}
              <Button 
                onClick={onDelete}
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
      </Box>
    )
}
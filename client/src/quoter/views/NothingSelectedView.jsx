import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import Swal from "sweetalert2";

export const NothingSelectedView = () => {

  const {navBarSelection, successMessage}=useSelector(state=> state.quoter);
  useEffect(()=>{
    if(successMessage)
      Swal.fire({icon: 'success',title: successMessage, showConfirmButton: false,timer: 1500})
  }),[successMessage]

  return (
    <>    
    <Grid container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight:'calc(100vh - 110px)', backgroundColor:'primary.main',padding:4}}>      
        <Grid item xs={12}>
            <StarOutline sx={{fontSize:100, color:'white'}}/>
        </Grid>
        <Grid item xs={12}>
            <Typography color="white" variant ='h5'>
              {`Select ${navBarSelection} to view`}
            </Typography>
        </Grid>
    </Grid>
    </>
  )
}

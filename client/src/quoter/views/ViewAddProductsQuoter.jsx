import { SaveOutlined, Update } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid, List, ListItem, Stack, TextField, Typography,  } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { adaptNewActiveQuoter } from "../../helpers/activeQuoterChanges";
import { setActiveQuoter, setIsAddProductQuoterProcess } from "../../store/quoter/quoterSlice";
import { AddProductQuoterItem } from "../components/AddProductQuoterItem";
 
 
export const ViewAddProductsQuoter = () => {
    const{products, activeQuoter, priceDiscountQuoter}= useSelector(state=> state.quoter);
    const dispatch=useDispatch()

    const updateQuoter=async()=>{ 
        console.log('QQQQQQQQQQQ   antes de updateQuoter ', activeQuoter)
        const newQuoterActive= await adaptNewActiveQuoter({activeQuoter, products, priceDiscountQuoter})
        console.log('QQQQQQQQQQQ   voy a updateQuoter ', newQuoterActive)
        dispatch(setActiveQuoter(newQuoterActive));
        dispatch(setIsAddProductQuoterProcess(false));
    }

    const [productsMatches2, setProductsMatches2]=useState([])
    const [isSearching, setIsSearching]=useState(false)

    const onSearchProduct=({target})=>{
        
        const productToSearch=target.value.toLowerCase();
        productToSearch!=''
            ? setIsSearching(true)
            : setIsSearching(false)

        const productsMatches = products.filter(element => {
            if (element.title.toLowerCase().includes(productToSearch)) 
              return true;
          });

        setProductsMatches2(productsMatches)
    }

    const buttonApplyChanges= 
    <Button 
        variant="outlined"
        fullWidth
        onClick={updateQuoter}
        color='primary' sx={{padding:1}}>
        <Update sx={{fontSize: 30, mr:1}}/>
            Apply Changes
    </Button>
    

    return(  
        <Container maxWidth="sm">
            <Grid container spacing={2}  alignItems='center' >
                <Grid item xs={6}  md={6}>
                    {buttonApplyChanges}
                </Grid>
                
                <Grid item xs={6}  md={6}>
                    <TextField
                        type='text'
                        variant='filled'
                        fullWidth 
                        name="search"                
                        placeholder="Search"
                        label='Search'
                        
                        onChange={onSearchProduct}
                        sx={{border:'none', mb:1}}
                    /> 
                </Grid>
            </Grid>
            
            <List>
                {
                    isSearching
                        ? productsMatches2.map(product=> 
                            <AddProductQuoterItem key={product.id}{...product} />)
                        : products.map(product=> 
                            <AddProductQuoterItem key={product.id}{...product} />)
                }
            </List>
            {buttonApplyChanges}
        </Container>   
    )
}


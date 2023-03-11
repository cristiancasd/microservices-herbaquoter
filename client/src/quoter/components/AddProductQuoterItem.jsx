import { Box, Button, Divider, Grid, ListItem, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductsActiveQuoter } from "../../store/quoter/quoterSlice";


function createData(productSku, title, quantity, unitPrice, total) {
    return { productSku, title, quantity, unitPrice, total };
}

export const AddProductQuoterItem=(product)=> {

    const {activeQuoter, priceDiscountQuoter}=useSelector(state=> state.quoter);
    
    
    const dispatch = useDispatch();
    const [counter, setCounter]= useState(
        
        
        0
        //activeQuoter.products[product.sku] ? activeQuoter.products[product.sku].quantity : '0'
        
        
        
        );

    useEffect(() => {
        console.log('estoy en useEffect de de addProductQuoterItem')
        activeQuoter.products.map((productByQuoter)=>{
            if(productByQuoter && productByQuoter.sku===product.sku){
                setCounter(productByQuoter.quantity);
                return
            }
        })
    }, [])
    
    const onInputChange=({target})=>{
        let newValue= +target.value>=0 || target.value==''
            ? (target.value) 
            : (0)
        if(newValue!=counter){  
            if(+newValue>99){
                const total= counter*product[priceDiscountQuoter]
                const pvProductQuoter=product.pv*counter
                dispatch(setProductsActiveQuoter({sku:product.sku, quantity:counter, total, pv:+pvProductQuoter, title: product.title}))
                setCounter(counter);
            }else{
                if(newValue!='') newValue= (+newValue).toFixed()
                const total= +newValue*product[priceDiscountQuoter];
                const pvProductQuoter=product.pv*counter
                dispatch(setProductsActiveQuoter({sku:product.sku, quantity:+newValue, total, pv:+pvProductQuoter, title: product.title }));
                setCounter(newValue)   
            }           
        }
    }

    const counterChange=async (operation)=>{

        let newValue= operation=='increment'
            ? (+counter+1)
            : (counter>0 ? +counter-1 : 0);
        if(newValue!=counter){
            if(+newValue>99){
                const total= 99*product[priceDiscountQuoter]
                dispatch(setProductsActiveQuoter({sku:product.sku, quantity:99, total}))
                setCounter(99);
            }else{
                const total= +newValue*product[priceDiscountQuoter]
                dispatch(setProductsActiveQuoter({sku:product.sku, quantity:newValue, total}))
                setCounter(newValue);
            } 
        }
    }

    return(
        <>
        <ListItem  disablePadding>
        <Box sx={{ 
            flexGrow: 1,
            marginTop: '15px',
            marginBottom: '15px' 
        
        }}>
            <Grid container  > 
                <Grid item xs={12} md={8}>
                    <Typography variant='h6' noWrap component='div'>
                        {product.title} 
                    </Typography> 
                    <Typography variant='h12' noWrap component='div'>
                        {product.description}
                    </Typography> 
                    <Typography variant='h12' noWrap component='div'>
                        Price: $ {product[priceDiscountQuoter].toLocaleString('es-CO')}
                    </Typography> 
                    <Typography variant='h20' noWrap component='div'>
                        PV: {product.pv}
                    </Typography> 
                </Grid>
                
                <Grid  item xs={5} md={4}   sx={{maxHeight:'40px'}}>
                    <Stack direction="row" spacing={1} >
                            <Button 
                            variant='contained' 
                            size="small"
                            sx={{minWidth:'40px'}}
                            onClick={()=>counterChange('decrement')}
                            >-
                            </Button>

                            <TextField
                            type='number' 
                            variant='filled'
                            sx={{minWidth:'70px', minHeight:'30px', maxWidth:'80px'}}
                            value={counter}
                            margin='dense'
                            size='small'
                            onChange={onInputChange}
                            />
                            
                            <Button 
                            size="small"
                            variant='contained'
                            sx={{minWidth:'40px'}}
                            onClick={()=>counterChange('increment')}
                            >+</Button>
                    </Stack>
                </Grid>
            </Grid> 
        </Box>
        
        </ListItem>
        <Divider variant="middle" />
        </>
    )
 }
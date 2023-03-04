import { DeleteOutline } from "@mui/icons-material";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { adaptNewActiveQuoter } from "../../helpers/activeQuoterChanges";
import { setActiveQuoter } from "../../store/quoter/quoterSlice";

function createData(productSku, title, quantity, unitPrice, total) {
    return { productSku, title, quantity, unitPrice, total };
  }


export const TableBasicQuoter=()=>{

    console.log('888888888888888888 estoy en TableBasicQuoter')

    const {activeQuoter, isScreenCel, quoterProcess, products, priceDiscountQuoter}= useSelector(state=> state.quoter);
    const dispatch=useDispatch();
    
    const [rows, setRows]=useState([])
    useEffect(() => {
      console.log('******----------------------------------******* useEffect TableBasic')
      let rowsTemporal=[]
      console.log('rowsTemporal, useEfect activeQuoter', activeQuoter )
      activeQuoter.products.map((productQuoter)=>{
        if(productQuoter)
          rowsTemporal.push(
            createData(
              productQuoter.sku,
              productQuoter.title, 
              productQuoter.quantity,
              productQuoter.unitPrice,
              productQuoter.total
            )
          )
        }
      )
      console.log('*****set ROw')
      setRows(rowsTemporal)
      console.log('*****fin set ROw')
      
  }, [activeQuoter])

  const deleteProductList=async (event, skuToDelete)=>{ 
    const newQuoterActive= await adaptNewActiveQuoter({activeQuoter, products, skuToDelete, priceDiscountQuoter});
    dispatch(setActiveQuoter(newQuoterActive));
  }
  
  console.log('rows es .... ', rows)

  return(
    <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer >
            <Table aria-label="simple table">
              
              
              <TableHead>
                <TableRow>
                  <TableCell>Prouduct</TableCell>
                  <TableCell >Qty</TableCell>
                  {(!isScreenCel)&&<TableCell >VU</TableCell>}
                  <TableCell >VT</TableCell>
                  {(quoterProcess!=='View') && <TableCell>Del</TableCell>}
                </TableRow>
              </TableHead>


              <TableBody>
                {rows.map((row,count) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell >{row.quantity}</TableCell>
                    {!isScreenCel &&<TableCell >{row.unitPrice.toLocaleString('es-CO')}</TableCell>}
                    <TableCell >{row.total.toLocaleString('es-CO')}</TableCell>
                    
                    {(quoterProcess!=='View') && <TableCell >
                      <Button 
                        onClick={(event)=> deleteProductList(event,row.productSku)}
                         >
                        <DeleteOutline sx={{fontSize: 25, mr:0}}/>
                      </Button>
                    </TableCell>}

                  </TableRow>
                ))}


              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        <Grid container  spacing={2}  alignItems='center'>
            <Grid item xs={12}  md={4}>
                <TableContainer component={Paper} sx={{marginTop:2}}>
                    <Table>
                        <TableBody>
                        <TableRow>
                            <TableCell colSpan={1}>TOTAL COP</TableCell>
                            <TableCell align="center">$ {activeQuoter.total.toLocaleString('es-CO')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={1}>PV:</TableCell>
                            <TableCell align="center">{activeQuoter.pv}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </>
  )
}
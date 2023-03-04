
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuoterProcess, setActiveProductToEdit, setActiveCategoryToAdd, setActiveQuoter, setActiveQuoterToEdit, setInitialQuoter, setNavBarSelection } from "../../store/quoter/quoterSlice"
import { startLoadingCategories, startLoadingProducts, startLoadingQuoters, startLoadingQuotersDefault } from "../../store/quoter/thunks"
import { CheckingAuth } from "../../ui/components/CheckingAuth"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditViewCategory } from "../views/NewEditViewCategory"
import { NewEditViewProduct } from "../views/NewEditViewProduct"
import { NewEditViewQuoter } from "../views/NewEditViewQuoter"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { ViewAddProductsQuoter } from "../views/ViewAddProductsQuoter"


export const QuoterPage = () => {

  console.log('estoy en QuoterPage')
 
  const dispatch=useDispatch();
  
  const { quoterProcess, activeQuoter, isAddProductQuoterProcess,
     quotersLoaded, quotersDefaultLoaded ,productsLoaded, categoriesLoaded, navBarSelection,

     quoters, products, categories,
    }= useSelector(state=>state.quoter)
  const{user}= useSelector(state=> state.auth)
  //const isHired = user.rol=='user'||isAddProductQuoterProcess ?{ display: 'none' } :{ display: '' }
  const isHired = isAddProductQuoterProcess ?{ display: 'none' } :{ display: '' }



  useEffect(()=>{ 
    console.log('**********************primer useEffect QuoterPage')
    dispatch(setQuoterProcess('Edit'))
    dispatch(setNavBarSelection('quoters'))

    if(productsLoaded!=='ok'|| categoriesLoaded!=='ok' ){
        console.log('aun cargando Loadings') 
        dispatch(startLoadingCategories())
        dispatch(startLoadingProducts())     
        //dispatch(startLoadingQuoters(user.id))  
        //dispatch(setQuoterProcess('View'))
    }
    dispatch(setQuoterProcess('View'))
  },[]);
 
  console.log('quotersLoaded before',quotersLoaded)
  useEffect(()=>{ 
    if(productsLoaded==='ok' && !quotersLoaded){
        console.log('Voy a cargar quoters')
        dispatch(startLoadingQuoters(user.id, products))  
        dispatch(startLoadingQuotersDefault(products))  
    }
  },[products]);


  if(productsLoaded!=='ok')     return(<h3>Upload quoter-page... productsLoaded</h3>)
  if(categoriesLoaded!=='ok')   return(<h3>Upload quoter-page...categoriesLoaded</h3>)
  if(!quotersLoaded)            return(<h3>Upload quoter-page...quotersLoaded</h3>)
  if(!quotersDefaultLoaded)     return(<h3>Upload quoter-page...quotersLoaded Default</h3>)
  console.log('quotersLoaded afeter',quotersLoaded)

  

    
  const startCreate=()=>{

    console.log('voy a crear un nuevo quoter')
    
    //if (activeQuoter){
      console.log(' resetiando activeQuoter')
      const quoterReset={
        id:'temp',
        title:'',
        description:'',
        products:[],
        total:0,
      }
      dispatch(setInitialQuoter(quoterReset));
      dispatch(setActiveQuoter(quoterReset));
      dispatch(setActiveQuoterToEdit({title:'', description:''}));
    //}
    dispatch(setQuoterProcess('Create'));
  } 



  return (
    <QuoterLayout>    
      { 
        activeQuoter
          ? isAddProductQuoterProcess
            ? <ViewAddProductsQuoter/>
            : <NewEditViewQuoter/>
          : <NothingSelectedView/>
      } 
      
      
      
      <IconButton
        disabled={quoterProcess=='Create'}
        style={isHired}
        onClick={startCreate}
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover':{backgroundColor: 'error.main', 
                    opacity:0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}>
      <AddOutlined sx={{fontSize:30}}/>  
      </IconButton>
    </QuoterLayout>
  )
}


import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuoterProcess, setActiveProductToEdit, setActiveCategoryToAdd, setNavBarSelection, setActiveProduct } from "../../store/quoter/quoterSlice"
import { startLoadingCategories, startLoadingProducts, startLoadingQuoters, startLoadingQuotersDefault } from "../../store/quoter/thunks"
import { QuoterLayout } from "../layout/QuoterLayout"
import { NewEditViewCategory } from "../views/NewEditViewCategory"
import { NewEditViewProduct } from "../views/NewEditViewProduct"
import { NothingSelectedView } from "../views/NothingSelectedView"



export const ProductCategoryPage = () => {


  console.log('=======================estoy en ProductCategoryPage')

  const dispatch=useDispatch();
  const { productsLoaded, categoriesLoaded, quotersLoaded, quotersDefaultLoaded,
    activeProduct, activeCategory, quoterProcess, selection, products}= useSelector(state=>state.quoter)
  const{user}= useSelector(state=> state.auth)
  const isHired = user.rol=='user' ?{ display: 'none' } :{ display: '' }


  useEffect(()=>{ 
   // console.log('products and categorues loader in ProductsPage ', productsLoaded, categoriesLoaded)
    dispatch(setNavBarSelection('products'))
    if(productsLoaded!=='ok'|| categoriesLoaded!=='ok' ){
        dispatch(startLoadingCategories())
        dispatch(startLoadingProducts())     
        //dispatch(startLoadingQuoters(user.id))     
    }
    //dispatch(setActiveQuoter(undefined))
    dispatch(setQuoterProcess('View'))
    dispatch(setActiveProduct(products[0]))
    
  },[]);

  useEffect(()=>{ 
    if(productsLoaded==='ok' && !quotersLoaded){
       // console.log('Voy a cargar quoters')
        dispatch(startLoadingQuoters(user.id, products));
        dispatch(startLoadingQuotersDefault(products))  
    }
  },[products]);



  if(productsLoaded!=='ok')     return(<h3>Upload Prd-cate-Page ... productsLoaded</h3>)
  if(categoriesLoaded!=='ok')   return(<h3>Upload Prd-cate-Page ...categoriesLoaded</h3>)
  if(!quotersLoaded)            return(<h3>Upload Prd-cate-Page ...quotersLoaded</h3>)
  if(!quotersDefaultLoaded)     return(<h3>Upload quoter-page...quotersLoaded Default</h3>)




  const startCreate=()=>{ 
    dispatch(setQuoterProcess('Create'));
    
    if(activeProduct){
      const productReset =   {
        id: '',
        title: '',
        pricepublic: '',
        price15: '',
        price25: '',
        price35: '',
        price42: '',
        price50: '',
        pv: '',
        sku: '',
        image:'',
        description: '',
        categoryId: activeProduct.category.id
      };    
       dispatch(setActiveProductToEdit(productReset));
    }

    if(activeCategory){
      const categoryReset = {
        title: '',        
        description: '',
      };    
       dispatch(setActiveCategoryToAdd(categoryReset));
    }
  }

  /*useEffect(() => {
    dispatch(setActiveQuoter(undefined))
    dispatch(setQuoterProcess('View'))
    dispatch(setActiveProduct(products[0]))
  }, []) */
  


  return (
    <QuoterLayout>     
      {
        (productsLoaded && categoriesLoaded)
          ? selection==='product'
              ? activeProduct
                ? <NewEditViewProduct />
                : <NothingSelectedView />
              : activeCategory
                ? <NewEditViewCategory/>
                : <NothingSelectedView />
          : <NothingSelectedView />
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

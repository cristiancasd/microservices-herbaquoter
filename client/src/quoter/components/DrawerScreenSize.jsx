import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,  } from 'react-redux/es/exports'
import { handleMobileOpen,setScreenCel} from '../../store/quoter/quoterSlice'
import useMediaQuery from '@mui/material/useMediaQuery';
import { SideBarItemCategories } from './SideBarItemCategories'
import { SideBarItemProducts } from './SideBarItemProducts'
import { SideBarItemQuoters } from './SideBarItemQuoters'
import { SideBarItemDefaultQuoters } from './SideBarItemDefaultQuoters';

const initArray=[]
export const DrawerScreenSize = (data) => {

  const [toShowMainMenu, setToShowMainMenu]= useState([]);
  const [toShowSideBarComplete, setToShowSideBarComplete]= useState([]);

  const [menuProducts, setMenuProducts]= useState([]);
  const [menuQuoters, setMenuQuoters]= useState([]);
  const [menuSearch, setMenuSearch]= useState(undefined)

  const [onUpdateMenu, setOnUpdatemenu]= useState(true);


  const {mobileOpen, isScreenCel, categories, products, quoters, activeQuoter, navBarSelection, quotersDefault} = useSelector(state => state.quoter) 
  const{userName, menuProductosCategorias, drawerWidth }=data;
  const dispatch = useDispatch();
 
 
  const onSearch=({target})=>{
    const toSearch=target.value.toLowerCase();
        if(toSearch===''){
          setMenuSearch(undefined)
          setOnUpdatemenu(!onUpdateMenu);
          return
        }

        let toShowMenuSearch=[]
        if(navBarSelection==='quoters'){

          const quotersMatchesUser = quoters.filter(element => {
            if (element.title.toLowerCase().includes(toSearch)) 
               return true;
          });
          quotersMatchesUser.map(quoter=>
              toShowMenuSearch.push(<SideBarItemQuoters key={quoter.id}{ ...quoter}/>))
          
          const quotersMatchesDefault = quotersDefault.filter(element => {
            if (element.title.toLowerCase().includes(toSearch)) 
                return true;
            });
          quotersMatchesDefault.map(quoter=>
            toShowMenuSearch.push(<SideBarItemDefaultQuoters key={quoter.id}{ ...quoter}/>))
          
        }else{
          const categoriesMatches = categories.filter(element => {
            if (element.title.toLowerCase().includes(toSearch)) 
                  return true;
          });
          const productsMatches = products.filter(element => {
              if (element.title.toLowerCase().includes(toSearch)) 
                return true;
          });
            categoriesMatches.map(category =>
              toShowMenuSearch.push(<SideBarItemCategories key={category.id}{ ...category}/>))
            productsMatches.map(product=>
              toShowMenuSearch.push(<SideBarItemProducts key={product.id}{ ...product }/>))    
        }
        setMenuSearch(toShowMenuSearch);
        setOnUpdatemenu(!onUpdateMenu);
  }

  //console.log('Definiendo menuDefaultQuoter')
  const menuDefaultQuoter=quotersDefault.map(quoter=>{
    return (<SideBarItemDefaultQuoters key={quoter.id}{ ...quoter}/>)
  }
  )

//Update menu when array quoters changes
useEffect(() => {
  //console.log('un nuevo menu de quoters')
  
  let menuQuotersTemporal=[]
    quoters.map(quoter=>
      menuQuotersTemporal.push(<SideBarItemQuoters key={quoter.id}{ ...quoter}/>)
    )
    //console.log('***==**===** ', {menuQuotersTemporal, menuQuoters })

  setMenuQuoters(menuQuotersTemporal)
  setOnUpdatemenu(!onUpdateMenu)
}, [quoters])

//Update menu when array Categories-Products changes

const updateSideBarProductsAndCategories= ()=>{
  let menuProductsTemporal=[]

  categories.map( category => {
    menuProductsTemporal.push(<SideBarItemCategories key={category.id}{ ...category}/>);
      products.map(product=>{ 
          if(product.category.id===category.id){
            menuProductsTemporal.push(<SideBarItemProducts key={product.id}{ ...product }/>);
          }
          return           
      })
    return
    });

    setMenuProducts(menuProductsTemporal)
    setOnUpdatemenu(!onUpdateMenu)
}

useEffect(() => {
  updateSideBarProductsAndCategories()
}, [products])

useEffect(() => {
  updateSideBarProductsAndCategories()
}, [categories])





useEffect(() => {
  //console.log('estoy definiendo el menu')
  //console.log({menuDefaultQuoter, menuQuoters})
 
    const toShow=
  <>
      
      <List> 
          {
            menuSearch
              ? menuSearch
              : navBarSelection=='quoters'
                ? menuQuoters.concat(menuDefaultQuoter)
                : menuProducts
          }
      </List>
  </>
  setToShowSideBarComplete(toShow)
  }, [onUpdateMenu])



const handleDrawerToggle = () => {
  dispatch(handleMobileOpen(!mobileOpen))
};   
const wideScreenBig= (useMediaQuery('(min-width:600px)'))

useEffect(() => {
  if (wideScreenBig=== isScreenCel) dispatch(setScreenCel(!wideScreenBig));
}, [wideScreenBig])


const nameUserAndSearchField=
<>

<Toolbar>
          <Typography variant='h6' noWrap component='div'>
              {userName}
          </Typography>              
      </Toolbar>
      <Divider variant="middle" /> 
      <TextField
                          type='text'
                          variant='filled'
                          fullWidth 
                          name="search"                
                          placeholder="Search"
                          label='Search'
                          onChange={onSearch}
                          sx={{border:'none', mb:1}}
                      />
</>



  
  return (    
    <>
      {
        !isScreenCel
          ? (<Drawer
              variant= "permanent"
              open   
              sx={{ display: { xs: 'block'},'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
              >
              {nameUserAndSearchField}
              {toShowSideBarComplete}               
          </Drawer>)

          : (<Drawer
              variant= "temporary"
              open = {mobileOpen}
              onClose = {handleDrawerToggle}
              ModalProps = {{keepMounted: true,}}   
              sx={{ display: { xs: 'block',sm: 'none'},
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}
              >
              {nameUserAndSearchField}
              {toShowSideBarComplete}
            </Drawer>)
      }
    </>
  )
}
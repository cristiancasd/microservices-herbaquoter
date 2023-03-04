import { TurnedInNot , Stars, StartSharp, GradeOutlined, StarOutlineOutlined, KeyboardArrowRightOutlined} from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { handleMobileOpen, setActiveProduct, setActiveProductToEdit} from '../../store/quoter/quoterSlice'


export const SideBarItemProducts = (product) => {

  const {mobileOpen, isScreenCel} = useSelector(state => state.quoter) 

  const {title, description}=product;
  const dispatch = useDispatch();
  
  const newTitle = useMemo(() => {
    return title.length>15 
                ? title.substring(0,15)+'...'
                : title;
  }, [title])

  const newBody = useMemo(() => {
    return description.length>80
                ? description.substring(0,80)+'...'
                : description;
  }, [description])



  const onClickProduct =()=>{
      dispatch(setActiveProduct(product))
      const {user, category, isactive, ...resto}=product;
      const productToEdit={ ...resto, categoryId: product.category.id}
      dispatch(setActiveProductToEdit(productToEdit));
      
      if(isScreenCel) dispatch(handleMobileOpen(!mobileOpen));
    }

  return (    
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickProduct}>
          <ListItemIcon>
              <KeyboardArrowRightOutlined  />
          </ListItemIcon>
              <Grid container>
                  <ListItemText primary={ newTitle } />
                  <ListItemText secondary={ newBody } />
              </Grid>
        </ListItemButton>
      </ListItem>
  )
}
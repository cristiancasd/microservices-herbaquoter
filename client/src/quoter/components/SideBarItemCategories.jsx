import { TurnedInNot } from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleMobileOpen, setActiveCategory } from '../../store/quoter/quoterSlice';


export const SideBarItemCategories = (category) => {
  const {mobileOpen, isScreenCel} = useSelector(state => state.quoter) 
  const {title, id, description}=category;
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



  const onClickCategory =()=>{
    dispatch(setActiveCategory(category))  
    const {user, isactive, ...categoryToEdit}=category;
    if (isScreenCel) dispatch(handleMobileOpen(!mobileOpen))
  }

  return (    
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickCategory}>
              <Grid container>
                  <ListItemText primary={ newTitle } />
              </Grid>
        </ListItemButton>
      </ListItem> 
  )
}
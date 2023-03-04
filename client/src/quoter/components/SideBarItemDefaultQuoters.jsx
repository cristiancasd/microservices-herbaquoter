import { TurnedInNot , Stars, StartSharp, ArrowBack, StarOutlineOutlined, CalculateOutlined} from '@mui/icons-material'
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar,  } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { handleMobileOpen,  setActiveQuoterToEdit, setActiveQuoter, setIsAddProductQuoterProcess, setQuoterProcess, setQuoterSelected} from '../../store/quoter/quoterSlice'


export const SideBarItemDefaultQuoters = (quoter) => {

  const {mobileOpen, isScreenCel} = useSelector(state => state.quoter) 

  const {title, description}=quoter;
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


  const onClickQuoter =()=>{

      dispatch(setActiveQuoter({...quoter, isDefaultQuoter: true}))
      dispatch(setActiveQuoterToEdit({title:quoter.title, description:quoter.description}))
      //dispatch(setQuoterSelected(quoter))
      dispatch(setIsAddProductQuoterProcess(false))
      dispatch(setQuoterProcess('View'))
      if(isScreenCel) dispatch(handleMobileOpen(!mobileOpen));
    }

  return ( 
  
      
      <ListItem 
      disablePadding>
        <ListItemButton onClick={onClickQuoter}>
          <ListItemIcon>
            <StarOutlineOutlined />
          </ListItemIcon>
              <Grid container>
                  <ListItemText primary={ newTitle } />
                  <ListItemText secondary={ newBody } />
              </Grid>
        </ListItemButton>
      </ListItem>
  )
}
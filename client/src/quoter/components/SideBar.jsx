import { DirectionsRailwayFilledSharp, MenuOutlined } from "@mui/icons-material"
import { Divider, Drawer, Grid, IconButton, List, ListItem, 
    ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useMemo, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startLoadingCategories, startLoadingProducts, startLoadingQuoters, } from "../../store/quoter/thunks"
import { DrawerScreenSize } from "./DrawerScreenSize"    

export const SideBar = ({drawerWidth= 240}) => {
    
    const {user} = useSelector(state => state.auth) 
    
    const variablesDrawer={
        userName: user.name,
        drawerWidth
    }

    console.log('vamos a renderizar SideBar')
      
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink:{sm:0}}}>
       {
        <DrawerScreenSize key={'123'}{ ...variablesDrawer }/>
       }
    </Box>
  )

  

}



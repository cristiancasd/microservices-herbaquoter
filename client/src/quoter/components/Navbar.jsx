import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { Link} from "react-router-dom";
import { startLogout } from "../../store/auth/thunks";
import { handleMobileOpen, setDefaultInitalVariablesRedux, setNavBarSelection } from "../../store/quoter/quoterSlice";


const pages = ['Quoter', 'Categ/Prod', 'Admin'];
const settings = ['Profile', 'Edit Profile', 'Logout'];

export const Navbar = ({drawerWidth=240}) => {
  const dispatch = useDispatch();  

  const {mobileOpen, navBarSelection } = useSelector(state => state.quoter)
  const {user } = useSelector(state => state.auth)
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 

  const logout = () => { 
    dispatch(startLogout())
    setAnchorElUser(null);
    dispatch(setDefaultInitalVariablesRedux())
  }

  const handleDrawerToggle = () => { 
    dispatch(handleMobileOpen(!mobileOpen))  
  }


  

  
  return (
    <AppBar      
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm:`${drawerWidth}px`}
      }}>
      
      <Toolbar>
        <IconButton            
            color='inherit'
            edge="start"
            sx={{mr: 2, display: {sm:'none'}}}
            onClick={handleDrawerToggle}>
          <MenuOutlined />
        </IconButton>
        
        <Grid container direction='row' justifyContent='space-between'>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
          
          <Link to="/quoter">
            <Button
              onClick={()=>dispatch(setNavBarSelection('quoters'))} 
              sx={{ my: 2, color: 'white', display: 'block', }}
              variant={navBarSelection=='quoters' ? 'contained' :''}
              color='personal'
                > Quoter     
            </Button>
          </Link>

          
          <Link to="/products">
            <Button sx={{ my: 2, color: 'white', display: 'block' }}
              variant={navBarSelection=='products' ? 'contained' :''}
              color='personal'
              >
                    Products
            </Button>
          </Link>
          </Box>


          <Box sx={{ flexGrow: 0, display: 'flex'}}
          >
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key='editProfile' onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Edit Profile</Typography>
                </MenuItem>
                <MenuItem key='logout' onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
          </Box>

        </Grid>

      </Toolbar>
    </AppBar>
  )
}

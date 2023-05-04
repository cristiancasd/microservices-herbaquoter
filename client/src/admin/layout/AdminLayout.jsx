import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Navbar } from '../../components/Navbar';

const drawerWidth = 0;

export const AdminLayout = ({ children }) => {
  console.log('estoy en Admin Layout');
  return (
    <Box sx={{ display: 'flex' }}>
      {<Navbar drawerWidth={drawerWidth} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

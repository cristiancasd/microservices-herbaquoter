import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSearch } from '../../store/searcher/searcherSlice';

export const ButtonsProcess = (props) => {
  const dispatch = useDispatch();
  const { currentSearch } = useSelector((state) => state.searcher);

  //const [currentSearch, setCurrentSearch] = useState('General Info');

  const buttonsControll = (
    <Grid container spacing={0} alignItems="center" marginBottom="20px">
      <Grid item xs={4}>
        <Button
          onClick={() => dispatch(setCurrentSearch('users'))}
          variant={currentSearch === 'users' ? 'contained' : 'outlined'}
          fullWidth
        >
          USERS
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => dispatch(setCurrentSearch('quoters'))}
          variant={currentSearch === 'quoters' ? 'contained' : 'outlined'}
          fullWidth
        >
          QUOTERS
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => dispatch(setCurrentSearch('products'))}
          variant={currentSearch === 'products' ? 'contained' : 'outlined'}
          fullWidth
        >
          PRODUCTS
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Typography
        sx={{ fontWeight: 'bold' }}
        display="block"
        variant="h7"
        align="center"
        marginTop={'10px'}
        marginBottom={'10px'}
      >
        ¿ What do you want manage ?
      </Typography>
      {buttonsControll}
    </>
  );
};

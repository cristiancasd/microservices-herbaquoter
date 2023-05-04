import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFindUser } from '../../store/auth/thunks';
import { setWordToSearch } from '../../store/searcher/searcherSlice';

export const SearcherBox = (props) => {
  const dispatch = useDispatch();
  const { currentSearch } = useSelector((state) => state.searcher);

  const [input, setInput] = useState('');

  const searchInfo = () => {
    console.log('vamos a buscar:', input);
    //dispatch(setWordToSearch(input))
    dispatch(startFindUser(input));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10} sx={{ mt: 2 }}>
        <TextField
          size="small"
          id="standard-basic"
          label="Searcher"
          placeholder="ID or email"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={searchInfo} fullWidth disabled={input === '' && true}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

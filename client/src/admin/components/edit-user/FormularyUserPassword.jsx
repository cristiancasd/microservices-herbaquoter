import { Visibility, VisibilityOff, VisibilityOffOutlined } from '@mui/icons-material';
import { Alert, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const FormularyUserPassword = (props) => {
  const { onInputChange, password, passwordValid, password2, password2Valid } = props;

  const { errorMessage } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    errorMessage && setAlert(<Alert severity="error">{errorMessage}</Alert>);
  }, [errorMessage]);

  useEffect(() => {
    alert !== '' &&
      setTimeout(() => {
        setAlert('');
      }, 4000);
  }, [alert]);

  const sxConfig = { border: 'none', mb: 1 };

  const handleClickShowPassword = (option) => {
    option === 'new' ? setShowPassword((show) => !show) : setShowPassword2((show) => !show);
  };

  return (
    <Stack
      sx={{
        width: '100%',
        minWidth: { xs: '300px', sm: '360px', md: '400px' },
        maxWidth: { xs: '300px', sm: '360px', md: '400px' },
        gap: '1.5rem',
      }}
    >
      <Grid item xs={12} md={12}>
        <Typography fontSize={12} marginBottom="10px">
          * The password must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase
        </Typography>

        {/*new password */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10} md={11}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              variant="filled"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && password.length >= 1}
              helperText={password.length >= 1 && passwordValid}
              placeholder="New Password"
              label="New Password"
              sx={sxConfig}
              autoComplete="new-password"
              required
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <IconButton onClick={() => handleClickShowPassword('new')}>
              {' '}
              {showPassword ? <VisibilityOffOutlined /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>

        {/*confirm password */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10} md={11}>
            <TextField
              type={showPassword2 ? 'text' : 'password'}
              variant="filled"
              fullWidth
              name="password2"
              value={password2}
              onChange={onInputChange}
              error={!!password2Valid && password2.length >= 1}
              helperText={password2.length >= 1 && password2Valid}
              placeholder="Confirm new Password"
              label="Confirm new Password"
              sx={sxConfig}
              required
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton onClick={() => handleClickShowPassword('new2')}>
              {' '}
              {showPassword2 ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      {alert}
    </Stack>
  );
};

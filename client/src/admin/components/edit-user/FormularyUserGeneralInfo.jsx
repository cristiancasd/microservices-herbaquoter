import { Edit, SettingsBackupRestore, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';

const levels = [
  { level: 'cliente-15', name: 'Preferencial 15%' },
  { level: 'cliente-25', name: 'Preferencial 25%' },
  { level: 'cliente-35', name: 'Preferencial 35%' },
  { level: 'distribuidor-25', name: 'Distribuitor 25%' },
  { level: 'distribuidor-35', name: 'Distribuitor 35%' },
  { level: 'distribuidor-42', name: 'Distribuitor 42%' },
  { level: 'supervisor', name: 'Supervisor 50%' },
];

const roles = [
  { rol: 'user', name: 'User' },
  { rol: 'admin', name: 'Admin' },
  { rol: 'super-admin', name: 'Super Admin' },
];

function BoldText({ children }) {
  return <span style={{ fontWeight: 'bold' }}>{children}</span>;
}

export const FormularyUserGeneralInfo = (props) => {
  const { formSubmitted, onInputChange, resetAll, user, formState } = props;
  const { country, name, herbalifeLevel, rol, email } = formState;

  const [disabledFieldsGeneralInfo, setDisabledFieldsGeneralInfo] = useState(true);

  const sxConfig = { border: 'none', mb: 1 };
  const sxEditButtom = {
    color: 'white',
    backgroundColor: 'personal.main',
    ':hover': {
      backgroundColor: 'personal.main',
      opacity: 0.9,
    },
  };

  useEffect(() => {
    disabledFieldsGeneralInfo && resetAll();
  }, [disabledFieldsGeneralInfo]);

  return (
    <Stack
      sx={{
        width: '100%',
        minWidth: { xs: '300px', sm: '360px', md: '400px' },
        maxWidth: { xs: '300px', sm: '360px', md: '400px' },

        //gap: '0.2rem',
      }}
    >
      <Typography fontSize={10} marginBottom="15px">
        <BoldText>App Id:</BoldText> {user.id}
      </Typography>

      <Divider variant="middle" />

      <Grid container spacing={2} alignItems="center">
        {/* Text */}
        {disabledFieldsGeneralInfo && (
          <Grid item xs={10} md={11}>
            <Typography fontSize={15} marginBottom="5px">
              <BoldText>Email:</BoldText> {user.email}
            </Typography>

            <Typography fontSize={15} marginBottom="5px">
              <BoldText>Name:</BoldText> {user.name}
            </Typography>
            <Typography fontSize={15} marginBottom="5px">
              <BoldText>Level:</BoldText> {user.herbalifeLevel}
            </Typography>
            <Typography fontSize={15} marginBottom="5px">
              <BoldText>Role:</BoldText> {user.rol}
            </Typography>
            <Typography fontSize={15} marginBottom="5px">
              <BoldText>Country:</BoldText> {user.country}
            </Typography>
          </Grid>
        )}

        {/* text Fields */}
        {!disabledFieldsGeneralInfo && (
          <Grid item xs={10} md={11} marginTop="15px">
            {/**name */}
            <Grid item marginBottom="10px">
              <TextField
              size="small"
                type="text"
                variant="filled"
                fullWidth
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Name"
                label="Name"
                inputProps={{ readOnly: disabledFieldsGeneralInfo }}
                sx={sxConfig}
                required
              />
            </Grid>

            {/**email */}
            <Grid item marginBottom="10px">
              <TextField
              size="small"
                type="email"
                variant="filled"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="Email"
                label="Email"
                inputProps={{ readOnly: disabledFieldsGeneralInfo }}
                sx={sxConfig}
                required
              />
            </Grid>

            {/**country */}
            <Grid item>
              <TextField
              size="small"
                type="text"
                variant="filled"
                fullWidth
                name="country"
                value={country}
                onChange={onInputChange}
                placeholder="Country"
                label="Country"
                inputProps={{ readOnly: disabledFieldsGeneralInfo }}
                sx={sxConfig}
                required
              />
            </Grid>

             {/**herbalifeLevel */}
             <Grid item marginBottom="10px">
              <FormControl fullWidth>
                <InputLabel id="herbalifelevel_">Select your Herbalife level</InputLabel>
                <Select
                size="small"
                  fullWidth
                  labelId="herbalifelevel_"
                  id="herbalifeLevel"
                  label="Select your Herbalife level"
                  onChange={onInputChange}
                  value={herbalifeLevel}
                  name="herbalifeLevel"
                  inputProps={{ readOnly: disabledFieldsGeneralInfo }}
                  sx={sxConfig}
                  required
                >
                  {levels.map((data) => (
                    <MenuItem key={data.level} value={data.level}>
                      {data.level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/**Role */}
            <Grid item marginBottom="10px">
              <FormControl fullWidth>
                <InputLabel id="role_">Select Role</InputLabel>
                <Select
                size="small"
                  fullWidth
                  labelId="role_"
                  id="rol"
                  label="Select Role"
                  onChange={onInputChange}
                  value={rol}
                  name="rol"
                  inputProps={{ readOnly: disabledFieldsGeneralInfo }}
                  sx={sxConfig}
                  required
                >
                  {roles.map((data) => (
                    <MenuItem key={data.rol} value={data.rol}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {/**Buttons Save or Cancel */}
        <Grid item xs={2} md={1}>
          {disabledFieldsGeneralInfo && (
            <IconButton onClick={() => setDisabledFieldsGeneralInfo(false)} sx={sxEditButtom} title="edit">
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          )}
          {!disabledFieldsGeneralInfo && (
            <IconButton onClick={() => setDisabledFieldsGeneralInfo(true)} sx={sxEditButtom} title="back">
              <SettingsBackupRestore sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

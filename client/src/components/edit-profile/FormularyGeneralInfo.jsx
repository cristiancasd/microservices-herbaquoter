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

function BoldText({ children }) {
  return <span style={{ fontWeight: 'bold' }}>{children}</span>;
}

export const FormularyGeneralInfo = (props) => {
  const { formSubmitted, onInputChange, oldPassword, oldPasswordValid, country, name, herbalifeLevel, user, resetAll } =
    props;

  const [disabledFieldsGeneralInfo, setDisabledFieldsGeneralInfo] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);

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
            <Typography fontSize={15} marginBottom="5px" marginTop="15px">
              <BoldText>Role:</BoldText> {user.rol}
            </Typography>
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
              <BoldText>Country:</BoldText> {user.country}
            </Typography>
          </Grid>
        )}

        {/* text Fields */}
        {!disabledFieldsGeneralInfo && (
          <Grid item xs={10} md={11} marginTop="15px">
            <Grid item marginBottom="10px">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={11} md={11}>
                  <TextField
                    type={showOldPassword ? 'text' : 'password'}
                    variant="filled"
                    fullWidth
                    name="oldPassword"
                    value={oldPassword}
                    onChange={onInputChange}
                    error={!!oldPasswordValid && oldPassword.length >= 1}
                    helperText={oldPassword.length >= 1 && oldPasswordValid}
                    placeholder="Write your current Password"
                    label="current Password"
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

                <Grid item xs={1} md={1}>
                  <IconButton onClick={() => setShowOldPassword((show) => !show)}>
                    {' '}
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item marginBottom="10px">
              <TextField
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

            <Grid item marginBottom="10px">
              <FormControl fullWidth>
                <InputLabel id="herbalifelevel_">Select your Herbalife level</InputLabel>
                <Select
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

            <Grid item>
              <TextField
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
          </Grid>
        )}

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

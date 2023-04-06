import { useEffect, useRef, useState } from 'react';

import { Alert, Button, Divider, FormControl, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useForm } from '../../../hooks/useForm';
import {
  CloseOutlined,
  Edit,
  ImageSearchOutlined,
  SettingsBackupRestore,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
} from '@mui/icons-material';
import { isTargetFilesCorrect } from '../../../helpers/validFile';
import { startEditProfile, startUploadingFiles } from '../../../store/auth/thunks';

const levels = [
  { level: 'cliente-15', name: 'Preferencial 15%' },
  { level: 'cliente-25', name: 'Preferencial 25%' },
  { level: 'cliente-35', name: 'Preferencial 35%' },
  { level: 'distribuidor-25', name: 'Distribuitor 25%' },
  { level: 'distribuidor-35', name: 'Distribuitor 35%' },
  { level: 'distribuidor-42', name: 'Distribuitor 42%' },
  { level: 'supervisor', name: 'Supervisor 50%' },
];

const formValidations = {
  email: [(value) => value.includes('@'), 'must be have the character @'],
  oldPassword: [(value) => value.length >= 6, 'must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase'],
  password: [(value) => value.length >= 6, 'must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase'],
  password2: [(value) => value === formData.password, 'new passwords do not match'],
};

export const DialogEditProfile = ({ openEditProfile, handleCloseEditProfile, user }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentEdit, setCurrentEdit] = useState('General Info');
  const { errorMessage, successMessage } = useSelector((state) => state.auth);

  // Change profile Info
  const [disabledFieldsGeneralInfo, setDisabledFieldsGeneralInfo] = useState(true);

  // Change profile photo
  const [imageFile, setImageFile] = useState(undefined);
  const [alert, setAlert] = useState('');
  const [alertOk, setAlertOk] = useState('');
  const fileInputRef = useRef();

  //change password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    errorMessage && setAlert(<Alert severity="error">{errorMessage}</Alert>);
  }, [errorMessage]);

  useEffect(() => {
    successMessage && handleCloseEditProfile();
  }, [successMessage]);

  const handleClickShowPassword = (option) => {
    option === 'old'
      ? setShowOldPassword((show) => !show)
      : option === 'new'
      ? setShowPassword((show) => !show)
      : setShowPassword2((show) => !show);
  };

  const dispatch = useDispatch();

  const {
    oldPassword,
    oldPasswordValid,
    password,
    passwordValid,
    password2,
    password2Valid,
    country,
    countryValid,
    name,
    nameValid,
    herbalifeLevel,
    herbalifeLevelValid,
    image,
    isFormValid,
    formState,
    onInputChange,
    onResetForm,
  } = useForm(user, formValidations);

  const saveDisabled =
    currentEdit === 'Password'
      ? !isFormValid
        ? true
        : false
      : currentEdit === 'General Info'
      ? oldPasswordValid || nameValid || herbalifeLevelValid
        ? true
        : false
      : !imageFile
      ? true
      : false;

  const resetAll = () => {
    onResetForm();
    setFormSubmitted(false);
    setImageFile(undefined);
    setAlertOk('');
    setDisabledFieldsGeneralInfo(true);
  };

  useEffect(() => {
    resetAll();
  }, [currentEdit]);

  useEffect(() => {
    disabledFieldsGeneralInfo && resetAll();
  }, [disabledFieldsGeneralInfo]);

  const onChargeImage = ({ target }) => {
    if (isTargetFilesCorrect(target.files)) {
      setImageFile(target.files);
      setAlertOk(
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setImageFile(undefined);
                setAlertOk('');
              }}
            >
              <CloseOutlined fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {'File to upload ' + target.files[0].name}
        </Alert>
      );
    } else {
      setAlert(<Alert severity="error">{'The file must be |.jpg |.jpeg |.png'}</Alert>);
    }
  };

  const onSave = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (currentEdit !== 'Profile Photo') {
      if (currentEdit === 'Password') {
        if (!isFormValid) return;
        const userNormaliced = {
          //...formState,
          country,
          fullname: name,
          password: oldPassword,
          newPassword: password,
          herbalifelevel: herbalifeLevel,
        };
        dispatch(startEditProfile(userNormaliced));
      }

      if (currentEdit === 'General Info') {
        if (oldPasswordValid || nameValid || herbalifeLevelValid) return;
        const userNormaliced = {
          //...formState,
          country,
          fullname: name,
          password: oldPassword,
          herbalifelevel: herbalifeLevel,
        };
        dispatch(startEditProfile(userNormaliced));
      }
    } else {
      dispatch(startUploadingFiles(imageFile));
    }
  };

  function BoldText({ children }) {
    return <span style={{ fontWeight: 'bold' }}>{children}</span>;
  }

  const sxConfig = { border: 'none', mb: 1 };
  const sxEditButtom = {
    color: 'white',
    backgroundColor: 'personal.main',
    ':hover': {
      backgroundColor: 'personal.main',
      opacity: 0.9,
    },
  };

  const oldPasswordItem = (
    <TextField
      type={showOldPassword ? 'text' : 'password'}
      variant="filled"
      fullWidth
      name="oldPassword"
      value={oldPassword}
      onChange={onInputChange}
      error={!!oldPasswordValid && formSubmitted}
      helperText={formSubmitted && oldPasswordValid}
      placeholder="Write your current Password"
      label="current Password"
      sx={sxConfig}
      required
    />
  );

  const formularyInfo = (
    <>
      <Stack
        sx={{
          width: '100%',
          minWidth: { xs: '300px', sm: '360px', md: '400px' },
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
                {oldPasswordItem}
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
    </>
  );

  const formularyPassword = (
    <>
      <Stack
        sx={{
          width: '100%',
          minWidth: { xs: '300px', sm: '360px', md: '400px' },
          gap: '1.5rem',
        }}
      >
        <Grid item xs={12} md={12}>
          <Typography fontSize={12} marginBottom="10px">
            * The password must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase
          </Typography>

          {/*current password */}

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10} md={11}>
              {oldPasswordItem}
            </Grid>

            <Grid item xs={2} md={1}>
              <IconButton onClick={() => handleClickShowPassword('old')}>
                {' '}
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Grid>
          </Grid>

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
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
                placeholder="New Password"
                label="New Password"
                sx={sxConfig}
                autoComplete="new-password"
                required
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
                error={!!password2Valid && formSubmitted}
                helperText={formSubmitted && password2Valid}
                placeholder="Confirm new Password"
                label="Confirm new Password"
                sx={sxConfig}
                required
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
    </>
  );

  const formularyImage = (
    <>
      <Stack
        sx={{
          width: '100%',
          minWidth: { xs: '300px', sm: '360px', md: '400px' },
          gap: '1.5rem',
        }}
      >
        {image !== '' && (
          <Grid item xs={12} md={12} marginBottom="0px" backgroundColor="gree">
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImageList sx={{ width: 200 }} cols={0}>
                <ImageListItem key={'algo'}>
                  <img
                    src={`${!imageFile ? image : URL.createObjectURL(imageFile[0])}`}
                    srcSet={`${!imageFile ? image : imageFile[0]}`}
                    alt={name}
                    loading="lazy"
                  />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        )}

        <input type="file" multiple ref={fileInputRef} onChange={onChargeImage} style={{ display: 'none' }} />

        {alert}
        {alertOk}
        {!imageFile && (
          <Button onClick={() => fileInputRef.current.click()} variant={'outlined'} fullWidth>
            {' '}
            <ImageSearchOutlined />
          </Button>
        )}
      </Stack>
    </>
  );

  const buttonsControll = (
    <Grid container spacing={0} alignItems="center" marginBottom="20px">
      <Grid item xs={4}>
        <Button
          onClick={() => setCurrentEdit('General Info')}
          variant={currentEdit === 'General Info' ? 'contained' : 'outlined'}
          fullWidth
        >
          Info
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => setCurrentEdit('Password')}
          variant={currentEdit === 'Password' ? 'contained' : 'outlined'}
          fullWidth
        >
          Password
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => setCurrentEdit('Profile Photo')}
          variant={currentEdit === 'Profile Photo' ? 'contained' : 'outlined'}
          fullWidth
        >
          Photo
        </Button>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    alert !== '' &&
      setTimeout(() => {
        setAlert('');
      }, 4000);
  }, [alert]);

  return (
    <div>
      <Dialog
        open={openEditProfile}
        onClose={handleCloseEditProfile}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"> Edit Profile: {currentEdit} </DialogTitle>

        <form onSubmit={onSave}>
          <DialogContent>
            {buttonsControll}
            {currentEdit === 'General Info'
              ? formularyInfo
              : currentEdit === 'Password'
              ? formularyPassword
              : formularyImage}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditProfile}>Cancel</Button>

            <Button type="submit" onClick={onSave} variant={'contained'} disabled={saveDisabled}>
              SAVE
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

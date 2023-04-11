import { useEffect, useState } from 'react';

import { Alert, Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { FormularyImage } from './FormularyImage';
import { FormularyPassword } from './FormularyPassword';
import { startEditProfile, startEditUser, startUploadingFiles } from '../../store/auth/thunks';
import { FormularyGeneralInfo } from './FormularyGeneralInfo';

const passwordRules = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const formValidations = {
  email: [(value) => value.includes('@'), 'must be have the character @'],
  //oldPassword: [(value) => value.length >= 6, 'must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase'],
  oldPassword: [
    (value) => value.match(passwordRules),
    'must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase',
  ],
  password: [
    (value) => value.match(passwordRules),
    'must have at least 6 characters, 1 number, 1 uppercase, 1 lowercase',
  ],
  password2: [(value) => value === formData.password, 'new passwords do not match'],
};

export const DialogEditProfile = ({ openEditProfile, handleCloseEditProfile, user }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentEdit, setCurrentEdit] = useState('General Info');
  const { successMessage } = useSelector((state) => state.auth);
  const { currentPage } = useSelector((state) => state.common);

  // Change profile photo|
  const [imageFile, setImageFile] = useState(undefined);

  useEffect(() => {
    successMessage && handleCloseEditProfile();
  }, [successMessage]);

  const dispatch = useDispatch();

  const {
    id,
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
  };

  useEffect(() => {
    resetAll();
  }, [currentEdit]);

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
        currentPage === 'manager'
          ? dispatch(startEditUser(userNormaliced, id))
          : dispatch(startEditProfile(userNormaliced));
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
      currentPage === 'manager'
        ? dispatch(startUploadingFiles(imageFile, id))
        : dispatch(startUploadingFiles(imageFile));
    }
  };

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
            {currentEdit === 'General Info' ? (
              <FormularyGeneralInfo
                formSubmitted={formSubmitted}
                onInputChange={onInputChange}
                oldPassword={oldPassword}
                oldPasswordValid={oldPasswordValid}
                name={name}
                herbalifeLevel={herbalifeLevel}
                country={country}
                user={user}
                resetAll={resetAll}
              />
            ) : currentEdit === 'Password' ? (
              <FormularyPassword
                onInputChange={onInputChange}
                oldPassword={oldPassword}
                oldPasswordValid={oldPasswordValid}
                password={password}
                passwordValid={passwordValid}
                password2={password2}
                password2Valid={password2Valid}
              />
            ) : (
              <FormularyImage image={image} imageFile={imageFile} setImageFile={setImageFile} />
            )}
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

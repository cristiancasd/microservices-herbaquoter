//import { quoterApi } from "../../api/quoterApi";
import { quoterApi } from '../../api';
import { getEnvVariables } from '../../helpers/getEnvVariables';
import { startLoadingCategories, startLoadingProducts } from '../quoter/thunks';
import { onResetSearcher, onUsersFinded, updateImageUserFinded, updateUserActivated, updateUserDeleted, updateUsersFinded } from '../searcher/searcherSlice';
import {
  checkingCredentials,
  clearErrorMessage,
  clearSuccessMessage,
  onErrorMessage,
  onLogin,
  onLogout,
  onSuccessMessage,
  onUpdateImageProfile,
} from './authSlice';

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      //const resp=await quoterApi.post ('/auth/login',{email,password})
      const { data } = await quoterApi.post('/auth/login', { email, password });
      const { user } = data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime()); //Hacer manejos de token, calcular cuanto tiempo le queda etc.
      //startLoadingCategories();
      //startLoadingProducts();

      dispatch(
        onLogin({
          name: user.fullname,
          id: user.id,
          rol: user.rol,
          email: email,
          herbalifeLevel: user.herbalifelevel,
          country: user.country,
          image: user.image,
        })
      );
    } catch (error) {
      const errorMesage = existError(error);
      dispatch(onLogout(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);

      /* if(error.response){
                console.log('error en autenticación login usuario y contraseña', error);
                error.response.status==401
                    ? dispatch(onLogout('Invalid Credentials'))
                    : dispatch(onLogout(error.response.data.message.toString()));

            }else{
                dispatch(onLogout('Networwk Error'))
            }
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10); */
    }
  };
};

export const startRegisterWithEmailPassword = (userNewData) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const userNewDataBackend = {};
    for (let clave in userNewData) {
      if (userNewData[clave] !== '' && clave !== 'password2') userNewDataBackend[clave] = userNewData[clave];
    }

    try {
      const { data } = await quoterApi.post('/auth/register', userNewDataBackend);
      const { user, token } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime()); //Hacer manejos de token, calcular cuanto tiempo le queda etc.
      dispatch(
        onLogin({
          name: user.fullname,
          id: user.id,
          rol: user.rol,
          email: user.email,
          herbalifeLevel: user.herbalifelevel,
          country: user.country,
        })
      );
    } catch (error) {
      const errorMesage = existError(error, userNewDataBackend.email);
      dispatch(onLogout(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);

      /*console.log('error register ', error);   
            (error.response.data.message.length===1)
                ? dispatch(onLogout(error.response.data.message[0]))
                : dispatch(onLogout(`The email ${userNewDataBackend.email} already exists`));
            setTimeout(()=>{
                dispatch(clearErrorMessage());
            },10);*/
    }
  };
};

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const chekAuthToken = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const token = localStorage.getItem('token');
    if (!token) dispatch(onLogout());
    try {
      const { data } = await quoterApi.post('auth/check-renew-token');
      const { user } = data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime()); //Hacer manejos de token, calcular cuanto tiempo le queda etc.
      dispatch(
        onLogin({
          name: user.fullname,
          id: user.id,
          rol: user.rol,
          email: user.email,
          herbalifeLevel: user.herbalifelevel,
          country: user.country,
          image: user.image,
        })
      );
    } catch (error) {
      console.log('hubo error', error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    dispatch( onResetSearcher());
   

    localStorage.clear();
    dispatch(onLogout());
  };
};

export const startEditProfile = (userNewData) => {
  console.log('estoy en startEditProfile');

  return async (dispatch) => {
    // dispatch(checkingCredentials());
    const userNewDataBackend = {};
    for (let clave in userNewData) {
      if (userNewData[clave] !== '' && clave !== 'password2') userNewDataBackend[clave] = userNewData[clave];
    }
    console.log('data profile to update ', userNewDataBackend);
    try {
      const { data } = await quoterApi.patch('/auth/editmyprofile', userNewDataBackend);
      console.log('response update my profile', data);
      dispatch(
        onLogin({
          name: data.fullname,
          id: data.id,
          rol: data.rol,
          email: data.email,
          herbalifeLevel: data.herbalifelevel,
          country: data.country,
          image: data.image,
        })
      );
      dispatch(onSuccessMessage('Profile updated'));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMesage = existError(error);

      dispatch(onErrorMessage(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

//*************************** Admin functions ******************************/

export const startEditUser = (userNewData, id) => {
  console.log('estoy en startEditUser');
  return async (dispatch) => {
    // dispatch(checkingCredentials());
    const userNewDataBackend = {};
    for (let clave in userNewData) {
      if (userNewData[clave] !== '' && clave !== 'password2') userNewDataBackend[clave] = userNewData[clave];
    }
    console.log('data user to update ', userNewDataBackend);
    try {
      const { data } = await quoterApi.patch('/auth/admin/edit/' + id, userNewDataBackend);
      console.log('response update user', data);
      dispatch(updateUsersFinded(data));
      dispatch(onSuccessMessage('User updated'));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMesage = existError(error);

      dispatch(onErrorMessage(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

export const startFindUser = (term) => {
  return async (dispatch) => {
    try {
      const { data } = await quoterApi.get('/auth/admin/find/' + term);
      console.log('response GET user', data);

      dispatch(onSuccessMessage('User Finded'));
      dispatch(onUsersFinded(data));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMesage = existError(error);

      dispatch(onErrorMessage(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

export const startUploadingFiles = (files = [], idUser) => {
  const formData = new FormData();
  formData.append('file', files[0]);

  return async (dispatch, getState) => {
    let id=idUser;
   
    if (!id) {
      const { user } = getState().auth;
      id = user.id;
    }

    try {
      const { data } = await quoterApi.patch('/files/user/' + id, formData);

      idUser
      ? dispatch(updateImageUserFinded({id:idUser, image:data.image}))
      : dispatch(onUpdateImageProfile(data.image))
        
      dispatch(onSuccessMessage('Image uploaded'));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMessage = existError(error, 'Image ');
      dispatch(onErrorMessage(errorMessage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

export const startDeleteUser=(idToDelete) => {
  return async (dispatch) => {
    try {
      console.log('deleting user with ID ', idToDelete)
      const { data } = await quoterApi.delete('/auth/delete/' + idToDelete);
      
      console.log('response delete user', data);

      dispatch(onSuccessMessage('User Deleted'));
      dispatch(updateUserDeleted(idToDelete));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMesage = existError(error);

      dispatch(onErrorMessage(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

export const startActivateUser=(term) => {
  return async (dispatch) => {
    try {
      console.log('activating user with ID ', term)
      const { data } = await quoterApi.post('/auth/activate/' + term);
      
      console.log('response activate user', data);

      dispatch(onSuccessMessage('User Activate'));
      dispatch(updateUserActivated(term));
      setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 10);
    } catch (error) {
      const errorMesage = existError(error);

      dispatch(onErrorMessage(errorMesage));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};


//*************************************************************************/

const existError = (error, email = '') => {
  console.log('error register ', error);
  return error.response
    ? error.response.status == 401
      ? 'Invalid Credentials'
      : error.response.data.message.toString()
    : 'Networwk Error';
};

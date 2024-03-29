import { Box, Button, Divider, Grid, ImageList, ImageListItem, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { DialogEditUser } from './edit-user/DialogEditUser';
import { useDispatch } from 'react-redux';
import { startActivateUser, startDeleteUser } from '../../store/auth/thunks';

export const UserItem = (user) => {
  const { fullname, email, herbalifelevel, id, image, isactive, country, rol } = user;
  const dispatch = useDispatch();

  function BoldText({ children }) {
    return <span style={{ fontWeight: 'bold' }}>{children}</span>;
  }
  const [openEditProfile, setOpenEditProfile] = useState(false);

  return (
    <>
      {openEditProfile && (
        <DialogEditUser
          openEditProfile={openEditProfile}
          handleCloseEditProfile={() => setOpenEditProfile(false)}
          user={{
            ...user,
            name: fullname,
            herbalifeLevel: herbalifelevel,
            password: '',
            password2: '',
            oldPassword: '',
          }}
        />
      )}
      <ListItem disablePadding>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '15px',
            marginBottom: '15px',
          }}
        >
          <Grid
            container
            backgroundColor="gree"
            spacing={0}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            //</Box>sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item xs={12} sm={3}>
              <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageList sx={{ width: 200 }} cols={0}>
                  <ImageListItem key={'algo'}>
                    <img src={`${image}`} srcSet={`${image}`} alt={'profile picture'} loading="lazy" />
                  </ImageListItem>
                </ImageList>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={9} paddingLeft="10px">
              <Grid container backgroundColor="yello" rowSpacing={1}>
                <Grid item xs={7} sm={7}>
                  <Typography fontSize={14} display="block" align="left">
                    <BoldText>Name:</BoldText> {fullname}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography fontSize={14} display="block" align="left">
                    <BoldText>Country:</BoldText> {country}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={7}>
                  <Typography fontSize={14} display="block" align="left">
                    <BoldText>Email:</BoldText> {email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography fontSize={14} display="block" align="left">
                    <BoldText>Level:</BoldText> {herbalifelevel}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography fontSize={14} display="block" align="left">
                    <BoldText>Role:</BoldText> {rol}
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={7}>
                  <Typography
                    fontSize={17}
                    sx={{
                      color: isactive ? 'green' : 'error.main',
                    }}
                  >
                    <BoldText>{isactive ? 'Active' : 'Inactive'} </BoldText>
                  </Typography>
                </Grid>
                <Grid item xs={3.5} sm={2.5} backgroundColor="yello" align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setOpenEditProfile(true)}

                    //onClick={searchInfo}
                  >
                    Edit
                  </Button>{' '}
                </Grid>
                {!isactive && (
                  <Grid item xs={3.5} sm={2.5} align="right">
                    <Button
                      variant="outlined"
                      size="small" 
                      onClick={()=>dispatch(startActivateUser(id))}
                    >
                      Activate
                    </Button>{' '}
                  </Grid>
                )}
                {isactive && (
                  <Grid item xs={3.5} sm={2.5} align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      color="error" 
                      onClick={()=>dispatch(startDeleteUser(id))}
                    >
                      Delete
                    </Button>{' '}
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Divider variant="middle" />
          </Grid>
        </Box>
      </ListItem>
    </>
  );
};

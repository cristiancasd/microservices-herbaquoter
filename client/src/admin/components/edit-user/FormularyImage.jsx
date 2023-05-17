import { CloseOutlined, ImageSearchOutlined } from '@mui/icons-material';
import { Alert, Button, Grid, IconButton, ImageList, ImageListItem, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { isTargetFilesCorrect } from '../../../helpers/validFile';

export const FormularyImage = (props) => {
  const { image, imageFile, setImageFile } = props;
  const [alert, setAlert] = useState('');
  const [alertOk, setAlertOk] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    alert !== '' &&
      setTimeout(() => {
        setAlert('');
      }, 4000);
  }, [alert]);

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

  return (
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
                  alt={'profile picture'}
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
  );
};

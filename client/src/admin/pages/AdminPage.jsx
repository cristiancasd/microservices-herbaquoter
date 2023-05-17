import { Alert, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { ButtonsProcess } from '../components/ButtonsProcess';
import { SearcherBox } from '../components/SearcherBox';
import { AdminLayout } from '../layout/AdminLayout';
import { ProductManagerView } from '../views/ProductManagerView';
import { QuoterManagerView } from '../views/QuoterManagerView';
import { UserManagerView } from '../views/UserManagerView';
import { useEffect, useState } from 'react';

export const AdminPage = () => {
  const { usersFinded } = useSelector((state) => state.searcher);
  const { errorMessage, successMessage } = useSelector((state) => state.auth);

  const [alert, setAlert] = useState('');

  useEffect(() => {
    errorMessage && setAlert(<Alert severity="error">{errorMessage}</Alert>);
  }, [errorMessage]);

  useEffect(() => {
    successMessage && setAlert(<Alert severity="success">{successMessage}</Alert>);
  }, [successMessage]);

  useEffect(() => {
    alert !== '' &&
      setTimeout(() => {
        setAlert('');
      }, 4000);
  }, [alert]);

  return (
    <AdminLayout>
      <Container maxWidth="sm">
        <ButtonsProcess />
        <SearcherBox />
        {alert}

        {usersFinded && <UserManagerView usersFinded={usersFinded} />}
        <QuoterManagerView />
        <ProductManagerView />
      </Container>
    </AdminLayout>
  );
};

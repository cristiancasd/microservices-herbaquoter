import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { ButtonsProcess } from '../components/ButtonsProcess';
import { SearcherBox } from '../components/SearcherBox';
import { AdminLayout } from '../layout/AdminLayout';
import { ProductManagerView } from '../views/ProductManagerView';
import { QuoterManagerView } from '../views/QuoterManagerView';
import { UserManagerView } from '../views/UserManagerView';

export const AdminPage = () => {
  const { usersFinded } = useSelector((state) => state.searcher);

  return (
    <AdminLayout>
      <Container maxWidth="sm">
        <ButtonsProcess />
        <SearcherBox />

        {usersFinded && <UserManagerView usersFinded={usersFinded} />}
        <QuoterManagerView />
        <ProductManagerView />
      </Container>
    </AdminLayout>
  );
};

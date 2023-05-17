import { List } from '@mui/material';
import { UserItem } from '../components/UserItem';

export const UserManagerView = ({ usersFinded }) => {
  return (
    <>
      <List>
        {usersFinded.map((user) => (
          <UserItem key={user.id} {...user} />
        ))}
      </List>
    </>
  );
};

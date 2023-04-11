import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from '../admin/routes/AdminRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { QuoterRoutes } from '../quoter/routes/QuoterRoutes';
import { chekAuthToken } from '../store/auth/thunks';
import { CheckingAuth } from '../ui/components/CheckingAuth';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { currentPage } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(chekAuthToken());
  }, []);

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <Route path="/*" element={<AuthRoutes />} />
      ) : currentPage === 'manager' ? (
        <Route path="/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/*" element={<QuoterRoutes />} />
      )}
      {
        //<Route path='/*' element={<Navigate to='/auth/login' /> } />
      }
    </Routes>
  );
};

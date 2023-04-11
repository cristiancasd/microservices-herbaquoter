import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminPage } from '../pages/AdminPage';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="manager" element={<AdminPage />} />
      <Route path="/*" element={<Navigate to="/manager" />} />
    </Routes>
  );
};

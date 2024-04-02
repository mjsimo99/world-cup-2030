import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDecodedToken } from '../guards/tokenUtils';
import { RootState } from '../redux/reducers/RootState';



// Admin Components
import NavbarAdmin from '../components/admin/navbaradmin/navbaradmin';


// Client Component
import ClientRoutes from './ClientRoutes';

const AppRouter = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = token ? getDecodedToken(token).iss : '';

  const UserRoutes = (
    <>
      <ClientRoutes />
    </>
  );

  const AdminRoutes = (
    <>
      <NavbarAdmin />
    </>
  );

  return (
    <Router>
      {userRole === 'ROLE_ADMIN' ? AdminRoutes : UserRoutes}
    </Router>
  );
};

export default AppRouter;
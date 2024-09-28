import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '~store';
import getDefaultHomePath from '~utils/getDefaultHomePath';

// GuestGuard is a component that will be used to protect routes
// that should only be accessed by unauthenticated users.
const GuestGuard = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) return <Navigate to={getDefaultHomePath(user?.role)} replace />;

  return <Outlet />;
};

export default GuestGuard;

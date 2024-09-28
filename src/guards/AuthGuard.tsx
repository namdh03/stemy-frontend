import { Navigate, Outlet } from 'react-router-dom';

import configs from '~configs';
import { useAuthStore } from '~store';

// AuthGuard is component that will be used to protect routes
// that should only be accessed by authenticated users.
const AuthGuard = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={configs.routes.login} replace />;

  return <Outlet />;
};

export default AuthGuard;

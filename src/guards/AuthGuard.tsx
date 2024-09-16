import { Navigate, Outlet } from 'react-router-dom';

import Loading from '~components/common/Loading';
import configs from '~configs';
import useAuth from '~hooks/useAuth';

// AuthGuard is component that will be used to protect routes
// that should only be accessed by authenticated users.
const AuthGuard = () => {
  const { isInitialized, isAuthenticated } = useAuth();

  if (!isInitialized) return <Loading />;
  if (!isAuthenticated) return <Navigate to={configs.routes.login} replace />;

  return <Outlet />;
};

export default AuthGuard;

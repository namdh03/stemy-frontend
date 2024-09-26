import { FC, ReactNode } from 'react';

import NotFound from '~pages/NotFound';
import { useAuthStore } from '~store';
import { Role } from '~utils/enums';

// Role based guard types
interface RoleBasedGuardProps {
  children?: ReactNode;
  accessibleRoles: Role[];
}

// RoleBasedGuard is a component that will be used to protect routes
// that should only be accessed by users with specific roles.

const RoleBasedGuard: FC<RoleBasedGuardProps> = ({ children, accessibleRoles }) => {
  const { user } = useAuthStore();

  if (!accessibleRoles.includes(user!.role)) return <NotFound />;

  return children;
};

// HOC to inject props
const withRoleBasedGuard =
  (accessibleRoles: Role[]) =>
    <P extends object>(Component: FC<P>): FC<P> => {
      const WrappedComponent: FC<P> = (props: P) => (
        <RoleBasedGuard accessibleRoles={accessibleRoles}>
          <Component {...props} />
        </RoleBasedGuard>
      );

      return WrappedComponent;
    };

export { RoleBasedGuard as default, withRoleBasedGuard };

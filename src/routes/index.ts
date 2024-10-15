import { createBrowserRouter, redirect } from 'react-router-dom';

import configs from '~configs';
import { withRoleBasedGuard } from '~guards/RoleBasedGuard';
import { Role } from '~utils/enums';

const guestGuardLazy = async () => ({
  Component: (await import('~guards/GuestGuard')).default,
});

const authGuardLazy = async () => ({
  Component: (await import('~guards/AuthGuard')).default,
});

const router = createBrowserRouter([
  // Guest routes
  {
    lazy: guestGuardLazy,
    children: [
      {
        path: configs.routes.login,
        lazy: async () => ({
          Component: (await import('~pages/Login')).default,
        }),
      },
      {
        path: configs.routes.register,
        lazy: async () => ({
          Component: (await import('~pages/Register')).default,
        }),
      },
      {
        path: configs.routes.forgotPassword,
        lazy: async () => ({
          Component: (await import('~pages/ForgotPassword')).default,
        }),
      },
      {
        lazy: async () => ({
          Component: (await import('~guards/ResetPasswordGuard')).default,
        }),
        children: [
          {
            path: configs.routes.resetPassword,
            lazy: async () => ({
              Component: (await import('~pages/ResetPassword')).default,
            }),
          },
        ],
      },
      {
        path: configs.routes.appResetPassword,
        lazy: async () => ({
          Component: (await import('~pages/AppResetPassword')).default,
        }),
      },
    ],
  },

  // Moderator routes
  {
    lazy: authGuardLazy,
    children: [
      {
        path: configs.routes.home,
        lazy: async () => ({
          Component: withRoleBasedGuard([Role.MANAGER])((await import('~layouts/AdminLayout')).default),
        }),
        children: [
          {
            index: true,
            loader: () => redirect(configs.routes.productList),
          },
          {
            path: configs.routes.productList,
            lazy: async () => ({
              Component: (await import('~pages/ProductList')).default,
            }),
          },
          {
            path: configs.routes.createProduct,
            lazy: async () => ({
              Component: (await import('~pages/CreateProduct')).default,
            }),
          },
          {
            path: configs.routes.updateProduct,
            lazy: async () => ({
              Component: (await import('~pages/UpdateProduct')).default,
            }),
          },
          {
            path: configs.routes.categoryList,
            lazy: async () => ({
              Component: (await import('~pages/CategoryList')).default,
            }),
          },
          {
            path: configs.routes.ticketList,
            lazy: async () => ({
              Component: (await import('~pages/TicketList')).default,
            }),
          },
          {
            path: configs.routes.ticketDashboard,
            lazy: async () => ({
              Component: (await import('~pages/TicketDashboard')).default,
            }),
          },
          {
            path: configs.routes.orderList,
            lazy: async () => ({
              Component: (await import('~pages/OrderList')).default,
            }),
          },
          {
            path: configs.routes.moderatorSettings,
            lazy: async () => ({
              Component: (await import('~pages/ModSettings')).default,
            }),
          },
        ],
      },
    ],
  },

  // Not found route
  {
    path: configs.routes[404],
    lazy: async () => ({
      Component: (await import('~pages/NotFound')).default,
    }),
  },

  // Error routes
  {
    path: configs.routes.error,
    lazy: async () => ({
      Component: (await import('~pages/NotFound')).default,
    }),
  },
]);

export default router;

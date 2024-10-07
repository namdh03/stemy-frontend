import { ChartBarStackedIcon, TicketIcon } from 'lucide-react';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';

import configs from '~configs';

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const adminSideLinks: SideLink[] = [
  {
    title: 'Quản lí tài khoản',
    label: '',
    href: '',
    icon: <VscAccount size={18} />,
    sub: [
      {
        title: 'Danh sách tài khoản',
        label: '',
        href: configs.routes.accountList,
        icon: <></>,
      },
      {
        title: 'Tạo tài khoản',
        label: '',
        href: configs.routes.createAccount,
        icon: <></>,
      },
      {
        title: 'Cài đặt',
        label: '',
        href: configs.routes.moderatorSettings,
        icon: <IoSettingsOutline size={18} />,
      },
    ],
  },
];

export const managerSideLinks: SideLink[] = [
  {
    title: 'Product Management',
    label: '',
    href: '',
    icon: <VscAccount size={18} />,
    sub: [
      {
        title: 'Product List',
        label: '',
        href: configs.routes.productList,
        icon: <></>,
      },
      {
        title: 'Create Product',
        label: '',
        href: configs.routes.createProduct,
        icon: <></>,
      },
    ],
  },
  {
    title: 'Category Management',
    label: '',
    href: '',
    icon: <ChartBarStackedIcon size={18} />,
    sub: [
      {
        title: 'Category List',
        label: '',
        href: configs.routes.categoryList,
        icon: <></>,
      },
      {
        title: 'Create Category',
        label: '',
        href: configs.routes.createCategory,
        icon: <></>,
      },
    ],
  },
  {
    title: 'Ticket Management',
    label: '',
    href: '',
    icon: <TicketIcon size={18} />,
    sub: [
      {
        title: 'Ticket List',
        label: '',
        href: configs.routes.ticketList,
        icon: <></>,
      },
      {
        title: 'Ticket Dashboard',
        label: '',
        href: configs.routes.ticketDashboard,
        icon: <></>,
      },
    ],
  },
];

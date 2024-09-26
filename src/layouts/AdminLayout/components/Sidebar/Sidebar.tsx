import { useEffect, useState } from 'react';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';
import { TbMenu, TbX } from 'react-icons/tb';

import icons from '~assets/icons';
import { adminSideLinks, managerSideLinks } from '~layouts/AdminLayout/data/sideLinks';
import { cn } from '~lib/utils';
import { useAuthStore } from '~store';
import { Role } from '~utils/enums';

import Button from '../Button';
import { Layout, LayoutHeader } from '../Layout';
import Nav from '../Nav';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { user } = useAuthStore();
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className,
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className='sticky top-0 justify-between px-4 py-3 shadow md:px-4'>
          <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
            <img src={icons.logo} alt='' className='w-10 h-10' />
            <div className={`flex flex-col justify-end truncate ${isCollapsed ? 'invisible w-0' : 'visible w-auto'}`}>
              <span className='font-medium'>Stemy</span>
              <span className='text-xs'></span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <TbX /> : <TbMenu />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={user?.role === Role.ADMIN ? adminSideLinks : user?.role === Role.MANAGER ? managerSideLinks : []}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
        >
          <HiOutlineChevronDoubleLeft className={`h-4 w-4 ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </Layout>
    </aside>
  );
}

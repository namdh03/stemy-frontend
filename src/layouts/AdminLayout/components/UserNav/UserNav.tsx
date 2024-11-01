import { IoMdLogOut } from 'react-icons/io';

import { useQueryClient } from '@tanstack/react-query';

import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import { useAuthStore } from '~store';

import Button from '../Button';

export default function UserNav() {
  const { user, unAuthenticate } = useAuthStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    unAuthenticate();
    queryClient.clear();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.image || ''} alt='@shadcn' />
            <AvatarFallback>{user?.fullName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.fullName}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        {/* <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link to={configs.routes.adminProfile}>
            <DropdownMenuItem className="cursor-pointer">
              Hồ sơ
              <DropdownMenuShortcut>
                <CgProfile size={14} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
          Log out
          <DropdownMenuShortcut>
            <IoMdLogOut size={14} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import configs from '~configs';
import { Order } from '~graphql/graphql';
import Button from '~layouts/AdminLayout/components/Button';

import OrderDetailModal from '../Modal/Modal';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<Order>) {
  const orderId = parseInt(row.original.id);
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));
  const handleCloseModal = () => setOpen((prev) => ({ ...prev, modal: false }));
  return (
    <>
      <OrderDetailModal orderId={orderId} isOpen={open.modal} onClose={handleCloseModal} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem className='cursor-pointer' onClick={handleOpenModal}>
            <DropdownMenuShortcut className='ml-0 mr-2'>
              <IoEyeOutline size={16} />
            </DropdownMenuShortcut>
            View Detail
          </DropdownMenuItem>

          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              navigate(configs.routes.updateProduct.replace(':productId', row.original.id));
            }}
          >
            <DropdownMenuShortcut className='ml-0 mr-2'>
              <FiEdit3 size={16} />
            </DropdownMenuShortcut>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;

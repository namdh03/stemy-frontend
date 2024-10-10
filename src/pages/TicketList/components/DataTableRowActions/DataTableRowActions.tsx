import { useState } from 'react';
import { CopyIcon } from 'lucide-react';
import { IoEyeOutline } from 'react-icons/io5';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import { Ticket } from '~graphql/graphql';
import Button from '~layouts/AdminLayout/components/Button';

import Modal from '../Modal';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<Ticket>) {
  // const queryClient = useQueryClient();
  const ticketId = parseInt(row.original.id);
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));

  const handleOpenModalChange = (value: boolean) => setOpen((prev) => ({ ...prev, modal: value }));

  const handleCloseModal = () => setOpen((prev) => ({ ...prev, modal: false }));

  return (
    <>
      <Modal ticketId={ticketId} open={open.modal} onOpen={handleOpenModalChange} onClose={handleCloseModal} />
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

          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer'>
            <DropdownMenuShortcut className='ml-0 mr-2'>
              <CopyIcon size={16} />
            </DropdownMenuShortcut>
            Copy Id
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;

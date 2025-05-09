import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import configs from '~configs';
import { Product } from '~graphql/graphql';
import { useDeleteProduct } from '~hooks/useDeleteProduct';
import Button from '~layouts/AdminLayout/components/Button';
import isAxiosError from '~utils/isAxiosError';

import Modal from '../Modal';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<Product>) {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    alert: false,
    modal: false,
  });
  const { mutate: deleteProductMutate } = useDeleteProduct();
  const handleOpenDialog = () => setOpen((prev) => ({ ...prev, alert: true }));

  const handleOpenModal = () => setOpen((prev) => ({ ...prev, modal: true }));

  const handleOpenDialogChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenModalChange = (value: boolean) => setOpen((prev) => ({ ...prev, modal: value }));

  const handleCloseModal = () => setOpen((prev) => ({ ...prev, modal: false }));

  const handleDeleteProduct = () => {
    const productId = parseInt(row.original.id);
    deleteProductMutate(productId, {
      onSuccess: () => {
        toast.success('Delete product successfully');
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) toast.error('something went wrong');
        else toast.error('something went wrong');
      },
    });
  };

  return (
    <>
      <Modal row={row} open={open.modal} onOpen={handleOpenModalChange} onClose={handleCloseModal} />
      <AlertDialog open={open.alert} onOpenChange={handleOpenDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to permanently delete this item from our servers?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteProduct}>Delete</AlertDialogCancel>
            <AlertDialogAction>Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

          <DropdownMenuSeparator />

          <DropdownMenuItem className='cursor-pointer' onClick={handleOpenDialog}>
            <DropdownMenuShortcut className='ml-0 mr-2'>
              <RiDeleteBinLine size={16} />
            </DropdownMenuShortcut>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableRowActions;

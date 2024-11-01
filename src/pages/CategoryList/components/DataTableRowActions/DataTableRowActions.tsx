import { useState } from 'react';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { toast } from 'sonner';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
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
import { GET_PRODUCT_CATEGORIES_QUERY_KEY } from '~constants/user-query-key';
import { ProductCategory } from '~graphql/graphql';
import { useDeleteProductCategoryById } from '~hooks/useDeleteProductCategoryById';
import Button from '~layouts/AdminLayout/components/Button';

import UpdateCategoryModal from '../UpdateCategoryModal';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<ProductCategory>) {
  const queryClient = useQueryClient();
  const productCategoryId = parseInt(row.original.id);
  const [open, setOpen] = useState({
    alert: false,
  });

  const { mutate: deleteProductCategory, isPending } = useDeleteProductCategoryById();

  const handleOpenDialog = () => setOpen((prev) => ({ ...prev, alert: true }));
  const handleOpenDialogChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleDeleteCategory = () => {
    deleteProductCategory(
      {
        id: productCategoryId,
      },
      {
        onSuccess: () => {
          toast.success('Category deleted successfully');
          queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_CATEGORIES_QUERY_KEY] });
          handleOpenDialogChange(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <>
      <AlertDialog open={open.alert} onOpenChange={handleOpenDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to delete this category?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{' '}
              <strong className='text-primary'>category</strong> and remove your data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCategory}>{isPending ? 'Deleting' : 'Delete'}</AlertDialogCancel>
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
          <UpdateCategoryModal productCategoryId={productCategoryId}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className='cursor-pointer'>
              <DropdownMenuShortcut className='ml-0 mr-2'>
                <RiEdit2Line size={16} />
              </DropdownMenuShortcut>
              Edit
            </DropdownMenuItem>
          </UpdateCategoryModal>

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

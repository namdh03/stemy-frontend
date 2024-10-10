import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';

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
import { ProductCategory } from '~graphql/graphql';
import Button from '~layouts/AdminLayout/components/Button';

import CreateCategoryModal from '../CreateCategoryModal';
import UpdateCategoryModal from '../UpdateCategoryModal';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions({ row }: DataTableRowActionsProps<ProductCategory>) {
  // const queryClient = useQueryClient();
  const productCategoryId = parseInt(row.original.id);
  const [open, setOpen] = useState({
    alert: false,
    createCategoryModal: false,
    updateCategoryModal: false,
  });
  const handleOpenDialog = () => setOpen((prev) => ({ ...prev, alert: true }));
  const handleOpenDialogChange = (value: boolean) => setOpen((prev) => ({ ...prev, alert: value }));

  const handleOpenCreateCategoryModal = () => setOpen((prev) => ({ ...prev, createCategoryModal: true }));
  const handleOpenCreateCategoryModalChange = (value: boolean) =>
    setOpen((prev) => ({ ...prev, createCategoryModal: value }));
  const handleCloseCreateCategoryModal = () => setOpen((prev) => ({ ...prev, createCategoryModal: false }));

  const handleOpenUpdateCategoryModal = () => setOpen((prev) => ({ ...prev, updateCategoryModal: true }));
  const handleOpenUpdateCategoryModalChange = (value: boolean) =>
    setOpen((prev) => ({ ...prev, updateCategroyModal: value }));
  const handleCloseUpdateCategoryModal = () => setOpen((prev) => ({ ...prev, updateCategroyModal: false }));

  const handleDeleteCategory = () => {};

  return (
    <>
      <CreateCategoryModal
        open={open.createCategoryModal}
        onOpen={handleOpenCreateCategoryModalChange}
        onClose={handleCloseCreateCategoryModal}
      />
      <UpdateCategoryModal
        open={open.updateCategoryModal}
        onOpen={handleOpenUpdateCategoryModalChange}
        onClose={handleCloseUpdateCategoryModal}
        productCategoryId={productCategoryId}
      />
      <AlertDialog open={open.alert} onOpenChange={handleOpenDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Hành động này sẽ xóa vĩnh viễn{' '}
              <strong className='text-primary'>công thức</strong> của bạn và xóa dữ liệu của bạn khỏi máy chủ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCategory}>Tiếp tục</AlertDialogCancel>
            <AlertDialogAction>Hủy</AlertDialogAction>
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
          <DropdownMenuItem className='cursor-pointer' onClick={handleOpenCreateCategoryModal}>
            <DropdownMenuShortcut className='ml-0 mr-2'>
              <IoEyeOutline size={16} />
            </DropdownMenuShortcut>
            Create
          </DropdownMenuItem>

          <DropdownMenuItem className='cursor-pointer' onClick={handleOpenUpdateCategoryModal}>
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

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '~components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~components/ui/dialog';
import { Form } from '~components/ui/form';
import { useGetProductCategoryById } from '~hooks/useGetProductCategoryById';
import { useUpdateProductCategory } from '~hooks/useUpdateProductCategory';
import { useCategoryListStore } from '~pages/CategoryList/store/categoryList.store';
import { UpdateCategoryFormType, updateCategorySchema } from '~pages/CategoryList/store/useCategoryListForm';

import InputName from './InputName';
import InputTitle from './InputTitle';
import SelectType from './SelectType';

interface UpdateCategoryModalProps {
  productCategoryId: number;
}
const UpdateCategoryModal = ({ productCategoryId }: UpdateCategoryModalProps) => {
  const { updateCategoryFormData: formData } = useCategoryListStore();
  const { data: productCategory } = useGetProductCategoryById(productCategoryId);
  const { mutate: updateProductCategory } = useUpdateProductCategory();

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<UpdateCategoryFormType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (productCategory) {
      form.setValue('name', productCategory.name);
      form.setValue('title', productCategory.title);
      form.setValue('type', productCategory.type);
    }
  }, [productCategory, form]);

  const onSubmit = (data: UpdateCategoryFormType) => {
    updateProductCategory(
      {
        id: productCategoryId,
        input: data,
      },
      {
        onSuccess: () => {
          toast.success('Category updated successfully');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='w-full hidden h-8 lg:flex'>
          <FiEdit3 size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='mb-3'>Update Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center'>
              <div className='flex flex-row justify-between gap-24'>
                <div className='flex-1 flex-col gap-2'>
                  <h2 className='text-2xl font-bold text-primary'>Category Information</h2>
                  <InputName form={form} />
                  <SelectType form={form} />
                </div>
                <div className='flex-1'>
                  <div className='mb-14'>
                    <h2 className='text-2xl font-bold text-primary mb-7'>Category</h2>
                    <InputTitle form={form} />
                  </div>
                </div>
              </div>
              <Button type='submit' className='mt-4'>
                Update Category
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;

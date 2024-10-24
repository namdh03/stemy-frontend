import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  children: React.ReactNode;
}
const UpdateCategoryModal = ({ productCategoryId, children }: UpdateCategoryModalProps) => {
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Update Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='space-y-6'>
                <InputName form={form} />
                <SelectType form={form} />
                <InputTitle form={form} />
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

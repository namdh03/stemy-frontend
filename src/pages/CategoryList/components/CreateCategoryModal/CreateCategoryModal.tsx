import { useState } from 'react';
import { CirclePlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '~components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~components/ui/dialog';
import { Form } from '~components/ui/form';
import { useCreateProductCategory } from '~hooks/useCreateProductCategory';
import { useCategoryListStore } from '~pages/CategoryList/store/categoryList.store';
import { CreateCategoryFormType, createCategorySchema } from '~pages/CategoryList/store/useCategoryListForm';

import InputName from './InputName';
import InputTitle from './InputTitle';
import SelectType from './SelectType';

const CreateCategoryModal = () => {
  const { createCategoryFormData: formData } = useCategoryListStore();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: formData,
  });

  const { mutate: createProductCategory, isPending } = useCreateProductCategory();

  const onSubmit = (data: CreateCategoryFormType) => {
    createProductCategory(
      {
        input: data,
      },
      {
        onSuccess: () => {
          toast.success('Category created successfully');
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='hidden lg:inline-flex'>
          <CirclePlusIcon className='mr-2 h-4 w-4' />
          New Category
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-6'>
              <InputName form={form} />
              <SelectType form={form} />
              <InputTitle form={form} />
            </div>
            <Button type='submit' className='w-full'>
              {isPending ? 'Creating...' : 'Create Category'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;

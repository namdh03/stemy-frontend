import { CirclePlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '~components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~components/ui/dialog';
import { Form } from '~components/ui/form';
import { useCreateProductCategory } from '~hooks/useCreateProductCategory';
import { useCategoryListStore } from '~pages/CategoryList/store/categoryList.store';
import { CreateCategoryFormType, createCategorySchema } from '~pages/CategoryList/store/useCategoryListForm';

import InputName from './InputName';
import InputTitle from './InputTitle';
import SelectType from './SelectType';

const CreateCategoryModal = () => {
  const { createCategoryFormData: formData } = useCategoryListStore();

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: formData,
  });

  const { mutate: createProductCategory } = useCreateProductCategory();

  const onSubmit = (data: CreateCategoryFormType) => {
    createProductCategory(
      {
        input: data,
      },
      {
        onSuccess: () => {
          toast.success('Category created successfully');
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
        <Button variant='outline' className='hidden h-8 lg:flex'>
          <CirclePlusIcon className='mr-2 h-4 w-4' />
          New
        </Button>
      </DialogTrigger>
      <DialogContent className='w-fit min-w-[500px] max-h-[calc(100%-48px)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='mb-3'>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center'>
            <div className='flex flex-row justify-between gap-24'>
              <div className='flex-1 flex-col gap-2'>
                <h2 className='text-2xl font-bold text-primary'>Category Information</h2>
                <InputName form={form} />
                <SelectType form={form} />
                  <InputTitle form={form} />
              </div>
              {/* <div className='flex-1'>
                <div className='mb-14'>
                  <h2 className='text-2xl font-bold text-primary mb-7'>Category</h2>
                </div>
              </div> */}
            </div>
            <Button type='submit' className='mt-4'>
              Create Category
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;

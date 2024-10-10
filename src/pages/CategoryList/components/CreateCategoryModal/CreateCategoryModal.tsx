import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '~components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~components/ui/dialog';
import { Form } from '~components/ui/form';
import { useCategoryListStore } from '~pages/CategoryList/store/categoryList.store';
import { CreateCategoryFormType, createCategorySchema } from '~pages/CategoryList/store/useCategoryListForm';

import InputName from './InputName';
import InputTitle from './InputTitle';
import InputType from './InputType';

interface CreateCategoryModalProps {
  open: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}
const CreateCategoryModal = ({ open, onOpen, onClose }: CreateCategoryModalProps) => {
  const { createCategoryFormData: formData } = useCategoryListStore();

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: formData,
  });

  const onSubmit = (data: CreateCategoryFormType) => {};
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className='max-w-[calc(100%-48px)] max-h-[calc(100%-48px)] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle className='mb-3'>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center'>
            <div className='flex flex-row justify-between gap-24'>
              <div className='flex-1 flex-col gap-2'>
                <h2 className='text-2xl font-bold text-primary'>Category Information</h2>
                <InputName form={form} />
                <InputType form={form} />
              </div>
              <div className='flex-1'>
                <div className='mb-14'>
                  <h2 className='text-2xl font-bold text-primary mb-7'>Category</h2>
                  <InputTitle form={form} />
                </div>
              </div>
            </div>
            <Button type='submit' className='mt-4'>
              Create Category
            </Button>
          </form>
        </Form>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;

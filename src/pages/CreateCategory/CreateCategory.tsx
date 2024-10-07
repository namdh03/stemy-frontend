import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '~components/common/Spinner';
import { Button } from '~components/ui/button';
import { Form } from '~components/ui/form';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';

import InputName from './components/InputName';
import InputTitle from './components/InputTitle';
import InputType from './components/InputType';
import SelectIcon from './components/SelectIcon';
import { useCreateCategoryStore } from './store/createCategory.store';
import { CreateCategoryFormType, createCategorySchema } from './store/useCreateCategoryForm';

const CreateCategory = () => {
  useDocumentTitle('Stemy | Create Category');
  const { formData, isLoading } = useCreateCategoryStore();

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<CreateCategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: formData,
  });

  const onSubmit = (data: CreateCategoryFormType) => {};

  return (
    <LayoutBody>
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
                <SelectIcon
                  onSelectIcon={(e) => {
                    console.log('Icon selected', e);
                  }}
                />
              </div>
            </div>
          </div>
          <Button type='submit' className='mt-4'>
            {isLoading ? <Spinner /> : 'Create Category'}
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default CreateCategory;

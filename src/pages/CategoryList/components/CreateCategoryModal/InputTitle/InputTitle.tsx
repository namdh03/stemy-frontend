import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { CreateCategoryFormType } from '~pages/CategoryList/store/useCategoryListForm';

interface InputNameProps {
  form?: UseFormReturn<CreateCategoryFormType>;
}

const InputTitle: React.FC<InputNameProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      key='name'
      name='title'
      render={({ field }) => (
        <FormItem className='flex flex-col w-full'>
          <FormLabel>Category Title</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Category Title' className='h-10 bg-white' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputTitle;

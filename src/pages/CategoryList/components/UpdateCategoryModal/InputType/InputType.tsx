import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { CreateCategoryFormType } from '~pages/CreateCategory/store/useCreateCategoryForm';

interface InputTypeProps {
  form?: UseFormReturn<CreateCategoryFormType>;
}

const InputType: React.FC<InputTypeProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      key='type'
      name='type'
      render={({ field }) => (
        <FormItem className='flex flex-col w-full my-8'>
          <FormLabel>Category Type</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Category Type' className='h-10 bg-white' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputType;

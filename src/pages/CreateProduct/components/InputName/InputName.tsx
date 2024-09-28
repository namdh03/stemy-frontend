import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { CreateProductFormType } from '~pages/CreateProduct/store/useCreateProductForm';

interface InputNameProps {
  form?: UseFormReturn<CreateProductFormType>;
}

const InputName: React.FC<InputNameProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      key='name'
      name='name'
      render={({ field }) => (
        <FormItem className='flex flex-col w-full my-8'>
          <FormLabel>Product name</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Product Name' className='h-10 bg-white' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputName;

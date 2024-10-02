import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { UpdateProductFormType } from '~pages/UpdateProduct/store/useUpdateProductForm';

interface InputPriceProps {
  form?: UseFormReturn<UpdateProductFormType>;
}

const InputPrice: React.FC<InputPriceProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      key='price'
      name='price'
      render={({ field }) => (
        <FormItem className='flex flex-col w-full my-8'>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              {...field}
              type='number'
              placeholder='Product Price'
              className='h-10 bg-white'
              onChange={(event) => field.onChange(+event.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputPrice;

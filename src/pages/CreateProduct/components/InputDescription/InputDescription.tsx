import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import RichTextEditor from '~components/common/RichTextEditor';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { CreateProductFormType } from '~pages/CreateProduct/store/useCreateProductForm';

interface InputDescriptionProps {
  form?: UseFormReturn<CreateProductFormType>;
}

const InputDescription: React.FC<InputDescriptionProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      name='description'
      render={({ field }) => (
        <FormItem className='w-[440px]'>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <RichTextEditor {...field} value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputDescription;

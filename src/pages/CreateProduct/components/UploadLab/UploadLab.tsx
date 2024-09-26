import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { CreateProductFormType } from '~pages/CreateProduct/store/useCreateProductForm';

interface UploadLabProps {
  form: UseFormReturn<CreateProductFormType>;
}
const UploadLab: React.FC<UploadLabProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name='labDocument'
      render={({ field }) => (
        <FormItem className='grid w-full max-w-sm items-center gap-1.5'>
          <FormLabel>File PDF</FormLabel>
          <FormControl>
            <Input
              placeholder='Upload lab document'
              required
              type='file'
              name={field.name}
              ref={field.ref}
              onChange={(e) => field.onChange(e.target.files && e.target.files[0])}
              onBlur={field.onBlur}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadLab;

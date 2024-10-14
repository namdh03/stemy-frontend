import React from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import FileUploader from '~components/common/Upload/FileUploader';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { useUpdateProductStore } from '~pages/UpdateProduct/store/updateProduct.store';
import { UpdateProductFormType } from '~pages/UpdateProduct/store/useUpdateProductForm';
import { UploadedFile } from '~types/product.type';

// export interface UploadedFile extends File {
//   preview: string;
// }

const MAX_FILES = 4;
const MAX_SIZE = 4 * 1024 * 1024;

interface UploadImageProps {
  form: UseFormReturn<UpdateProductFormType>;
}

const UploadImage: React.FC<UploadImageProps> = ({ form }) => {
  const { images, onUploadImage, handleRemoveImages } = useUpdateProductStore();

  const handleUpload = (files: UploadedFile[], field: ControllerRenderProps<UpdateProductFormType, 'images'>) => {
    onUploadImage(files, field);
  };

  return (
    <FormField
      control={form.control}
      key='images'
      name='images'
      render={({ field }) => (
        <FormItem className='flex flex-col max-w-[500px] my-8'>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <div className='space-y-6'>
              <FileUploader
                handleRemoveImages={handleRemoveImages}
                maxFiles={MAX_FILES}
                maxSize={MAX_SIZE}
                files={images}
                handleUpload={(files) => handleUpload(files, field)}
                disabled={false}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UploadImage;

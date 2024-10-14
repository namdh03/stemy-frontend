import React from 'react';
import { FileIcon, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '~components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { useUpdateProductStore } from '~pages/UpdateProduct/store/updateProduct.store';
import { UpdateProductFormType } from '~pages/UpdateProduct/store/useUpdateProductForm';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB

  const fileNames = file.name.split('/');
  const fileName = fileNames[fileNames.length - 1];

  return (
    <div className='flex items-center justify-between p-3 mt-2 border rounded-md bg-muted'>
      <div className='flex items-center space-x-3'>
        <FileIcon className='w-8 h-8 text-blue-500' />
        <div>
          <p className='text-sm font-medium'>{fileName}</p>
          <p className='text-xs text-muted-foreground'>{fileSize} MB</p>
        </div>
      </div>
      <Button variant='ghost' size='icon' onClick={onRemove}>
        <X className='w-4 h-4' />
      </Button>
    </div>
  );
};

interface UploadLabProps {
  form: UseFormReturn<UpdateProductFormType>;
}

const UploadLab: React.FC<UploadLabProps> = ({ form }) => {
  const { labDocument, setLabDocument } = useUpdateProductStore();

  const handleRemoveFile = () => {
    form.setValue('labDocument', null);
    setLabDocument(null);
  };

  return (
    <>
      <FormField
        control={form.control}
        name='labDocument'
        render={({ field }) => (
          <FormItem className='grid w-full max-w-sm items-center gap-1.5'>
            <FormLabel>File PDF</FormLabel>
            <FormControl>
              <Input
                placeholder='Upload lab document'
                type='file'
                name={field.name}
                ref={field.ref}
                onChange={(e) => field.onChange(e.target.files && e.target.files[0])}
                onBlur={field.onBlur}
                accept='application/pdf'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {labDocument && <FilePreview file={labDocument} onRemove={handleRemoveFile} />}
    </>
  );
};

export default UploadLab;

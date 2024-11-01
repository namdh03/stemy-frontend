import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '~components/common/Spinner';
import { Button } from '~components/ui/button';
import { Form } from '~components/ui/form';
import { useCreateProduct } from '~hooks/useCreateProduct';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';

import CategoriesField from './components/CategoriesField';
import InputDescription from './components/InputDescription';
import InputLabPrice from './components/InputLabPrice';
import InputName from './components/InputName';
import InputPrice from './components/InputPrice';
import UploadImage from './components/UploadImage';
import UploadLab from './components/UploadLab';
import { useCreateProductStore } from './store/createProduct.store';
import { CreateProductFormType, createProductSchema } from './store/useCreateProductForm';

const CreateProduct = () => {
  useDocumentTitle('Stemy | Create Product');
  const { formData, isLoading, setImages } = useCreateProductStore();
  const { mutate: handleCreateProduct } = useCreateProduct();
  const navigate = useNavigate();

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<CreateProductFormType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: CreateProductFormType) => {
    handleCreateProduct(
      {
        input: {
          name: data.name,
          description: data.description,
          categoryIds: data.categories.map((category) => parseInt(category)),
          price: data.price,
          labPrice: data.labPrice,
        },
        images: data.images,
        labDocument: data.labDocument,
      },
      {
        onSuccess: () => {
          toast.success('Product created successfully');
          setImages([]);
          form.reset();
          navigate('/manager/product-list');
        },
        onError: () => {
          toast.error('Failed to create product');
        },
      },
    );
  };

  return (
    <LayoutBody>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center'>
          <div className='flex flex-row justify-between gap-24'>
            <div className='flex-1 flex-col gap-2'>
              <h2 className='text-2xl font-bold text-primary'>Product Information</h2>
              <InputName form={form} />
              <InputPrice form={form} />
              <CategoriesField form={form} />
              <InputDescription form={form} />
            </div>
            <div className='flex-1'>
              <div className='mb-14'>
                <h2 className='text-2xl font-bold text-primary mb-7'>Lab Document</h2>
                <UploadLab form={form} />
                <InputLabPrice form={form} />
                <UploadImage form={form} />
              </div>
            </div>
          </div>
          <Button type='submit' className='mt-4'>
            {isLoading ? <Spinner /> : 'Create Product'}
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default CreateProduct;

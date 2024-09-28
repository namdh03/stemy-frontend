import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '~components/common/Spinner';
import { Button } from '~components/ui/button';
import { Form } from '~components/ui/form';
import { useCreateProduct } from '~hooks/useCreateProduct';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { useGetProductById } from '~hooks/useGetProductById';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';
import CategoriesField from '~pages/CreateProduct/components/CategoriesField';
import InputDescription from '~pages/CreateProduct/components/InputDescription';
import InputLabPrice from '~pages/CreateProduct/components/InputLabPrice';
import InputName from '~pages/CreateProduct/components/InputName';
import InputPrice from '~pages/CreateProduct/components/InputPrice';
import UploadImage from '~pages/CreateProduct/components/UploadImage';
import UploadLab from '~pages/CreateProduct/components/UploadLab';

import { useUpdateProductStore } from './store/updateProduct.store';
import { UpdateProductFormType, updateProductSchema } from './store/useUpdateProductForm';

const UpdateProduct = () => {
  useDocumentTitle('Stemy | Update Product');

  const { productId } = useParams();
  const { formData, isLoading, setImages, setFormData } = useUpdateProductStore();
  const { mutate: handleCreateProduct } = useCreateProduct();
  const { data: product } = useGetProductById(productId ? parseInt(productId) : null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.categories.map((category) => category.id.toString()),
        // images: product.images.map((image) => image.url),
      });
    }
  }, [product, productId, setFormData]);

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  const onSubmit = (data: UpdateProductFormType) => {
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
            {isLoading ? <Spinner /> : 'Update Product'}
          </Button>
        </form>
      </Form>
    </LayoutBody>
  );
};

export default UpdateProduct;

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '~components/common/Spinner';
import { Button } from '~components/ui/button';
import { Form } from '~components/ui/form';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { useGetProductById } from '~hooks/useGetProductById';
import { useUpdateProduct } from '~hooks/useUpdateProduct';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';
import { convertUrlsToFiles, convertUrlToFile } from '~utils/convertURLtoFile';

import CategoriesField from './components/CategoriesField';
import InputDescription from './components/InputDescription';
import InputLabPrice from './components/InputLabPrice';
import InputName from './components/InputName';
import InputPrice from './components/InputPrice';
import UploadImage from './components/UploadImage';
import UploadLab from './components/UploadLab';
import { useUpdateProductStore } from './store/updateProduct.store';
import { UpdateProductFormType, updateProductSchema } from './store/useUpdateProductForm';

const UpdateProduct = () => {
  useDocumentTitle('Stemy | Update Product');

  const { productId } = useParams();
  const { formData, isLoading, setImages, setFormData, setLabDocument, labChanged, setLabChanged } = useUpdateProductStore();
  const { data: product } = useGetProductById(productId ? parseInt(productId) : null);
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    const fetchData = async () => {
      const imageFiles = await convertUrlsToFiles(product?.images?.map((image) => image.url) ?? []);
      const labDocument: File | null = product?.lab ? await convertUrlToFile(product?.lab?.url) : null;
      setFormData({
        name: product!.name,
        description: product!.description,
        price: product!.price,
        categories: product!.categories.map((category) => category.id.toString()),
        images: imageFiles,
        labPrice: product!.lab?.price,
        labDocument: labDocument,
      });
      setImages(imageFiles);
      setLabDocument(labDocument);
    };

    if (product) {
      fetchData();
    }
  }, [product, productId, setFormData, setImages, setLabDocument]);

  // Initialize react-hook-form with Zod resolver and types from schema
  const form = useForm<UpdateProductFormType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    form.reset(formData);
  }, [form, formData]);

  const onSubmit = (data: UpdateProductFormType) => {
    console.log('🚀 ~ update file:', data);
    if (!productId) return;

    updateProduct(
      {
        id: parseInt(productId),
        input: {
          name: data.name,
          description: data.description,
          categoryIds: data.categories.map((category) => parseInt(category)),
          price: data.price,
          labPrice: data.labPrice ?? 0,
        },
        images: data.images,
        labDocument: data.labDocument,
        labChanged: labChanged,
      },
      {
        onSuccess: () => {
          toast.success('Product updated successfully');
          setLabChanged(false);
        },
        onError: () => {
          toast.error('Failed to update product');
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

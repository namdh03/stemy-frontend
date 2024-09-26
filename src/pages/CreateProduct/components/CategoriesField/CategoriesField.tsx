import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '~components/ui/multi-select';
import useProductCategories from '~hooks/useProductCategories';
import { CreateProductFormType } from '~pages/CreateProduct/store/useCreateProductForm';

interface CategoriesFieldProps {
  form: UseFormReturn<CreateProductFormType>;
}

const CategoriesField: React.FC<CategoriesFieldProps> = ({ form }) => {
  const { data: categories } = useProductCategories();

  return (
    <FormField
      control={form.control}
      name='categories'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Categories</FormLabel>
          <FormControl>
            <MultiSelector
              values={field.value}
              onValuesChange={(value) => {
                console.log('🚀 ~ value:', value);
                field.onChange(value);
              }}
              loop={false}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder='Select category' />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {categories?.map((item, i) => (
                    <MultiSelectorItem key={i} value={item.id}>
                      {item.name}
                    </MultiSelectorItem>
                  )) || []}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategoriesField;

import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~components/ui/select';
import { CategoryType } from '~graphql/graphql';
import { CreateCategoryFormType } from '~pages/CategoryList/store/useCategoryListForm';

interface SelectTypeProps {
  form?: UseFormReturn<CreateCategoryFormType>;
}

const SelectType: React.FC<SelectTypeProps> = ({ form }) => {
  return (
    <FormField
      control={form?.control}
      key='type'
      name='type'
      render={({ field }) => (
        <FormItem className='flex flex-col w-full my-8'>
          <FormLabel>Category Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder='Select category type' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CategoryType).map((categoryType) => (
                  <SelectItem key={categoryType} value={categoryType}>
                    {categoryType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectType;

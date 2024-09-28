import { useMemo } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { ForgotPasswordFormType } from '~pages/ForgotPassword/ForgotPassword';

interface FormItemsProps {
  form: UseFormReturn<ForgotPasswordFormType>;
}

type ForgotPasswordObjectType = {
  name: keyof ForgotPasswordFormType;
  label: string;
  component: (field: ControllerRenderProps<ForgotPasswordFormType, keyof ForgotPasswordFormType>) => JSX.Element;
};

const FormItems = ({ form }: FormItemsProps) => {
  const forgotPasswordFields: ForgotPasswordObjectType[] = useMemo(
    () => [
      {
        name: 'email',
        label: 'Email',
        component: (field) => (
          <Input type='email' placeholder='customer@example.com' className='h-10 bg-white' {...field} />
        ),
      },
    ],
    [],
  );

  return forgotPasswordFields.map(({ name, label, component }) => (
    <FormField
      control={form.control}
      key={name}
      name={name}
      render={({ field }) => (
        <FormItem className='w-96'>
          <FormLabel>{label}</FormLabel>
          <FormControl>{component(field)}</FormControl>
          <FormMessage className='absolute' />
        </FormItem>
      )}
    />
  ));
};

export default FormItems;

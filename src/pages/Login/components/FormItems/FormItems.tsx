import { useMemo } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import InputPassword from '~components/common/InputPassword';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { LoginFormType } from '~pages/Login/Login';

interface FormItemsProps {
  form: UseFormReturn<LoginFormType>;
}

type LoginObjectType = {
  name: keyof LoginFormType;
  label: string;
  component: (field: ControllerRenderProps<LoginFormType, keyof LoginFormType>) => JSX.Element;
};

const FormItems = ({ form }: FormItemsProps) => {
  const loginFields: LoginObjectType[] = useMemo(
    () => [
      {
        name: 'email',
        label: 'Tài khoản',
        component: (field) => (
          <Input type='email' placeholder='customer@example.com' className='h-10 bg-white' {...field} />
        ),
      },
      {
        name: 'password',
        label: 'Mật khẩu',
        component: (field) => <InputPassword placeholder='Mật khẩu' field={{ ...field }} />,
      },
    ],
    [],
  );

  return loginFields.map(({ name, label, component }) => (
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

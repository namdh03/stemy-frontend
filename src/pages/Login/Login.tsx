import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import AuthForm from '~components/common/AuthForm';
import ButtonActionForm from '~components/common/AuthForm/components/ButtonActionForm';
import { Form } from '~components/ui/form';
import configs from '~configs';
import useDispatchAuth from '~hooks/useDispatchAuth';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { LoginQuery } from '~services/user.services';
import { AUTH_MESSAGES, SYSTEM_MESSAGES } from '~utils/constants';
import execute from '~utils/execute';
import isAxiosError from '~utils/isAxiosError';

import FormItems from './components/FormItems';
import loginSchema from './data/schema';

export type LoginFormType = z.infer<typeof loginSchema>;

const loginFormDefaultValues: LoginFormType = {
  email: '',
  password: '',
};

const Login = () => {
  useDocumentTitle('Stemy | Đăng nhập');
  useDispatchAuth();

  const form = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
  });

  // Login with system account
  const { mutate: loginMutate, isPending: isLoginPending } = useMutation({
    mutationFn: (values: LoginFormType) => execute(LoginQuery, values),
  });

  const onSubmit = (values: LoginFormType) => {
    if (isLoginPending) return;
    loginMutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success(AUTH_MESSAGES.LOGIN_TITLE_SUCCESS);
      },
      onError: (error) => {
        if (isAxiosError<Error>(error)) {
          toast.error(error.response?.data.message || AUTH_MESSAGES.LOGIN_TITLE_FAILED);
        } else {
          toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        }
      },
    });
  };

  return (
    <AuthForm title='Welcome back' loading={isLoginPending}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='relative pb-6 space-y-7'>
          <FormItems form={form} />

          <ButtonActionForm
            mainTitle='Đăng nhập'
            subTitle='Quên mật khẩu?'
            to={configs.routes.forgotPassword}
            loading={isLoginPending}
          />
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;

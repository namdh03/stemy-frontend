import { ReactNode, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useMutation, useQuery } from '@tanstack/react-query';

import { GET_GOOGLE_URL_QUERY_KEY, getGoogleAuthUrl, loginWithGoogle } from '~apis/user.api';
import { Button } from '~components/ui/button';
import configs from '~configs';
import constants from '~constants';
import { GetMeQuery } from '~services/user.services';
import { useAuthStore } from '~store';
import { SYSTEM_MESSAGES } from '~utils/constants';
import execute from '~utils/execute';

import Loading from '../Loading';
import Spinner from '../Spinner';

import ButtonLink from './components/ButtonLink';

interface AuthFormProps {
  children: ReactNode;
  title: string;
  loading?: boolean;
}

// Constants for transition button group login/register
const SLIDE_LEFT = { x: 0 };
const SLIDE_RIGHT = { x: 112 };

const STALE_TIME_GOOGLE_AUTH_URL = 1000 * 60 * 60; // 1 hour

const AuthForm = ({ children, title, loading }: AuthFormProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authenticate } = useAuthStore();

  const animateCondition = useMemo(
    () => pathname === configs.routes.register || pathname === configs.routes.login,
    [pathname],
  );

  // Get code from query params
  const [params] = useSearchParams();
  const code = useMemo(() => params.get('code'), [params]);

  // Get google auth url
  const { data } = useQuery({
    queryKey: [GET_GOOGLE_URL_QUERY_KEY],
    queryFn: () => getGoogleAuthUrl(),
    select: (data) => data.data.data.url,
    staleTime: STALE_TIME_GOOGLE_AUTH_URL,
    refetchOnWindowFocus: false,
  });

  // Mutation for login with google
  const { mutate: googleMutate } = useMutation({
    mutationFn: ({ code, signal }: { code: string; signal?: AbortSignal }) => loginWithGoogle(code, signal),
  });

  // Query for get user info
  const { refetch: userRefetch } = useQuery({
    queryKey: [constants.USER_QUERY_KEY.GET_ME_QUERY_KEY],
    queryFn: () => execute(GetMeQuery),
    enabled: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    code &&
      googleMutate(
        { code, signal: controller.signal },
        {
          onSuccess: async () => {
            const { data } = await userRefetch();
            if (data) {
              const user = data.data.me;
              authenticate(user);
            }
          },
          onError: () => {
            toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG, {
              onClose: () => {
                navigate(-1);
              },
            });
          },
        },
      );

    return () => {
      controller.abort();
    };
  }, [code, authenticate, googleMutate, navigate, userRefetch]);

  return code ? (
    <Loading />
  ) : (
    <main className='relative w-screen h-screen bg-white'>
      {animateCondition && (
        <div className='fixed top-9 right-24 z-10 inline-block h-[50px] bg-white rounded-full transition-colors hover:bg-accent hover:text-accent-foreground'>
          <motion.div
            className='absolute top-0 min-w-28 h-full bg-primary rounded-full shadow'
            initial={pathname === configs.routes.register ? SLIDE_LEFT : SLIDE_RIGHT}
            animate={pathname === configs.routes.register ? SLIDE_RIGHT : SLIDE_LEFT}
          />

          <ButtonLink to={configs.routes.login}>Đăng nhập</ButtonLink>
          <ButtonLink to={configs.routes.register}>Đăng ký</ButtonLink>
        </div>
      )}

      <section className='absolute top-[calc(50%+20px)] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pt-10 px-16 pb-10 rounded-[20px] [box-shadow:0px_7.249px_22.411px_0px_rgba(0,_0,_0,_0.21),_0px_3.016px_9.326px_0px_rgba(0,_0,_0,_0.29)]'>
        <div className=' w-[350px] h-[150px] mx-auto flex flex-col justify-center mb-8'>
          <img src='/logo.png' className='w-[109px] h-[109px] mx-auto' alt='logo' />
          <div className='w-fit mx-auto font-jaro text-4xl'>STEMMY</div>
          <div className='w-fit mx-auto text-base text-zinc-500'>Empowering Learning, Simplifying STEM</div>
        </div>
        <h1 className='mb-2 text-zinc-800 text-2xl font-extrabold leading-[1.2]'>{title}</h1>
        <div>{children}</div>
        <div className='flex justify-center w-full'>
          <Button variant={'outline'} size={'lg'} className='w-96 mt-7 p-0' disabled={loading}>
            <Link to={loading ? '' : data || ''} className='w-full py-2'>
              <div className='flex justify-center items-center gap-3'>
                {loading ? <Spinner className='me-2' /> : <FcGoogle size={20} />}
                <span className='text-zinc-500 text-base'>Tiếp tục với Google</span>
              </div>
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default AuthForm;

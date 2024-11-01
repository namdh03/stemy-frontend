import { ReactNode } from 'react';


interface AuthFormProps {
  children: ReactNode;
  title: string;
  loading?: boolean;
}

const AuthForm = ({ children, title }: AuthFormProps) => {

  // Get code from query params

  // // Query for get user info
  // const { refetch: userRefetch } = useQuery({
  //   queryKey: [constants.USER_QUERY_KEY.GET_ME_QUERY_KEY],
  //   queryFn: () => execute(GetMeQuery),
  //   enabled: false,
  // });

  return (
    <main className='relative w-screen h-screen bg-white'>
      {/* {animateCondition && (
        <div className='fixed top-9 right-24 z-10 inline-block h-[50px] bg-white rounded-full transition-colors hover:bg-accent hover:text-accent-foreground'>
          <motion.div
            className='absolute top-0 min-w-28 h-full bg-primary rounded-full shadow'
            initial={pathname === configs.routes.register ? SLIDE_LEFT : SLIDE_RIGHT}
            animate={pathname === configs.routes.register ? SLIDE_RIGHT : SLIDE_LEFT}
          />

          <ButtonLink to={configs.routes.login}>Đăng nhập</ButtonLink>
          <ButtonLink to={configs.routes.register}>Đăng ký</ButtonLink>
        </div>
      )} */}

      <section className='absolute top-[calc(50%+20px)] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pt-10 px-16 pb-10 rounded-[20px] [box-shadow:0px_7.249px_22.411px_0px_rgba(0,_0,_0,_0.21),_0px_3.016px_9.326px_0px_rgba(0,_0,_0,_0.29)]'>
        <div className=' w-[350px] h-[150px] mx-auto flex flex-col justify-center mb-8'>
          <img src='/logo.png' className='w-[109px] h-[109px] mx-auto' alt='logo' />
          <div className='w-fit mx-auto font-jaro text-4xl'>STEMY</div>
          <div className='w-fit mx-auto text-base text-zinc-500'>Empowering Learning, Simplifying STEM</div>
        </div>
        <h1 className='mb-2 text-zinc-800 text-2xl font-extrabold leading-[1.2]'>{title}</h1>
        <div>{children}</div>
      </section>
    </main>
  );
};

export default AuthForm;

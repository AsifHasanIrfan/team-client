import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IRootState, NextPageWithLayout } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import LoginPage from '@views/Login';

const Login: NextPageWithLayout = () => {
  const { auth } = useAppSelector((state: IRootState) => state);
  const router = useRouter();

  useEffect(() => {
    if (auth.token) {
      router.push('/dashboard');
    }
  }, [auth]);

  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;

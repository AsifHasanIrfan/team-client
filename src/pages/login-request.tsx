import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IRootState, NextPageWithLayout } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import LoginRequest from '@views/LoginRequest/LoginRequest';

const LoginRequestPage: NextPageWithLayout = () => {

    //  global
    const { auth } = useAppSelector((state: IRootState) => state);
    const router = useRouter();

    useEffect(() => {
        if (auth.token) {
            router.push('/dashboard');
        }
    }, [auth]);

    return (
        <>
            <LoginRequest />
        </>
    );
};

export default LoginRequestPage;

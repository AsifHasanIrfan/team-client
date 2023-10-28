import { useAppSelector } from '@hooks/useRedux';
import { useRouter } from 'next/router';

type Props = {
    children?: React.ReactNode | JSX.Element | JSX.Element[] | any;
}

const IsAdmin = ({ children }: Props) => {

    const router = useRouter()

    // global states
    const { auth } = useAppSelector(state => state);

    // checking is admin
    if (auth.token) {
        if (auth.user.role != 'admin') {
            router.push('/')
        }
    }


    return children;
}

export default IsAdmin
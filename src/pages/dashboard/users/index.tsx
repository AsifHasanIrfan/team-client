import IsAdmin from '@components/IsAdmin';
import Users from '@views/Users';

const UsersPage = () => {
    return <IsAdmin>
        <Users />
    </IsAdmin>;
};

export default UsersPage
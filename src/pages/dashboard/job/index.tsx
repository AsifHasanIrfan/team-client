import IsAdmin from '@components/IsAdmin';
import AdminJob from '@views/AdminJob';

const UsersPage = () => {
    return <IsAdmin>
        <AdminJob />
    </IsAdmin>;
};

export default UsersPage
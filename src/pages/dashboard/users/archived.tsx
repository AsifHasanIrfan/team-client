import IsAdmin from '@components/IsAdmin';
import Users from '@views/Users';

const ArchivedPage = () => {
    return <IsAdmin>
        <Users />
    </IsAdmin>;
};

export default ArchivedPage
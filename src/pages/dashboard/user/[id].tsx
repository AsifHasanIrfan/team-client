import IsAdmin from '@components/IsAdmin';
import UserProfile from '@views/UserProfile';

const UserProfilePage = () => {
    return <IsAdmin>
        <UserProfile />
    </IsAdmin>;
};

export default UserProfilePage;

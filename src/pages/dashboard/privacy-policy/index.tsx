import IsAdmin from '@components/IsAdmin';
import AdminPrivacyPolicy from '@views/AdminPrivacyPolicy/AdminPrivacyPolicy';

function AddUserPage() {
    return <IsAdmin>
        <AdminPrivacyPolicy />
    </IsAdmin>;
}

export default AddUserPage
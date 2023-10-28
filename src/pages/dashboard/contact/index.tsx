import IsAdmin from '@components/IsAdmin';
import AdminContactUs from '@views/AdminContactUs';

const AdminContactPage = () => {
    return <IsAdmin>
        <AdminContactUs />
    </IsAdmin>;
};

export default AdminContactPage
import IsAdmin from '@components/IsAdmin';
import AdminReports from '@views/AdminReports/AdminReports';

const AdminReportsPage = () => {
    return <IsAdmin>
        <AdminReports />
    </IsAdmin>;
};

export default AdminReportsPage
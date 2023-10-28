import IsAdmin from '@components/IsAdmin';
import EditProject from '@views/PostNewJob/Components/EditProject/EditProject';
import { useRouter } from 'next/router';

const ViewProjectEdit = () => {
  const router = useRouter();

  return (
    <IsAdmin>
      <EditProject routerDetails={router} />
    </IsAdmin>
  );
};

export default ViewProjectEdit;

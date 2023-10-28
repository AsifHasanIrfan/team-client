import IsAdmin from '@components/IsAdmin';
import AddUser from '@views/AddUser';

function AddUserPage() {
  return <IsAdmin>
    <AddUser />
  </IsAdmin>;
}

export default AddUserPage
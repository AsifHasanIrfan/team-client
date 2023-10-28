import Button from '@components/Button';
import { BiHome } from 'react-icons/bi';

const Task = () => {
  return (
    <div className="space-y-6">
      <Button>Rounded Full</Button>
      <Button rounded="md">Rounded Md</Button>
      <Button rounded="md" startIcon={<BiHome size={19} />}>
        Start Icon
      </Button>
      <Button rounded="md" endIcon={<BiHome size={19} />}>
        Start Icon
      </Button>
      <Button rounded="md" loading>
        Hello
      </Button>
      <Button rounded="md" disabled>
        Disabled
      </Button>
    </div>
  );
};

export default Task
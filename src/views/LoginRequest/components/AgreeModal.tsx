import Button from '@components/Button';
import Modal from '@components/Modal';
import RequestModal from '@components/Modal/ReqestModal';
import useLoginRequests from '@hooks/useLoginRequests';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import New from '../policies/New';
import Old from '../policies/Old';

type Props = {
  data: any;
  open: boolean;
  isOldMember: boolean;
  setOpen: (open: boolean) => void;
};

const AgreeModal = ({ open, setOpen, isOldMember, data }: Props) => {
  const router = useRouter();

  // hooks
  const { requestLoginsFetch } = useLoginRequests('');

  // states
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // submit
  const handleRequest = (e: any) => {
    if (!isChecked) {
      toast.error('Please check the checkbox below to proceed');
      return;
    }

    setLoading(true);
    axios
      .post(`${process.env.serverUrl}request-login`, data)
      .then((response) => {
        setLoading(false);
        setOpen(false);
        if (response.data.success === false) {
          Swal.fire({
            icon: 'error',
            title: `${response.data.message}`,
            text: 'Please contact admin for further information!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#C10206',
          });
        }
        if (response.data.success === true) {
          requestLoginsFetch();
          router.push('/');
          Swal.fire({
            icon: 'success',
            title: `${response.data.message}`,
            text: 'Your request has been submitted. Digital Gregg team will contact you soon!',
            confirmButtonText: 'OK',
            confirmButtonColor: '#C10206',
          });
        }
      });
  };

  return (
    <RequestModal
      open={open}
      setOpen={setOpen}
      title={'Digital Gregg Policies'}
      footer
      headerFixed
      handleRequest={handleRequest}
      loading={loading}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
    >
      <div className="w-[370px] md:w-[750px] xl:w-[850px] relative h-full">
        {isOldMember ? <Old /> : <New />}
      </div>
    </RequestModal>
  );
};

export default AgreeModal;

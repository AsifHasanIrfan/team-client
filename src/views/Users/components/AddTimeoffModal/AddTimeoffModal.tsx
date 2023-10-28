import Button from '@components/Button';
import ProfileInput from '@components/Input/ProfileInput';
import Modal from '@components/Modal'
import useUser from '@hooks/useUser';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    token: any;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddTimeoffModal = ({ open, setOpen, token }: Props) => {

    // hooks
    const { userFetch } = useUser(token, '');

    // states
    const [addDays, setAddDays] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(false);


    const handleTimeoffDays = async (e: any) => {

        const sendData = {
            days: parseInt(addDays),
        };

        setLoading(true);

        const { data } = await axios.patch(
            `${process.env.serverUrl}global/update/timeoff/mins`,
            sendData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setLoading(false);
        if (data.success === true) {
            setAddDays(0);
            userFetch();
            setOpen(false);
            toast.success(data.message);
        }

        if (data.success === false) {
            toast.error(data.message);
        }
    };

    return (
        <Modal open={open} setOpen={setOpen} title={'Requests'}>
            <div className='lg:w-[908px] sm:w-[600px] w-full h-full'>
                <div className="flex flex-col w-full">

                    <ProfileInput
                        label={'Add timeoff days'}
                        id={'days'}
                        type={'number'}
                        value={addDays}
                        isRequired={true}
                        placeholder={'Enter amount of days to add'}
                        onChange={(e: any) =>
                            setAddDays(e.target.value)
                        }
                    />

                    <div className="w-full h-[50px] flex mt-[30px] items-center justify-end">
                        <Button
                            className="w-[200px] h-full !p-0 !rounded-[10px]"
                            onClick={handleTimeoffDays}
                            disabled={parseInt(addDays) === 0 || addDays === '' || loading}
                            loading={loading}
                            loadingText={'Updating'}
                        >
                            Update
                        </Button>
                    </div>

                </div>
            </div>
        </Modal>
    )
}

export default AddTimeoffModal
import Button from '@components/Button';
import ProfileInput from '@components/Input/ProfileInput';
import { timeoffTypes } from '@config/constants';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';
import Header from '@views/UserProfile/partials/Header';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import ProfileSelect from '../UserUpdateInfo/ProfileSelect/ProfileSelect';

type Props = {
    userId: any;
    token: any;
    userFetch: any;
    user: any;
}

const DrawbackTimeoff = ({ userId, token, userFetch, user }: Props) => {

    // global
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector(state => state);

    // states
    const [addDays, setAddDays] = useState<any>(0);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState(timeoffTypes[0]);

    // handle timeoff function
    const handleDrawbackTimeoff = async (e: any) => {

        // error
        if (selectedType.value === '' || parseInt(addDays) === 0 || addDays === '' || reason === '') {
            toast.error('Please select all field!');
        }

        if (parseInt(addDays) < 0) {
            toast.error('Please input valid days!');
        }

        const sendData = {
            days: parseInt(addDays),
            type: selectedType.value,
            reason: reason
        };

        setLoading(true);

        const { data } = await axios.patch(
            `${process.env.serverUrl}days-drawback/${userId}`,
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
            setReason('');
            setSelectedType(timeoffTypes[0])
            userFetch();

            const notifyData = {
                recipients: [userId],
                url: '/dashboard/timeoff',
                // @ts-ignore
                content: `Your partial time ${addDays} 
                ${selectedType.value === 'by-day' ? `${addDays > 1 ? 'days' : 'day'}`
                        : selectedType.value === 'by-hour' ? `${addDays > 1 ? 'hours' : 'hour'}`
                            : `${addDays > 1 ? 'mins' : 'min'}`}
                has been removed form your off days.`
            }

            dispatch(createNotification(notifyData, token, socket));
            toast.success(data.message);
        }

        if (data.success === false) {
            toast.error(data.message);
        }
    };

    return (
        <div className="flex flex-col px-[30px] py-[18px] mt-[30px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative">

            <Header>Partial Time Off</Header>

            <div className="flex flex-col w-full mt-6">

                <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px] gap-y-[15px]">

                    <ProfileSelect
                        label="Time Off Type"
                        selectedOption={selectedType}
                        setSelectedOption={setSelectedType}
                        options={timeoffTypes}
                    />

                    <ProfileInput
                        label={`Add ${selectedType.value === 'by-day' ? 'day' : selectedType.value === 'by-hour' ? 'hour' : selectedType.value === 'by-min' ? 'min' : ''} amount`}
                        id={'days'}
                        type={'number'}
                        value={addDays}
                        isRequired={true}
                        placeholder={`Enter amount of ${selectedType.value === 'by-day' ? 'day ' : selectedType.value === 'by-hour' ? 'hour ' : selectedType.value === 'by-min' ? 'min ' : ''}to add`}
                        onChange={(e: any) =>
                            setAddDays(e.target.value)
                        }
                    />

                    <div className={`w-full mb-[15px] lg:mt-0 lg:col-span-2 col-span-1`}>
                        <h2 className="font-medium text-base leading-6 mb-2.5">
                            Reason
                        </h2>

                        <div className={`focus:outline-none rounded-[8px] w-full`}>
                            <textarea
                                className="form-control block w-full px-5 py-[18px] text-base font-normal bg-white bg-clip-padding border resize-none border-solid border-gray-300 rounded m-0 focus:outline-none"
                                id="description"
                                rows={3}
                                value={reason}
                                placeholder="Reason for partial time off"
                                onChange={(e: any) =>
                                    setReason(e.target.value)
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>


                <div className="w-full h-[50px] flex mt-[30px] items-center justify-end">
                    <Button
                        className="w-[200px] h-full !p-0 !rounded-[10px]"
                        onClick={handleDrawbackTimeoff}
                        disabled={parseInt(addDays) === 0 || addDays === '' || loading || selectedType.value === ''}
                        loading={loading}
                        loadingText={'Drawbacking'}
                    >
                        Drawback
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default DrawbackTimeoff
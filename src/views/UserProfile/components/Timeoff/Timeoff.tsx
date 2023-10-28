import Button from '@components/Button'
import ProfileInput from '@components/Input/ProfileInput'
import { timeoffTypes } from '@config/constants'
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { createNotification } from '@redux/actions/notification'
import Header from '@views/UserProfile/partials/Header'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import ProfileSelect from '../UserUpdateInfo/ProfileSelect/ProfileSelect'

type Props = {
    userId: any;
    token: any;
    userFetch: any;
    user: any;
}

const Timeoff = ({ userId, token, userFetch, user }: Props) => {

    // global
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector(state => state);

    // avilable days calculation
    const totalDaysAvailable = Math.floor((user?.timeOffInMins?.totalMinsAvailable / 60) / 8);
    const totalHoursAvailable = Math.floor((user?.timeOffInMins?.totalMinsAvailable - ((totalDaysAvailable * 8) * 60)) / 60);
    const totalMinsAvailable = user?.timeOffInMins?.totalMinsAvailable - ((totalDaysAvailable * 8) * 60) - (totalHoursAvailable * 60);

    // taken days calculation
    const totalDaysTaken = Math.floor((user?.timeOffInMins?.totalMinsTaken / 60) / 8);
    const totalHoursTaken = Math.floor((user?.timeOffInMins?.totalMinsTaken - ((totalDaysTaken * 8) * 60)) / 60);
    const totalMinsTaken = user?.timeOffInMins?.totalMinsTaken - ((totalDaysTaken * 8) * 60) - (totalHoursTaken * 60);

    // states
    const [addDays, setAddDays] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState(timeoffTypes[0]);

    // handle timeoff function
    const handleTimeoffDays = async (e: any) => {

        // error
        if (selectedType.value === '' || parseInt(addDays) === 0 || addDays === '') {
            toast.error('Please select all field!');
        }

        if (parseInt(addDays) < 0) {
            toast.error('Please input valid days!');
        }

        const sendData = {
            days: parseInt(addDays),
            type: selectedType.value
        };

        setLoading(true);

        const { data } = await axios.patch(
            `${process.env.serverUrl}add-days/${userId}`,
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
            setSelectedType(timeoffTypes[0])
            userFetch();

            const notifyData = {
                recipients: [userId],
                url: '/dashboard/timeoff',
                // @ts-ignore
                content: `You got ${addDays} 
                ${selectedType.value === 'by-day' ? `${addDays > 1 ? 'days' : 'day'}`
                        : selectedType.value === 'by-hour' ? `${addDays > 1 ? 'hours' : 'hour'}`
                            : `${addDays > 1 ? 'mins' : 'min'}`}
                for time off`
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

            <Header>Time Off Status</Header>

            <div className='my-6 flex justify-between'>
                <p>Available Timeoff: <span className='text-primary font-medium'>{user?.timeOffInMins?.totalMinsAvailable ? `
                    ${totalDaysAvailable} days ${totalHoursAvailable} hours ${totalMinsAvailable} minutes
                ` : 'n/a'}</span></p>
                <p>Taken Timeoff: <span className='text-primary font-medium'>{user?.timeOffInMins?.totalMinsTaken ? `
                    ${totalDaysTaken} days ${totalHoursTaken} hours ${totalMinsTaken} minutes
                ` : 'n/a'}</span></p>
            </div>


            <div className="flex flex-col w-full">

                <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
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
                </div>


                <div className="w-full h-[50px] flex mt-[30px] items-center justify-end">
                    <Button
                        className="w-[200px] h-full !p-0 !rounded-[10px]"
                        onClick={handleTimeoffDays}
                        disabled={parseInt(addDays) === 0 || addDays === '' || loading || selectedType.value === ''}
                        loading={loading}
                        loadingText={'Updating'}
                    >
                        Update
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Timeoff
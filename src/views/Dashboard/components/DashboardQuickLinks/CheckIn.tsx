import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    token: any;
    userId: any;
    userFetch: any;
    isChecked: boolean;
}

const CheckIn = ({ token, userId, isChecked, userFetch }: Props) => {

    // states
    const [loading, setLoading] = useState(false);

    // checked
    const handleCheckin = (e: any) => {

        const data = { isPresent: true, user: userId }

        setLoading(true);
        axios.post(`${process.env.serverUrl}attendance`, data, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                userFetch();
                setLoading(false);
                if (response.data.success === false) {
                    return toast.error(response.data.message);
                }
                if (response.data.success === true) {
                    toast.success(response.data.message);
                }
            });
    }

    return (
        <button
            type='button'
            onClick={handleCheckin}
            className='bg-primary hover:bg-lightHover transition ease-in-out duration-300 text-white text-[14px] p-[10px_15px] rounded-[8px] disabled:opacity-25 hidden lg:block'
            disabled={isChecked}
        >
            {loading ? <div className='flex justify-center'><div id='status__loading' className='mr-1'></div>Checking In</div> : 'Check In'}
        </button>
    )
}

export default CheckIn
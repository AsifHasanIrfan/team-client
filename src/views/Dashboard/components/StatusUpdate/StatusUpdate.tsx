import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { userBioUpdate } from '@redux/actions/users';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const StatusUpdate = () => {

    // global variable from redux
    const dispatch = useAppDispatch();
    const { auth, users } = useAppSelector(state => state);

    // states
    const [bio, setBio] = useState('');

    // load logged user bio
    useEffect(() => {
        if (auth.user) {
            setBio(auth.user.bio)
        }
    }, [auth.user])

    // user bio handle
    const handleStatus = (e: any): void => {
        e.preventDefault();
        if (bio?.length > 60) {
            toast.error('Status maximum 60 character!');
            return;
        }
        const sendData = { bio: bio }
        dispatch(userBioUpdate(sendData, auth.token, auth.user._id));
    }

    return (
        <div className='px-5 py-[18px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative p-[18px_20px_25px_20px]'>
            <div className='flex justify-between items-center mb-[18px]'>
                <h4 className='md:text-2xl text-[12px] font-medium cursor-default flex items-center gap-2'>
                    Update Your Status
                    <span className={`md:text-xs text-primary border rounded-full h-7 w-7 flex items-center justify-center
                     ${bio?.length > 49 && 'text-darkOrange border-darkOrange'}
                     ${bio?.length > 60 && '!text-white !border-primary bg-primary !p-[6px_5px]'}
                    `}>
                        {bio?.length > 60 && '-'}{bio?.length ? bio.length : 0}
                    </span>
                </h4>
                <p className='font-medium md:text-base text-[10px] text-[#7B7B7B] pr-[1px] cursor-default'>Note: Your Status is Public</p>
            </div>

            {(!auth.token) ? <div className='flex justify-center mt-5'><div id='button__loading'></div></div>
                : <form className='relative' onSubmit={handleStatus}>
                    <input
                        type="text"
                        placeholder='How are you feeling today...'
                        value={bio}
                        maxLength={86}
                        onChange={(e) => setBio(e.target.value)}
                        className={`w-full bg-[#F2F2F2] rounded-[10px] text-[16px] p-[13px_15px] border-0 outline-none
                            ${bio?.length > 49 && '!border border-darkOrange'} 
                            ${bio?.length > 60 && '!border !border-primary'} 
                        `}
                        readOnly={users.update_user_bio_loading}
                    />

                    <pre className={`absolute font-primary top-[14px] lg:block hidden
                            ${bio?.length > 49 ? 'left-[16px]' : 'left-[15px]'}
                    `}>{bio?.slice(0, 60)}
                        <span className='!bg-primary/[.30]'>{bio?.slice(60)}</span>
                    </pre>

                    <button
                        type='submit'
                        className='bg-[#C50027] hover:bg-lightHover transition duration-300 ease-in-out text-white text-[14px] p-[10px_15px] rounded-[8px] md:w-max w-full mt-[10px] md:mt-0 md:absolute md:top-[5px] md:right-[8px] disabled:opacity-25'
                        disabled={users.update_user_bio_loading || bio === undefined}
                    >

                        {users.update_user_bio_loading ? <div className='flex justify-center'><div id='status__loading' className='mr-1'></div> Updating</div> : 'Update Status'}

                    </button>
                </form>}
        </div >
    );
};

export default StatusUpdate;
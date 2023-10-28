import Button from '@components/Button';
import Modal from '@components/Modal'
import { statusDatas } from '@config/constants';
import useJobs from '@hooks/useJobs';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Select from 'react-select';

type Props = {
    openView: boolean;
    setViewOpen: (openView: boolean) => void;
    token: string;
    data: any;
}

const ViewJobModal = ({ openView, setViewOpen, token, data }: Props) => {

    // hooks
    const { jobsFetch } = useJobs(token);

    // states
    const [loading, setLoading] = useState(false);
    // get selected option
    const [selectedStatusOption, setSelectedStatusOption] = useState<any>(statusDatas[0]);

    useEffect(() => {
        setSelectedStatusOption(statusDatas.filter((item) => item.value === data?.status))
    }, [data])

    // select style
    const customStyle = {
        control: (provided: any) => ({
            ...provided,
            height: 0,
            minHeight: '33px',
            padding: 0,
            margin: 0,
            marginLeft: 0,
            border: '0px solid black',
            fontSize: 16,
            backgroundColor: 'white',
            cursor: 'pointer',
            outline: 'none',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#C10206' : 'transparent',
            color: state.isSelected ? 'white' : 'initial',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
                color: state.isSelected ? 'white' : 'initial',
            },
        }),
    };

    const handleJobUpdateStatus = (e: any) => {
        e.preventDefault()

        // checking user working as is selected
        if (selectedStatusOption.value === '') {
            toast.error('Required status field!');
            return;
        }

        setLoading(true);
        fetch(`${process.env.serverUrl}job/${data._id}/update`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: selectedStatusOption.value
            }),
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.success === false) {
                    return toast.error(data.message);
                }
                if (data.success === true) {
                    jobsFetch();
                    setViewOpen(false);
                    toast.success(data.message);
                }
            });
    }


    return (
        <Modal open={openView} setOpen={setViewOpen} title={'View Job'}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px] job__createModal">

                <form onSubmit={handleJobUpdateStatus}>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5">

                        <div className={`w-full mb-[20px] md:col-span-2 col-span-1`}>
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                                Title
                            </h2>

                            <div className="w-full overflow-hidden h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] relative  mb-[15px] disabled:bg-slate-400">
                                <input
                                    value={data?.title}
                                    disabled
                                    type="text"
                                    required
                                    placeholder="ex: React Developer"
                                    className="w-full h-full border-none outline-none py-8 px-5"
                                />
                            </div>
                        </div>

                        <div className={`w-full mb-[20px] col-span-2`}>
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                                Status
                            </h2>

                            <div className="w-full h-[70px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative  mb-[15px] ">
                                <Select
                                    defaultValue={statusDatas.filter((item) => item.value === data?.status)}
                                    options={statusDatas}
                                    styles={customStyle}
                                    value={selectedStatusOption}
                                    id="selectbox"
                                    instanceId="selectbox"
                                    isSearchable={false}
                                    onChange={(option: any) => {
                                        setSelectedStatusOption(option)
                                    }}
                                    formatOptionLabel={({ title }: { title: string }) => <>{title}</>}
                                />
                            </div>
                        </div>

                    </div>



                    <div className='flex justify-end'>
                        <div className={`md:w-[200px] w-full h-[50px] mt-[15px] self-end`}>
                            <Button
                                rounded="md"
                                className={`w-full h-full !text-sm !px-[15px]`}
                                disabled={loading}
                            >
                                {loading ? <><span id='button__loading' className='mr-1'></span> Updating</> : 'Update'}
                            </Button >
                        </div>
                    </div >

                </form >
            </div >
        </Modal >
    )
}

export default ViewJobModal
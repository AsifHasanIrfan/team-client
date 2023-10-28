import Button from '@components/Button'
// import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef, useMemo } from 'react'
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { editiorFormats, editorModules } from '@hooks/helpers';
import { useAppSelector } from '@hooks/useRedux';
import { toast } from 'react-hot-toast';
import usePolicy from '@hooks/usePolicy';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import PolicyShow from './componets/PolicyShow';
import { cx } from '@config/constants';
import PreviewModal from './componets/PreviewModal';
import dynamic from 'next/dynamic';
const Jodit = dynamic(() => import('./componets/Editor'), { ssr: false })

type Props = {}

const AdminPrivacyPolicy = (props: Props) => {

    // global variable from redux
    const { auth } = useAppSelector((state) => state);



    // hooks
    const { policy, policyLoading, policydFetch } = usePolicy(auth.token);

    // states
    const [showContent, setShowContent] = useState(true);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // if data set on state
    useEffect(() => {
        if (policy?.data) {
            setValue(policy?.data?.content)
        }
    }, [policy?.data])

    // update
    const handleUpdatePolicy = (e: any) => {
        e.preventDefault();

        if (!value) {
            toast.error('All fields required!');
            return;
        }

        setLoading(true);
        fetch(`${process.env.serverUrl}admin-privacy-policy`, {
            method: 'PATCH',
            body: JSON.stringify({ content: value, dataId: policy?.data?._id }),
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${auth?.token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.success === false) {
                    return toast.error(data.message);
                }
                if (data.success === true) {
                    policydFetch();
                    toast.success(data.message);
                }
            });
    }

    // if no token & api fetching loading will go on
    if (!auth.token || policyLoading) return <FullPageLoader />;

    return (
        <div className=''>
            <div className='flex justify-end mb-[20px]'>
                <div className={`w-[200px] h-[50px] mt-[10px]`}>
                    <Button rounded="md" className={`w-full h-full !text-sm !px-[15px]`} onClick={() => setShowContent(!showContent)}>
                        {showContent ? 'Edit' : 'Show'}
                    </Button >
                </div>
            </div>

            <div className='bg-white py-[30px] px-3 shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px] text-editor'>

                <div className={`w-full flex md:flex-row flex-col md:items-center md:gap-5 gap-1 mb-[40px] px-5 justify-between`}>
                    <h2 className={cx('md:text-[24px] text-[16px] font-medium leading-[34px]')}>
                        Privacy & Policy
                    </h2>

                    {!showContent ? <button className='text-primary hover:text-red mr-3' onClick={() => setOpen(true)}>Preview</button> : null}
                </div>

                {showContent ?
                    <>
                        <PolicyShow data={policy?.data} />
                    </> :

                    <div className='px-5'>

                        {/* <ReactQuill
                            value={value}
                            onChange={setValue}
                            modules={editorModules}
                            formats={editiorFormats}
                            theme='snow'
                            placeholder='Write the terms'
                        /> */}

                        <Jodit
                            value={value}
                            setValue={setValue}
                        />

                        <div className='flex justify-end'>
                            <Button
                                rounded="md"
                                className={`w-full md:w-[250px] mt-7 h-full !text-sm !px-[15px]`}
                                onClick={handleUpdatePolicy}
                                loading={loading}
                                disabled={loading}
                            >
                                Update
                            </Button >
                        </div>
                    </div>
                }
            </div>

            <PreviewModal open={open} setOpen={setOpen} content={value} />
        </div>

    )
}

export default AdminPrivacyPolicy
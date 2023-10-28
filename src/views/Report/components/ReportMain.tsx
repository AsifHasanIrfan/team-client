import Button from '@components/Button'
import ProfileInput from '@components/Input/ProfileInput'
import { useAppDispatch } from '@hooks/useRedux'
import { createNotification } from '@redux/actions/notification'
import { uploadFiles } from '@utils/uploadFile'
import DrawbackDropzone from '@views/UserProfile/components/UserCardsInfo/DrawBack/partials/DrawbackDropzone'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import ReportSelect from '../ReportSelect'

type Props = {
    activeUsers: any;
    user: any;
    token: any;
    socket: any;
    fullName: string;
}

const ReportMain = ({ activeUsers, user, token, socket, fullName }: Props) => {

    let attachments: any = [];
    const dispatch = useAppDispatch()

    // states
    const [file, setFile] = useState<File[]>([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ subject: '', description: '' });
    const [selectedUserId, setSelectedUserId] = useState({ title: "Select Member", value: '', member: '' });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (input.subject == '' || input.description === '' || selectedUserId.member === '') {
            toast.error('All Fields Are Required!');
            return;
        }

        setLoading(true);
        // attachments
        if (files.length > 0) {
            attachments = await uploadFiles(files);
        }

        const sendData = {
            ...input,
            user: user,
            member: selectedUserId?.member,
            attachments,
        }

        try {
            setLoading(true);
            const { data } = await axios.post(
                // `${process.env.serverUrl}user/drawback/${userId}`, {
                `${process.env.serverUrl}report`, sendData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                setLoading(false);
                setInput({ subject: '', description: '' });
                setFiles([]);
                setFile([]);
                setSelectedUserId({ title: "Select Member", value: '', member: '' });

                const notifyData = {
                    recipients: [],
                    isAdmin: true,
                    url: '/dashboard/users/reports',
                    // @ts-ignore
                    content: `You recived a report from ${fullName}`
                }
                dispatch(createNotification(notifyData, token, socket))
                toast.success(data.message);
            } else {
                setLoading(false);
                toast.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error as any);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8">

                <ProfileInput
                    label={'Subject'}
                    id={'subject'}
                    value={input?.subject}
                    isRequired={true}
                    placeholder={'Enter report subject'}
                    onChange={(e: any) =>
                        setInput({ ...input, subject: e.target.value })
                    }
                    mainCss={'mb-0'}
                />

                <ReportSelect
                    label="Members"
                    selectedOption={selectedUserId}
                    setSelectedOption={setSelectedUserId}
                    options={activeUsers}
                />

                <div className={`w-full mb-[15px] mt-[20px] lg:mt-0 lg:col-span-2 col-span-1`}>
                    <h2 className="font-medium text-base leading-6 mb-2.5">
                        Description
                    </h2>

                    <div className={`focus:outline-none rounded-[8px]  w-full`}>
                        <textarea
                            className="form-control block w-full px-5 py-[18px] text-base font-normal bg-white bg-clip-padding border resize-none border-solid border-gray-300 rounded m-0 focus:outline-none"
                            id="description"
                            rows={6}
                            value={input?.description}
                            placeholder="Your description"
                            onChange={(e: any) =>
                                setInput({ ...input, description: e.target.value })
                            }
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="my-5">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                    Attachment{' '}
                </h2>
                <DrawbackDropzone setFiles={setFiles} file={file} setFile={setFile} />
            </div>

            <div className="gird md:mt-[40px] mt-[25px]">
                <div className="w-full">
                    <Button
                        type="submit"
                        rounded="md"
                        disabled={loading}
                        className="md:w-max w-full ml-auto h-full !text-sm"
                        loading={loading}
                        loadingText="Reporting"
                    >
                        Submit Report
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ReportMain
// external import
import React, { useRef, useState } from 'react';
// internal import
import Button from '@components/Button';
import Card from '@views/UserProfile/partials/Card';
// import RewardsHistory from './RewardsHistory';
import ViewLess from '@views/UserProfile/partials/ViewLess';
import CardHeader from '@views/UserProfile/partials/CardHeader';
import ProfileInput from '@components/Input/ProfileInput';
import AchievementsHistory from './AchievementsHistory';
import UploadIcon from '@components/Icons/Actions/UploadIcon';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { uploadFiles } from '@utils/uploadFile';
import axios from 'axios';
import { useDetectClickOutside } from 'react-detect-click-outside';
import dayjs from 'dayjs';
import DatePicker from '@components/DatePicker';
import { VscCalendar } from 'react-icons/vsc';
import useAchievementsById from '@hooks/useAchievementsById';
import useUsers from '@hooks/useUsers';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';
import useUser from '@hooks/useUser';
import useSalaryInfo from '@hooks/useSalaryInfo';
import { formatAmountNumberInput } from '@hooks/helpers';

type Props = {
    userId: any;
    token: any;
}

const Achievements = ({ userId, token }: Props) => {

    // global
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector(state => state);

    // hooks
    const { userFetch } = useUser(token, userId);
    const { usersFetch } = useUsers(token);
    const { salaryInfoFetch } = useSalaryInfo(token, userId);
    const { achievements, achievementsLoading, achievementsFetch } = useAchievementsById(token, userId);

    // states
    const [datePicker, setDatePicker] = useState(false);
    const [datePick, setDatePick] = useState(dayjs());
    const [tableActive, setTableActive] = useState(false);
    const [input, setInput] = useState<any>({ title: '', amount: '', img: [], imgUrl: '', user: userId });
    const [imgSrc, setImgSrc] = useState<any>();
    const [imgUploadError, setImgUploadError] = useState({ img: '' });
    const [loading, setLoading] = useState(false);

    const dateRef = useDetectClickOutside({ onTriggered: () => setDatePicker(false), });

    // image handler
    const handleImageChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        if (!target.files) return;

        if (!target.files[0]?.name.match(/\.(jpg|jpeg|png|JPG|PNG)$/)) {
            setImgSrc('');
            setInput({ ...input, img: [] });
            setImgUploadError({
                ...imgUploadError,
                img: 'Only jpg, jpeg & png file supported',
            });
        } else {
            setImgUploadError({ ...imgUploadError, img: '' });
            setImgSrc(URL.createObjectURL(target.files[0]));
            setInput({ ...input, img: [target.files[0]] });
        }
    };

    // add achievement
    const handleAddAchievements = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        // check image upload
        if (input.img.length === 0) {
            toast.error('Please upload an image!');
            setLoading(false);
            return;
        }

        const res = await uploadFiles(input.img);
        const { img, ...data } = input;
        const sendData = { ...data, date: datePick.format('MM/DD/YYYY'), amount: parseFloat(input.amount), imgUrl: res[0].url }

        axios.post(`${process.env.serverUrl}achievement`, sendData, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.data.success === false) {
                    return toast.error(response.data.message);
                }
                if (response.data.success === true) {

                    // refetch
                    achievementsFetch();
                    usersFetch();
                    userFetch();
                    salaryInfoFetch();

                    toast.success(response.data.message);

                    const notifyData = {
                        recipients: [userId],
                        url: '/dashboard/team',
                        // @ts-ignore
                        content: `You got ${input.amount} for ${input.title}`
                    }

                    dispatch(createNotification(notifyData, token, socket));

                    setInput({ img: [], imgUrl: '', title: '', amount: '', user: userId });
                    setImgSrc('');
                    setDatePick(dayjs());
                }
            });
    };

    return (
        <Card>
            <CardHeader>Achievements</CardHeader>

            <form onSubmit={handleAddAchievements}>
                <div className="img-input my-5">
                    {imgSrc && (
                        <div className="mb-2 text-center add-img">
                            <Image
                                width={100}
                                height={100}
                                src={imgSrc}
                                alt="pro"
                                objectFit="cover"
                            />
                        </div>
                    )}
                    <div className="text-center box">
                        <input
                            type="file"
                            name="image"
                            accept=".jpg, .jpeg, .png, .JPG, .PNG"
                            id="image"
                            className="inputfile inputfile-1"
                            onChange={handleImageChange}
                        // onChange={dd}
                        />
                        <label htmlFor="image" className="rounded">
                            <div className="flex items-center gap-2">
                                <UploadIcon />
                                <span>Choose a file&hellip;</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className='w-full'>
                    <ProfileInput
                        label={'Achievement Title'}
                        id={'title'}
                        value={input?.title}
                        isRequired={true}
                        placeholder={'Employee of the month'}
                        onChange={(e: any) => setInput({ ...input, title: e.target.value })}
                    />

                    <ProfileInput
                        label={'Amount'}
                        id={'amount'}
                        type={'number'}
                        value={input?.amount}
                        isRequired={true}
                        placeholder={'$1000'}
                        mainCss={'mt-[25px]'}
                        onKeyDown={(e: any) => formatAmountNumberInput(e)}
                        onChange={(e: any) => setInput({ ...input, amount: e.target.value })}
                    />

                    <div className="mb-[15px] sm:mb-[20px] w-full">
                        <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                            Date
                        </h2>
                        <div
                            className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative achievement-datepicker"
                            onClick={() => setDatePicker(true)}
                            ref={dateRef}
                        >
                            <p className="ml-2">{datePick.format('DD-MM-YYYY')}</p>
                            {datePicker && (
                                <DatePicker selectedDate={datePick} onChange={setDatePick} />
                            )}
                            <VscCalendar className="ml-5" />
                        </div>
                    </div>

                </div>

                <div className="h-[50px] w-full">
                    <Button
                        className="w-full h-full !rounded-[10px]"
                        loading={loading}
                        loadingText={'Updating'}
                    >
                        Update
                    </Button>
                </div>
            </form>

            {/* datatable  */}
            {tableActive && (
                <AchievementsHistory
                    datas={achievements?.datas}
                    loading={achievementsLoading}
                    achievementsFetch={achievementsFetch}
                    token={token}
                    userId={userId}
                />
            )}

            {/* button */}
            <div className="w-fit" role='button' onClick={() => setTableActive(!tableActive)}>
                <ViewLess active={tableActive} />
            </div>
        </Card>
    );
};
export default Achievements;

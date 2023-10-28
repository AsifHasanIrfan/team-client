import Button from '@components/Button';
import ProfileInput from '@components/Input/ProfileInput';
import Modal from '@components/Modal'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    token: any;
    teamRewardFetch: any;
    fDatas: any;
}

const TeamRDModal = ({ setOpen, open, token, teamRewardFetch, fDatas }: Props) => {

    // states
    const [loading, setLoading] = useState(false);
    const [dataId, setDataId] = useState('');
    const [reward, setReward] = useState(0);
    const [drawback, setdrawback] = useState(0);
    const [additionalDrawback, setAdditionalDrawback] = useState(0);

    useEffect(() => {
        if (fDatas.length) {
            setDataId(fDatas[0]._id)
            setReward(fDatas[0].rewardAmount);
            setdrawback(fDatas[0].drawbackAmount);
            setAdditionalDrawback(fDatas[0].additionalDrawbackAmount);
        }
    }, [fDatas])

    // update
    const handleTeamRewardUpdate = (e: any) => {
        e.preventDefault()

        // checking user working as is selected
        if (!reward || !drawback || !additionalDrawback) {
            toast.error('All fields required!');
            return;
        }

        const data = {
            rewardAmount: reward,
            drawbackAmount: drawback,
            additionalDrawbackAmount: additionalDrawback,
            dataId: dataId
        }

        setLoading(true);
        fetch(`${process.env.serverUrl}team-member/rewards-drawback`, {
            method: 'PATCH',
            body: JSON.stringify(data),
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
                    setOpen(false);
                    teamRewardFetch();
                    toast.success(data.message);
                }
            });
    }


    return (
        <Modal setOpen={setOpen} open={open} title={'Team Month Rewards'}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px] benefit__createModal">

                <div className="grid grid-cols-1 pt-3">
                    <ProfileInput
                        label={'Team Reward Amount'}
                        id={'rewardAmount'}
                        type='number'
                        value={reward}
                        isRequired={true}
                        placeholder={'Team Reward Amount'}
                        onChange={(e: any) =>
                            setReward(e.target.value)
                        }
                    />

                    <ProfileInput
                        label={'Team Drawback Amount'}
                        id={'drawbackAmount'}
                        type='number'
                        value={drawback}
                        isRequired={true}
                        placeholder={'Team Drawback Amount'}
                        onChange={(e: any) =>
                            setdrawback(e.target.value)
                        }
                        mainCss='mt-2'
                    />

                    <ProfileInput
                        label={'Additional Drawback Amount'}
                        id={'additionalDrawbackAmount'}
                        type='number'
                        value={additionalDrawback}
                        isRequired={true}
                        placeholder={'Additional Drawback Amount'}
                        onChange={(e: any) =>
                            setAdditionalDrawback(e.target.value)
                        }
                        mainCss='mt-2'
                    />
                </div>

                <div className="flex items-center justify-end my-3 mt-8">
                    <Button
                        rounded="md"
                        className={`h-full !text-sm !px-[15px] md:w-[250px] w-full`}
                        onClick={handleTeamRewardUpdate}
                        loading={loading}
                        loadingText={'Updating'}
                        disabled={loading}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default TeamRDModal
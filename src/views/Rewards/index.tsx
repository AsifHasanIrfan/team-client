import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import React, { useState, useEffect } from 'react';
import RewardBottomCards from './components/RewardBottomCards';
import RewardTopCards from './components/RewardTopCards';
import useUser from '../../hooks/useUser';
import useDgsById from '@hooks/useDgsById';
import useAchievementsById from '@hooks/useAchievementsById';

const Index: React.FC = () => {

    // global sates
    const { auth } = useAppSelector((state) => state);

    // hooks
    const { user, userLoading } = useUser(auth.token, auth.user?._id)
    const { dgs, dgsLoading } = useDgsById(auth?.token, auth?.user?._id);
    const { achievements, achievementsLoading } = useAchievementsById(auth?.token, auth?.user?._id);

    // states
    const [newDatas, setNewData] = useState<any>([]);

    useEffect(() => {
        if (dgs?.datas?.length > 0 && achievements?.datas?.length > 0) {
            setNewData([...dgs?.datas, ...achievements?.datas])
        } else if (dgs?.datas?.length > 0) {
            setNewData([...dgs?.datas])
        } else if (achievements?.datas?.length > 0) {
            setNewData([...achievements?.datas])
        } else {
            setNewData([])
        }
    }, [dgs?.datas, achievements?.datas])

    // loader
    if (!auth.token || userLoading || dgsLoading || achievementsLoading) return <FullPageLoader />

    return (
        <div>
            <RewardTopCards user={user?.user} />
            <RewardBottomCards datas={newDatas} />
        </div>
    );
};

export default Index;
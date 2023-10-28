import useApplyProjects from '@hooks/useApplyProjects';
import React from 'react'

type Props = {
    data: any;
    token: any;
}

const Member = ({ data, token }: Props) => {

    //hooks
    const { applyProjects } = useApplyProjects(token, `user=${data?.assignedUser}&marketplaceId=${data._id}`);

    return (
        <div>{!applyProjects?.datas?.length ? 'No member' : applyProjects?.datas[0]?.user?.firstName + ' ' + applyProjects?.datas[0]?.user?.lastName}</div>
    )
}

export default Member
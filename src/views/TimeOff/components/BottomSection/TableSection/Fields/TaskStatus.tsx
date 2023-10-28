import { cx } from '@config/constants'
import React from 'react'

type Props = {
    status: string;
}

const TaskStatus = ({ status }: Props) => {
    return (
        <div className={cx(
            'flex items-center justify-center w-[90px] rounded-[5px] cursor-default',
            status === 'progress' && 'bg-[#FFF4E5]',
            status === 'decline' && 'bg-[#FF00001A]',
            status === 'approved' && 'bg-[#21B9791A]'
        )}>
            <p
                className={cx(
                    'text-center rounded-[6px] px-[15px] py-2 text-sm leading-5 capitalize',
                    status === 'progress' && '!text-[#FF9500]',
                    status === 'decline' && '!text-[#FF0000]',
                    status === 'approved' && '!text-[#21B979]'
                )}
            >
                {status === 'progress' ? 'pending' : status}
            </p>
        </div>
    )
}

export default TaskStatus
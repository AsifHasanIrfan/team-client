import { TimeoffAPISendDataType } from '@config/types';
import React from 'react'

type Props = {
    datas: [];
    open: boolean;
    setOpen: (open: boolean) => void;
    setSelectedUserId: (selectedUserId: string) => void;
    id: any;
}

const RequestButton = ({ open, setOpen, datas, setSelectedUserId, id }: Props) => {
    return (
        <button type='button' className={`p-[8px_15px] rounded-[6px] outline-none ${datas.filter((e: TimeoffAPISendDataType) => e.status === 'progress').length > 0 ? 'bg-[#21B979]/[.06]' : 'bg-[#FF9500]/[.06]'} `}
            onClick={() => {
                setOpen(true);
                setSelectedUserId(id);
            }}
        >
            <span className={`${datas.filter((e: TimeoffAPISendDataType) => e.status === 'progress').length > 0 ? 'text-[#21B979]' : 'text-[#FF9500]'}`}>
                {datas.filter((e: TimeoffAPISendDataType) => e.status === 'progress').length}
            </span>
        </button>
    )
}

export default RequestButton
import React from 'react'
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

type Props = {
    setOpen: any;
    setModalData: any;
    data: any;
    edit?: boolean;
    request?: boolean;
    setSelectedUserId?: any;
}

const TableButton = ({ setModalData, setOpen, data, edit, request, setSelectedUserId }: Props) => {
    return (
        <button
            type="button"
            className="group"
            onClick={() => {
                setModalData(data);
                setOpen(true);
                request && setSelectedUserId(data.user._id);
            }}
        >
            <span className="flex items-center gap-[5px] text-[16px]">
                {edit ?
                    <FiEdit className='group-hover:text-primary text-[16px] transition ease-in-out duration-300 w-[22px] h-[25px]' />
                    : <BsEye className="w-[22px] group-hover:text-primary h-[25px] transition ease-in-out duration-300" />}

                <span className={`font-medium group-hover:text-primary transition ease-in-out duration-300 ${edit && 'relative top-[1px]'}`}>
                    {edit ? 'Edit' : 'View'}
                </span>
            </span>
        </button>
    )
}

export default TableButton
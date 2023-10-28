import React from 'react'

type Props = {
    label?: string;
    type?: string;
    value?: any;
    onChange?: any;
    onKeyDown?: any;
    isRequired?: boolean;
    placeholder?: string;
    mainCss?: string;
    isReadonly?: boolean;
    id?: string;
}

const ProfileInput = ({ label, type, id, value, onChange, isRequired, placeholder, mainCss, isReadonly, onKeyDown }: Props) => {
    return (
        <div className={`w-full mb-[15px] col-span-1 ${mainCss}`}>

            <h2 className="font-medium text-base leading-6 mb-2.5">
                {label}
            </h2>

            <div className={`focus:outline-none rounded-[8px] ${!isReadonly && 'border border-[#E0E0E0] py-[18px] px-5'} w-full h-[58px]`}>
                <input
                    value={value ? value : ''}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    type={type ? type : 'text'}
                    name={id ? id : ''}
                    id={id ? id : ''}
                    required={isRequired}
                    readOnly={isReadonly}
                    placeholder={placeholder}
                    className={`w-full h-full border-none outline-none ${isReadonly && 'bg-[#DADADA] rounded-[8px] py-5 px-5'}`}
                    autoComplete="off"
                    autoFocus={false}
                />
            </div>

        </div>
    )
}

export default ProfileInput
import React from 'react';

const SectionHeader = ({ title }: { title: string; }) => {
    return (
        <div className="w-full flex justify-between items-center h-[70px]">
            <h2 className="w-[125px] h-[34px] text-[24px] font-medium leading-[34px]">
                {title}
            </h2>
        </div>
    );
};
export default SectionHeader;

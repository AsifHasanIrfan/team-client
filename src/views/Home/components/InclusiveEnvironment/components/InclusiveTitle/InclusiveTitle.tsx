import React from 'react';

const InclusiveTitle: React.FC = () => {
    return (
        <div className='flex justify-center'>
            <div className='lg:w-7/12 md:w-12/12'>
                <h1 className='lg:text-4xl md:text-[32px] sm:text-3xl text-3xl font-semibold mb-4 text-center'>
                    Creating an inclusive environment
                </h1>
                <p className='lg:text-base md:text-sm text-center'>We’re dedicated to hiring diverse talent and ensuring that we treat you with respect and support throughout the interview process and once you join Digital Greeg. We embrace diversity and strive to create conditions that provide everyone with an equal opportunity to thrive. We offer several programmes and initiatives to foster these values.</p>
            </div>
        </div>
    );
};

export default InclusiveTitle;
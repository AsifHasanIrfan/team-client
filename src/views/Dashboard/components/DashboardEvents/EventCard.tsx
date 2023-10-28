import Image from 'next/image';
import React from 'react';

const EventCard = () => {
    return (
        <div className='my-[10px]'>
            <div className='bg-primary rounded-[10px] pl-[6px]'>
                <div className='bg-[#263238] rounded-[10px] p-[22px_20px_22px_40px] '>

                    <div className='flex justify-between items-center'>

                        <div className='cursor-default'>
                            <h4 className='font-bold text-base mb-[8px] text-white'>Team Meeting</h4>
                            <p className='text-sm text-white'>9:00AM - 10:00 AM</p>
                        </div>

                        <div className='flex items-center relative right-[40px]'>
                            <div className="absolute right-[-45px]">
                                <Image src='/images/persons/person-4.png' width={40} height={40} alt='event' />
                            </div>
                            <div className="absolute right-[-30px]">
                                <Image src='/images/persons/person-3.png' width={40} height={40} alt='event' />
                            </div>
                            <div className="absolute right-[-15px]">
                                <Image src='/images/persons/person-2.png' width={40} height={40} alt='event' />
                            </div>
                            <div className="">
                                <Image src='/images/persons/person-1.png' width={40} height={40} alt='event' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
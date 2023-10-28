import React from 'react';
import TextSectionFive from './components/TextSectionFive';
import TextSectionFour from './components/TextSectionFour';
import TextSectionOne from './components/TextSectionOne'
import TextSectionSeven from './components/TextSectionSeven';
import TextSectionSix from './components/TextSectionSix';
import TextSectionThree from './components/TextSectionThree';
import TextSectionTwo from './components/TextSectionTwo';

const index = () => {
    return (
        <main className='bg-[#F7F8FA]'>
            <div className='md:p-[171px_0_80px_0] p-[120px_0_60px_0] text-center bg-[#FFF]'>
                <h6 className='text-[40px] font-[600]'>Privacy Policy</h6>
            </div>
            <div className='py-[80px] bg-[#E5E5E5]'>
                <div className='container'>
                    <TextSectionOne />
                    <TextSectionTwo />
                    <TextSectionThree />
                    <TextSectionFour />
                    <TextSectionFive />
                    <TextSectionSix />
                    <TextSectionSeven />
                </div>
            </div>
        </main>
    );
};

export default index;
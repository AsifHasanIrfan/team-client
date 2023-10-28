import React from 'react';
import TextSectionOne from '@views/Privacy/components'
import TextSectionTwo from '@views/Privacy/components/TextSectionTwo';
import TextSectionThree from '@views/Privacy/components/TextSectionThree';
import TextSectionFour from '@views/Privacy/components/TextSectionFour';
import TextSectionFive from '@views/Privacy/components/TextSectionFive';
import TextSectionSix from '@views/Privacy/components/TextSectionSix';
import TextSectionSeven from '@views/Privacy/components/TextSectionSeven';

const index = () => {
    return (
        <main className='bg-[#F7F8FA]'>
            <div className='md:p-[171px_0_80px_0] p-[120px_0_60px_0] text-center bg-[#FFF]'>
                <h6 className='text-[40px] font-[600]'>Terms & Conditions</h6>
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
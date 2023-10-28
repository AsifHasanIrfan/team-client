import React from 'react'
import { useApplicationInfo } from '@hooks/useApplicationInfo'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

import Button from '@components/Button'
import { useApplyHandlers } from '@hooks/useApplyHandlers'
import StepCounter from '../StepCounter'

const PortfolioLink = () => {
    const { applicationData, updateApplicationData } = useApplicationInfo()
    const { handlePrev, handleNext } = useApplyHandlers()

    function handleChange({ target }: any) {
        updateApplicationData(target.name, target.value)
    }

    return (
        <>
            <StepCounter nextClick={() => handleNext()} />

            <div className='w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]' >
                <div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Personal Website</h3>

                        <input
                            name='website'
                            className='w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border border-[#cfcfcf]'
                            placeholder='Enter link'
                            onChange={handleChange}
                            value={applicationData.website}
                        />
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Dribbble URL</h3>

                        <input
                            name='dribble'
                            className='w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border border-[#cfcfcf]'
                            placeholder='Enter link'
                            onChange={handleChange}
                            value={applicationData.dribble}
                        />
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Behance URL</h3>

                        <input
                            name='behance'
                            className='w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border border-[#cfcfcf]'
                            placeholder='Enter link'
                            onChange={handleChange}
                            value={applicationData.behance}
                        />
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Uplabs URL</h3>

                        <input
                            name='uplabs'
                            className='w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border border-[#cfcfcf]'
                            placeholder='Enter link'
                            onChange={handleChange}
                            value={applicationData.uplabs}
                        />
                    </div>

                    <div >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >GitHub</h3>

                        <input
                            name='github'
                            className='w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border border-[#cfcfcf]'
                            placeholder='Enter link'
                            onChange={handleChange}
                            value={applicationData.github}
                        />
                    </div>

                </div>
            </div>

            <div className='w-full 2xl:absolute flex items-center justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 bottom-0 py-[20px] px-[60px]' >
                <Button startIcon={<HiOutlineArrowNarrowLeft />} onClick={() => handlePrev()} className="text-black hover:text-primary bg-transparent !pl-[0px] !shadow-none hover:bg-transparent" > Back </Button>
                <Button endIcon={<HiOutlineArrowNarrowRight />} onClick={() => handleNext()} > Next </Button>
            </div>
        </>
    )
}



export default PortfolioLink
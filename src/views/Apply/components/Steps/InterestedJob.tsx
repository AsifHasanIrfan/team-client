import { atom, useAtom } from 'jotai'
import React, { useState } from 'react'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

import Button from '@components/Button'
import { useApplicationInfo } from '@hooks/useApplicationInfo'
import { useApplyHandlers } from '@hooks/useApplyHandlers'
import StepCounter from '../StepCounter'

const jobOptions = ["designer", "developer", "marketing", "virtual assistant", "project manager"]

export const interestedJobAtom = atom(0)

const InterestedJob: React.FC = () => {
    const [showError, setShowError] = useState(false)

    const [selected, setSelected] = useAtom(interestedJobAtom)
    const { applicationData, updateApplicationData } = useApplicationInfo()
    const { handlePrev, handleNext } = useApplyHandlers()

    function handleSelect(index: any) {
        setSelected(index)
        updateApplicationData("job", jobOptions[selected])
    }

    function handleExperiance(e: any) {
        const result = e.target.value.replace(/\D/g, '');
        if (result.length > 0) {
            setShowError(false)
        }

        updateApplicationData("experience", result)
    }

    function onNext() {
        if (applicationData.experience.length > 0) {
            handleNext()
        } else {
            setShowError(true)
        }
    }

    return (
        <>
            <StepCounter nextClick={() => onNext()} />

            <div className='w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]' >
                <div>
                    <div className='mb-[40px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[40px]' >Select your interested job</h3>

                        <div className='flex items-center gap-[16px] flex-wrap max-w-[550px]' >
                            {jobOptions.map((e, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`
                                        py-[20px] px-[50px] capitalize leading-[20px] hover:border-red transition-all text-[16px] font-[400] text-[#1D1D1D] border border-[rgba(0,0,0,0.1)] rounded-full cursor-pointer
                                        ${selected === i && '!font-[600] !bg-primary !text-white'} 
                                    `}
                                > {e} </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Years of experience</h3>

                        <input
                            value={applicationData.experience}
                            onChange={handleExperiance}
                            className={`w-full h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${showError ? 'border-primary' : 'border-[#cfcfcf]'}`}
                            placeholder='1 Year'
                        />

                        {showError && <small className='text-primary mt-[7px] block text-end' >* Required Field</small>}
                    </div>
                </div>

            </div>

            <div className='w-full flex items-center 2xl:absolute justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 bottom-0 py-[20px] px-[60px]' >
                <Button startIcon={<HiOutlineArrowNarrowLeft />} onClick={() => handlePrev()} className="text-black hover:text-primary bg-transparent !pl-[0px] !shadow-none hover:bg-transparent" > Back </Button>
                <Button endIcon={<HiOutlineArrowNarrowRight />} onClick={() => onNext()} > Next </Button>
            </div>
        </>
    )
}

export default InterestedJob
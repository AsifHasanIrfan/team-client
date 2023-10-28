import React, { useState } from 'react'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

import Button from '@components/Button'
import { useApplyHandlers } from '@hooks/useApplyHandlers'
import { useApplicationInfo } from '@hooks/useApplicationInfo'
import StepCounter from '../StepCounter'

const Address = () => {
    const [stateErr, setStateErr] = useState(false)
    const [zipErr, setZipErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    const [locationErr, setLocationErr] = useState(false)

    const { applicationData, updateApplicationData } = useApplicationInfo()
    const { handlePrev, handleSubmit } = useApplyHandlers()

    const { location, city, state, zip } = applicationData

    function handleChange({ target }: any) {
        if (zip) setZipErr(false)
        if (city) setCityErr(false)
        if (state) setStateErr(false)
        if (location) setLocationErr(false)

        updateApplicationData(target.name, target.value)
    }

    function onNext() {
        if (location && city && state && zip) {
            handleSubmit()
        }

        if (!zip) setZipErr(true)
        if (!city) setCityErr(true)
        if (!state) setStateErr(true)
        if (!location) setLocationErr(true)
    }

    return (
        <>
            <StepCounter nextClick={() => onNext()} />

            <div className='w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]' >
                <div>
                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Location</h3>

                        <input
                            name='location'
                            className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${locationErr ? 'border-primary' : 'border-[#cfcfcf]'}`}
                            placeholder='Bangladesh'
                            onChange={handleChange}
                            value={location}
                        />
                        {locationErr && <small className='text-primary mt-[7px] block text-end' >* Required Field</small>}
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >City or Town</h3>

                        <input
                            name='city'
                            className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${cityErr ? 'border-primary' : 'border-[#cfcfcf]'}`}
                            placeholder='Dhaka'
                            onChange={handleChange}
                            value={city}
                        />
                        {cityErr && <small className='text-primary mt-[7px] block text-end' >* Required Field</small>}
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >State or District</h3>

                        <input
                            name='state'
                            className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${stateErr ? 'border-primary' : 'border-[#cfcfcf]'}`}
                            placeholder='Gazipur'
                            onChange={handleChange}
                            value={state}
                        />
                        {stateErr && <small className='text-primary mt-[7px] block text-end' >* Required Field</small>}
                    </div>

                    <div className='mb-[25px]' >
                        <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' >Zip Code</h3>

                        <input
                            name='zip'
                            className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${zipErr ? 'border-primary' : 'border-[#cfcfcf]'}`}
                            placeholder='3661'
                            onChange={handleChange}
                            value={zip}
                        />
                        {zipErr && <small className='text-primary mt-[7px] block text-end' >* Required Field</small>}
                    </div>

                </div>

            </div>

            <div className='w-full flex items-center 2xl:absolute justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 bottom-0 py-[20px] px-[60px]' >
                <Button startIcon={<HiOutlineArrowNarrowLeft />} onClick={() => handlePrev()} className="text-black hover:text-primary bg-transparent !pl-[0px] !shadow-none hover:bg-transparent" > Back </Button>
                <Button endIcon={<HiOutlineArrowNarrowRight />} onClick={() => onNext()} > Submit </Button>
            </div>
        </>

    )
}

export default Address
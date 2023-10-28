import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

import { GrAdd } from 'react-icons/gr'
import { CgClose } from 'react-icons/cg'
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi'

import Button from '@components/Button'
import { interestedJobAtom } from './InterestedJob'
import { skillsData } from '@config/constants'
import { useApplicationInfo } from '@hooks/useApplicationInfo'
import { applicationInfo } from '@state/index'
import { useApplyHandlers } from '@hooks/useApplyHandlers'
import StepCounter from '../StepCounter'

const Skills = () => {
    const [selectedJob, setSelectedJob] = useAtom(interestedJobAtom)
    const [submitedSkill, setSubmittedSkill] = useAtom(applicationInfo)

    const { updateApplicationData } = useApplicationInfo()
    const { handlePrev, handleNext } = useApplyHandlers()

    const [customSkill, setCustomSkills] = useState<Array<String>>([])
    const [skills, setSkills] = useState(Object.values(skillsData)[selectedJob])
    const [selectedSkill, setSelectedSkill] = useState(submitedSkill.skills.length > 0 ? submitedSkill.skills : [skills[0]])

    const handleAdd = (e: String) => {
        setSelectedSkill([...selectedSkill, e])
    }

    const handleRemove = (e: String) => {
        if (selectedSkill.length > 1) {
            setSelectedSkill(selectedSkill.filter(ele => ele !== e))
        
           if (customSkill.includes(e)) {
             setSkills(skills.filter(ele => ele !== e))
           }
        }
    }

    function handleKeyDown(e: any) {
        if (e.key !== 'Enter') return

        const value = e.target.value
        if (!value.trim()) return

        setSkills([...skills, value])
        setCustomSkills([...customSkill, value])
        setSelectedSkill([...selectedSkill, value])

        e.target.value = ''
    }

    useEffect(() => {
        updateApplicationData('skills', selectedSkill)
    }, [selectedSkill])

    return (
        <>
            <StepCounter nextClick={() => handleNext()} />

            <div className='w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]' >
                <div className='max-w-[540px]' >
                    <div className='flex flex-wrap items-center gap-[15px]' >

                        {skills.map((e, i) => {
                            const select = selectedSkill.includes(e)

                            return (
                                <div
                                    key={i}
                                    className={`
                                        p-[15px] flex items-center gap-[7px]  capitalize leading-[20px] text-[16px] font-[400] text-[#1D1D1D] border border-[rgba(0,0,0,0.1)] rounded-full 
                                        ${select ? '!font-[600] !bg-primary !text-white' : 'cursor-pointer'}
                                    `}
                                    onClick={() => {
                                      if(!select){
                                        handleAdd(e)
                                      }  
                                    }}
                                >
                                    <span>{e}</span>

                                    <div className='text-white cursor-pointer' >
                                        {select ?
                                            <CgClose color='#fff' fontSize='19px' onClick={() => handleRemove(e)} /> :
                                            <GrAdd />
                                        }
                                    </div>
                                </div>
                            )
                        })}

                        <div className='mt-[40px] w-full' >
                            <h3 className='text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]' > Add your own skills </h3>

                            <input
                                onKeyDown={handleKeyDown}
                                type="text"
                                className='w-full h-[56px] px-[20px] py-[15px] outline-none text-[16px] bg-transparent rounded-[8px] border border-[#cecece]'
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className='w-full flex 2xl:absolute items-center justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 bottom-0 py-[20px] px-[60px]' >
                <Button startIcon={<HiOutlineArrowNarrowLeft />} onClick={() => handlePrev()} className="text-black hover:text-primary bg-transparent !pl-[0px] !shadow-none hover:bg-transparent" > Back </Button>
                <Button endIcon={<HiOutlineArrowNarrowRight />} onClick={() => handleNext()} > Next </Button>
            </div>
        </>

    )
}

export default Skills

import Button from '@components/Button'
import Link from 'next/link';
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs'

type Props = {

}

const ContactSuccess = (props: Props) => {
    return (
        <div className="rounded-lg px-[30px] md:px-10 md:pt-[90px] py-[50px] md:pb-[70px] md:py-[50px] bg-white flex flex-col items-center">
            <h1 className="md:text-[48px] text-[30px] font-[600] text-primary mb-[13px]">
                Thank You!
            </h1>

            <h2 className="md:text-[30px] text-[20px] font-[500] mb-[24px]">
                Your message has been sent!
            </h2>

            <p className='md:text-base text-sm text-center md:text-start mb-[25px]'>Our team will get back to you with a response within 24hours.</p>

            <Link href='/' passHref>
                <Button
                    className="gap-1 mt-[30px] w-full lg:w-auto h-full"
                    endIcon={<BsArrowRightShort size={28} />}
                >
                    Back to Home
                </Button>
            </Link>

        </div>
    )
}

export default ContactSuccess
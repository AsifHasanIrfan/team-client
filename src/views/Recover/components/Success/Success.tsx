import Button from '@components/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    setShowSuccess: (showSuccess: boolean) => void
}

const Success = ({ setShowSuccess }: Props) => {
    return (
        <div className='flex items-center justify-center py-5 flex-col' >

            <div className='w-[180px] h-[180px]' >
                <Image src='/images/apply/apply-success.svg' width={1} height={1} layout='responsive' alt='recover success' />
            </div>

            <h3 className='text-[28px] leading-[33px] mt-[40px] mb-[20px] font-[600] text-center' > Your request has been submitted </h3>

            <p className='text-center mb-[40px] max-w-[400px] text-[21px] text-[#8b8b8b]' >
                Out team will review your request and respond by email within 48 hours
            </p>

            <Link href='/login' >
                <Button onClick={() => setShowSuccess(false)}>Back to Sign in</Button>
            </Link>

        </div>
    )
}

export default Success
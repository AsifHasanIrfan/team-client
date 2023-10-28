import LoginLeftHeader from '@views/Login/components/LoginLeft/LoginLeftHeader'
import LoginRight from '@views/Login/components/LoginRight/LoginRight'
import React from 'react'
import RecoverBody from '../RecoverBody/RecoverBody'

type Props = {
    setShowSuccess: (showSuccess: boolean) => void
}

const MainPage = ({ setShowSuccess }: Props) => {
    return (
        <div className="grid lg:grid-cols-2 grid-col-1 w-full lg:justify-between items-center lg:gap-[50px] xl:gap-[60px]">

            <div className="lg:order-none order-2 py-[30px] md:pb-0 md:pt-[5px] lg:py-0">
                <LoginLeftHeader title={'Recover password'} description={'Enter your Email and we’ll send a password to your email'} />
                <RecoverBody setShowSuccess={setShowSuccess} />
            </div>

            <div className="hidden lg:block">
                <LoginRight />
            </div>

        </div>
    )
}

export default MainPage
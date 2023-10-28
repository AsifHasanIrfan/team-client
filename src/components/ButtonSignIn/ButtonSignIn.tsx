import RightArrow from '@components/Icons/Actions/RightArrow';
import Link from 'next/link'
import React from 'react'

type Props = {
    title: any; href: any;
}

const ButtonSignIn = ({ title, href }: Props) => {
    return (
        <>
            <Link href={href} passHref><div className="bg-primary w-full hover:bg-lightHover shadow-[0_7px_20px_0_#FF00324D] h-[55px] rounded-[72px] py-[15px] px-[45px] md:py-[12px] md:px-[27px] mr-[60px] sm:mr-[75px] md:mr-[75px] xl:mr-[150px] my-[15px] sm:my-[15px] lg:my-[23px] xl:my-[23px] md:w-[130px] md:h-[46px] lg:w-[172px] lg:h-[55px] lg:py-[15px]  cursor-pointer">
                <a className="flex items-center justify-center">
                    <span className="text-white">{title}</span>
                    <RightArrow />
                </a>
            </div></Link>
        </>
    )
}

export default ButtonSignIn
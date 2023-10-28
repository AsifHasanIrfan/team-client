import React from 'react'

type Props = {
    title: string;
    noText: string;
    data: any;
}

const PUserCard = ({ title, data, noText }: Props) => {
    return (
        <>
            <p className='font-medium'>
                {title}
            </p>
            <hr className='my-2' />
            {data?.length ? (<>

                <ul className="my-4 flex flex-wrap gap-3">
                    {data?.map((people: any, i: number) => {
                        return (
                            <li
                                key={i}
                                className="flex items-center justify-between h-fit gap-1 px-3 py-2 bg-primary select-none !text-slate-50 text-[14px] rounded-md"
                            >
                                {people?.firstName + ' ' + people?.lastName}
                            </li>
                        );
                    })}
                </ul>
            </>
            ) : <p className='text-primary text-center my-4'>{noText}</p>}
        </>
    )
}

export default PUserCard
import React from 'react'
import parse from 'html-react-parser';
import PUserCard from '../partials/PUserCard';


type Props = {
    data: any
}

const PolicyShow = ({ data }: Props) => {
    return (
        <div className='px-5'>

            <PUserCard
                data={data?.users}
                title='Agreed to terms'
                noText='No agreed to terms users...'
            />

            <PUserCard
                data={data?.disAgreed}
                title='Disagreed to terms'
                noText='No disagreed to terms users...'
            />

            <hr className='my-5' />
            {/* <iframe className='w-full h-[500px] scrolbar' srcDoc={data?.content}></iframe> */}
            <div className='basic-change'>{data?.content ? parse(data?.content) : ''}</div>

        </div>
    )
}

export default PolicyShow
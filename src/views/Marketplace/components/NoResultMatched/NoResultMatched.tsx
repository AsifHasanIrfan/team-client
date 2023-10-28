import NoResultMatch from '@components/Icons/images/NoResultMatch'
import React from 'react'

type Props = {}

const NoResultMatched = (props: Props) => {
    return (
        <div className='bg-white rounded-[20px] flex items-center justify-center h-[500px]'>
            <NoResultMatch />
        </div>
    )
}

export default NoResultMatched
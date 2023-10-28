import LoginLeftHeader from '@views/Login/components/LoginLeft/LoginLeftHeader'
import React from 'react'
import RequestLeftBody from './RequestLeftBody'

type Props = {}

const RequestLeft = (props: Props) => {
    return (
        <>
            <LoginLeftHeader title={'Request Login Details'} description={''} />
            <RequestLeftBody />
        </>
    )
}

export default RequestLeft
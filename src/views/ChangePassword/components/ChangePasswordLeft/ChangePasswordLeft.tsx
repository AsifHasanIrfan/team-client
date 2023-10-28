import LoginLeftHeader from '@views/Login/components/LoginLeft/LoginLeftHeader';
import React from 'react';
import ChangePasswordLeftBody from './ChangePasswordLeftBody';

const ChangePasswordLeft: React.FC = () => {
    return (
        <>
            <LoginLeftHeader title={'Change password'} description={'Lorem Ipsum is simply dummy text of the printing'} />
            <ChangePasswordLeftBody />
        </>
    );
};

export default ChangePasswordLeft;
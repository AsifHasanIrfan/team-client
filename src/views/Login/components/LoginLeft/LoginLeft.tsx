import React from 'react';
import LoginLeftBody from './LoginLeftBody';
import LoginLeftHeader from './LoginLeftHeader';

const LoginLeft: React.FC = () => {
  return (
    <div>
      <LoginLeftHeader title={'Sign in'} description={''} />
      <LoginLeftBody />
    </div>
  );
};
export default LoginLeft;

import React from 'react';

import { cx } from '@config/constants';
import LoginSettingsForm from './LoginSettingsForm';
import LoginSettingsHeader from './LoginSettingsHeader';

const LoginSettings: React.FC = () => {
  return (
    <div
      className={cx(
        ' bg-[#FFFFFF] rounded-[10px] p-[30px] flex flex-col',
        'settingPage-login-setting'
      )}
    >
      <LoginSettingsHeader />
      <LoginSettingsForm />
    </div>
  );
};
export default LoginSettings;

import React from 'react';

import { cx } from '@config/constants';
import BasicInformation from './components/BasicInformation';
import LoginSettings from './components/LoginSettings';

const Setting: React.FC = () => {
  return (
    <div className={cx('flex flex-col md:gap-y-[30px] mt-[20px] md:mt-0')}>
      {/* login settings */}
      <LoginSettings />
      <BasicInformation />
      {/* basic infomation */}
    </div>
  );
};
export default Setting;

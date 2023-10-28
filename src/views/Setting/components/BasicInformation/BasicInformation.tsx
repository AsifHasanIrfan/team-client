import React from 'react';

import { cx } from '@config/constants';
import BasicInfoHeader from './BasicInfoHeader';
import BasicInformationForm from './BasicInformationForm';

type BasicInformationProps = {};

const BasicInformation: React.FC<BasicInformationProps> = () => {
  return (
    <div
      className={cx(
        ' bg-[#FFFFFF] rounded-[10px] p-[30px]',
        'xl:flex xl:flex-col xl:w-full basicInformation timeoff-shadow'
      )}
    >
      <BasicInfoHeader />
      <BasicInformationForm />
    </div>
  );
};
export default BasicInformation;

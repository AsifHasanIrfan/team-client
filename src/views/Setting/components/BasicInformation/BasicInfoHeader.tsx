import React from 'react';


import { cx } from '@config/constants';



const BasicInfoHeader:React.FC= () => {
    
    return <h2 className={cx(
        '',
        'max-w-[175px] max-h-[31px] text-[22px] font-medium leading-[31px] mb-[30px]'
      )}>
        Basic information
      </h2>
}
export default BasicInfoHeader;
import React from 'react';

import cx from 'classnames';

const LoginSettingsHeader: React.FC = () => {
  return (
    <h2
      className={cx(
        'text-[22px] font-medium leading-[31px] mb-[30px]'
      )}
    >
      Change password
    </h2>
  );
};

export default LoginSettingsHeader;

import React from 'react';

import { cx } from '@config/constants';

const TableLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cx('flex justify-center mt-8 pb-5', className)}>
      <div id="tableLoader"></div>
    </div>
  );
};

export default TableLoader;

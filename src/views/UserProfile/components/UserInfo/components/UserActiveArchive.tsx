import React from 'react';

import { cx } from '@config/constants';

type UserActiveArchiveProps = {
  handleArchiveUser: (x: string) => void;
  loading?: boolean;
  user?: any;
};

const UserActiveArchive: React.FC<UserActiveArchiveProps> = ({
  handleArchiveUser,
  loading,
  user,
}) => {
  return (
    <>
      {!user?.isArchived ? (
        <button
          className="w-[150px] h-[50px] border border-[#FF0032] hover:!border-red !bg-transparent text-[#FF0032] hover:!bg-primary hover:text-white !shadow-white !rounded-[10px] relative outline-none hover:border-0 transition ease-in-out duration-300"
          onClick={() => handleArchiveUser('true')}
        >
          <>
            {loading ? (
              <div className="flex justify-center items-center h-auto -mt-[4px]">
                <div id="button__loading"></div>
              </div>
            ) : (
              'Archive user'
            )}
          </>
        </button>
      ) : (
        <button
          className={cx(
            'w-[150px] h-[50px] border border-[#FF0032] !bg-primary text-white !rounded-[10px] hover:!bg-transparent hover:text-[#FF0032] relative transition ease-in-out duration-300'
          )}
          onClick={() => handleArchiveUser('false')}
        >
          {loading ? (
            <div className="flex justify-center items-center h-auto -mt-[4px]">
              <div id="button__loading"></div>
            </div>
          ) : (
            'Activate user'
          )}
        </button>
      )}
    </>
  );
};
export default UserActiveArchive;

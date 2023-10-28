import Link from 'next/link';
import React from 'react';

const DashboardBody: React.FC = () => {
  return (
    <>
      <div className="mb-[20px] lg:mb-[30px] xl:mb-[20px] cursor-default">
        <h6 className="text-lg font-medium">Digital Gregg Meet Link</h6>
        <div className="flex justify-between items-center xl:p-[20px_15px] p-[8px_15px] bg-[#F7F8FA] mt-[10px]">
          <p
            className="3xl:text-base lg:text-sm md:text-base text-xs w-[155px] truncate
                        3xl:w-[300px] lg:w-[183px] md:w-[350px]"
          >
            https://meet.digitalgregg.com/general-digitalgreggteam-oivkwrormy
          </p>
          <Link href="https://meet.digitalgregg.com/general-digitalgreggteam-oivkwrormy" passHref>
            <a
              target="_blank"
              className="xl:text-sm lg:text-[9px] text-xs font-medium xl:p[10px_15px] lg:p-[4px_10px] p-[6px_10px] bg-[#263238] text-white hover:bg-primary transition ease-in-out duration-300"
            >
              Go to Meet
            </a>
          </Link>
        </div>
      </div>

      <div className="mb-[30px] lg:mb-[35px] xl:mb-[30px] cursor-default">
        <h6 className="text-lg font-medium">Digital Gregg Chat Link</h6>
        <div className="flex justify-between items-center xl:p-[20px_15px] p-[8px_15px] bg-[#F7F8FA] mt-[10px]">
          <p
            className="3xl:text-base lg:text-sm md:text-base text-xs
                                        3xl:w-[300px] 
                                        lg:w-[183px] lg:truncate
                                        md:w-[300px] md:overflow-auto md:whitespace-normal md:text-clip
                                        w-[155px] truncate"
          >
            https://chat.digitalgregg.com/
          </p>

          <Link href="https://chat.digitalgregg.com/" passHref>
            <a
              target="_blank"
              className="xl:text-sm lg:text-[9px] text-xs font-medium xl:p[10px_15px] lg:p-[4px_10px] p-[6px_10px] bg-[#263238] text-white hover:bg-primary transition ease-in-out duration-300"
            >
              Go to Chat
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default DashboardBody;

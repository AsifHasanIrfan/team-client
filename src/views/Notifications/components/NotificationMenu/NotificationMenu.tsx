import { Dispatch, SetStateAction } from 'react';

import HeadlessDropdown from '@components/HeadlessDropdown';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import {
  archiveAllNotification,
  readAllNotification,
  unreadAllNotification,
} from '@redux/actions/notification';

const NotificationMenu = ({
  openTab,
  setOpenTab,
}: {
  openTab: number;
  setOpenTab: Dispatch<SetStateAction<number>>;
}) => {
  const { notification, auth } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const unArchived = notification?.data?.filter(
    (i: any) => i.isArchived === false
  );
  const unRead = unArchived?.filter((i: any) => i.isRead === false);

  return (
    <div className="flex items-center justify-between bg-[#F7F8FA] z-[10] sticky top-0 py-[19px]">
      <ul className="flex gap-[20px] sm:gap-[30px]">
        <li
          className={`${
            openTab === 1 && 'border-b border-1 border-[#263238] pb-[3px]'
          } pb-[3px]`}
        >
          <button
            type="button"
            className={`font-medium sm:text-[18px] text-[13px] cursor-pointer ${
              openTab !== 1 && 'text-[#9F9F9F] hover:text-red'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            role="tablist"
          >
            All Notifications
          </button>
        </li>

        <li
          className={`${
            openTab === 2 && 'border-b border-1 border-[#263238] pb-[3px]'
          } pb-[3px]`}
        >
          <button
            type="button"
            className={`font-medium sm:text-[18px] text-[13px] ${
              openTab !== 2 && 'text-[#9F9F9F] hover:text-red'
            } cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Unread
          </button>
        </li>

        <li
          className={`${
            openTab === 3 && 'border-b border-1 border-[#263238] pb-[3px]'
          } pb-[3px]`}
        >
          <button
            type="button"
            className={`font-medium sm:text-[18px] text-[13px] ${
              openTab != 3 ? 'text-[#9F9F9F] hover:text-red' : ''
            } cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(3);
            }}
            data-toggle="tab"
            role="tablist"
          >
            Archived
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-[12px]">
        {unRead?.length !== 0 ? (
          <button
            onClick={() => dispatch(readAllNotification(auth))}
            className={`font-medium sm:text-[18px] text-[13px] text-[#9F9F9F] cursor-pointer hover:text-red`}
          >
            Read All
          </button>
        ) : (
          <button
            onClick={() => dispatch(unreadAllNotification(auth))}
            className={`font-medium sm:text-[18px] text-[13px] text-[#9F9F9F] cursor-pointer hover:text-red`}
          >
            Unread All
          </button>
        )}

        <HeadlessDropdown>
          <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white shadow-lg py-[5px] min-w-[170px]">
              <div
                className={`cursor-pointer block px-[10px] py-[5px] transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                onClick={() => {
                  if (unArchived.length > 0) {
                    dispatch(unreadAllNotification(auth));
                  }
                }}
              >
                {' '}
                Mark all as unread{' '}
              </div>

              <div
                className={`cursor-pointer block px-[10px] py-[5px] transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                onClick={() => {
                  if (unArchived.length > 0) {
                    dispatch(archiveAllNotification(auth));
                  }
                }}
              >
                {' '}
                Archive all{' '}
              </div>
            </div>
          </div>
        </HeadlessDropdown>
      </div>
    </div>
  );
};

export default NotificationMenu;

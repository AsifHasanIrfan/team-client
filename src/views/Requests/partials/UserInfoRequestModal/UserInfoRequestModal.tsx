import Button from '@components/Button';
import Modal from '@components/Modal';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { approveRequest, declineRequest } from '@redux/actions/users';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type RowModal = {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RowModal: React.FC<RowModal> = ({ open, setOpen, data }) => {

  const { auth, users, socket } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { userFetch } = useUser(auth?.token, auth?.user?._id);

  const reqData: Array<any> = Object.getOwnPropertyNames(data ? data : []);

  return (
    <Modal open={open} setOpen={setOpen} title={'User Information Request'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px]">
        <ul>
          {reqData?.map((e: any, i: number) => {

            // console.log(e)

            if (data[e]?.length > 0) {
              if (
                e !== 'fullname' &&
                e !== 'id' &&
                e !== 'username' &&
                e !== 'userId' &&
                e !== 'avatar'
              ) {
                return (
                  <li className="mb-[5px]" key={i}>
                    <strong>{e}</strong> : {data[e]}{' '}
                  </li>
                );
              }
            }
          })}

          {data?.avatar?.length > 0 && (
            <a href={data?.avatar} target="_blank" rel="noreferrer" className="flex gap-5">
              <strong>Avatar: </strong>
              <Image
                width="100%"
                height="100%"
                objectFit="cover"
                src={data?.avatar}
                alt="avatar"
              />
            </a>
          )}
        </ul>

        <div className="flex justify-end items-end w-full mt-[20px]">
          <Button
            rounded="md"
            className="w-fit h-full !shadow-none !text-sm !px-[15px] !py-[10px] mr-[12px] !border !border-primary bg-transparent hover:bg-primary hover:!text-white transition !text-black"
            onClick={() => {
              dispatch(declineRequest(auth.token, data.id, setOpen, socket));
              userFetch();
            }}
            disabled={users.update_decline_loading}
          >
            {users.update_decline_loading && (
              <div id="status__loading" className="mr-1"></div>
            )}
            {users.update_decline_loading ? 'Declining' : 'Decline'}
          </Button>

          <Button
            rounded="md"
            className="w-fit h-full !shadow-none !text-sm !px-[15px] !py-[10px]"
            onClick={() => {
              dispatch(
                approveRequest(auth, data.userId, data.id, setOpen, socket)
              );
              userFetch();
            }}
            disabled={users.update_approve_loading}
          >
            {users.update_approve_loading && (
              <div id="status__loading" className="mr-1"></div>
            )}
            {users.update_approve_loading ? 'Approving' : 'Approve'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RowModal;

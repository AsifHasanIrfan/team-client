import React from 'react';
import ModalRequest from './ModalRequest';
import { reverseArray } from '@utils/reverseArray';

function UserInfoMain({ updateRequestData, token }: any) {
  return (
    <>
      <ModalRequest datas={reverseArray(updateRequestData)} token={token} />
    </>
  );
}

export default UserInfoMain;

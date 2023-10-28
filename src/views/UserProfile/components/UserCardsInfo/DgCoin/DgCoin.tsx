// external import
import React, { useState } from 'react';
//internal import
import Button from '@components/Button';
import DgCoinHistory from './DgCoinHistory';
import Card from '@views/UserProfile/partials/Card';
import CardHeader from '@views/UserProfile/partials/CardHeader';
import ViewLess from '@views/UserProfile/partials/ViewLess';
import ProfileInput from '@components/Input/ProfileInput';
import formatNumberInput from '@hooks/formatNumberInput';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAdminUsers from '@hooks/useAdminUsers';
import useDgsById from '@hooks/useDgsById';
import { createNotification } from '@redux/actions/notification';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import useSalaryInfo from '@hooks/useSalaryInfo';
import useEMP from '@hooks/useTeamMemberOfTheMonth';
import SelectDrawbackType from '../DrawBack/partials/SelectDrawbackType';

type Props = {
  userId: any;
  token: any;
}

const isTypes = [
  { label: 'Select', value: '' },
  { label: 'Yes', value: true },
  { label: 'No', value: false },
]

const DgCoin = ({ userId, token }: Props) => {

  // global
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector(state => state);

  // hooks
  const { adminUsersFetch } = useAdminUsers(token);
  const { userFetch } = useUser(token, userId);
  const { salaryInfoFetch } = useSalaryInfo(token, userId);
  const { dgs, dgsLoading, dgsFetch } = useDgsById(token, userId);
  const { empsFetch } = useEMP(token);

  // states
  const [loading, setLoading] = useState(false);
  const [tableActive, setTableActive] = useState<any>(false);
  const [input, setInput] = useState({ title: '', amount: '', user: userId });
  const [selectedType, setSelectedType] = useState(isTypes[0]);

  const handleGiftDG = (e: any) => {
    e.preventDefault();

    // checking is fields empty
    if (input.title === '' || input.amount === '' || input.user === '' || selectedType.value === '') return toast.error('All fields required!');

    const sendData = { ...input, amount: parseFloat(input.amount), isCountForEMP: selectedType?.value };

    setLoading(true);
    axios.post(`${process.env.serverUrl}dg`, sendData, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {

          // refetch
          dgsFetch();
          userFetch();
          adminUsersFetch();
          salaryInfoFetch();
          empsFetch();

          const notifyData = {
            recipients: [userId],
            url: '/dashboard/rewards',
            // @ts-ignore
            content: `You got ${input.amount} DG coin for ${input.title}`
          }

          dispatch(createNotification(notifyData, token, socket));

          setInput({ title: '', amount: '', user: userId });
          setSelectedType(isTypes[0]);
          toast.success(response.data.message);
        }
      });
  }

  return (
    <Card>
      <CardHeader>Gift Dg Coins</CardHeader>

      <form onSubmit={handleGiftDG}>
        <div className='w-full'>
          <ProfileInput
            label={'DG Title'}
            id={'title'}
            value={input?.title}
            isRequired={true}
            placeholder={'Enter project title'}
            onChange={(e: any) => setInput({ ...input, title: e.target.value })}
          />

          <ProfileInput
            label={'Amount'}
            id={'amount'}
            type={'number'}
            value={input?.amount}
            isRequired={true}
            placeholder={'1000'}
            mainCss={'mt-[25px]'}
            onKeyDown={(e: any) => formatNumberInput(e)}
            onChange={(e: any) => setInput({ ...input, amount: e.target.value })}
          />

          <div className='my-5'>
            <SelectDrawbackType
              onChange={(option: any) => setSelectedType(option)}
              values={selectedType}
              defaultValue={selectedType}
              label="Will count for employee of the month?"
              options={isTypes}
            />
          </div>

        </div>

        <div className="h-[50px] w-full">
          <Button
            className="w-full h-full !rounded-[10px]"
            loading={loading}
            loadingText={'Updating'}
          >
            Update
          </Button>
        </div>
      </form>

      {/* datatable */}
      {tableActive && (
        <DgCoinHistory
          datas={dgs?.datas}
          loading={dgsLoading}
          token={token}
          userId={userId}
          dgsFetch={dgsFetch}
        />
      )}

      {/* button */}
      <div className="w-fit" role='button' onClick={() => setTableActive(!tableActive)}>
        <ViewLess active={tableActive} />
      </div>
    </Card>
  );
};
export default DgCoin;

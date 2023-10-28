// external import
import React, { useState } from 'react';
//internal import
import Button from '@components/Button';
import DrawBackHistory from './DrawBackHisoty';
import ViewLess from '@views/UserProfile/partials/ViewLess';
import Card from '@views/UserProfile/partials/Card';
import CardHeader from '@views/UserProfile/partials/CardHeader';
import SelectDrawbackType from './partials/SelectDrawbackType';
import DrawbackReason from './partials/DrawbackReason';
import Input from '@views/UserProfile/partials/Input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { drawbackSystemTypes, drawbackTypes } from '@config/constants';
import { createNotification } from '@redux/actions/notification';
import { uploadFiles } from '@utils/uploadFile';
import useAdminUsers from '@hooks/useAdminUsers';
import useDrawbacks from '@hooks/useDrawbacks';
import DrawbackDropzone from './partials/DrawbackDropzone';
import useSalaryInfo from '@hooks/useSalaryInfo';
import { formatAmountNumberInput } from '@hooks/helpers';
import useEMP from '@hooks/useTeamMemberOfTheMonth';

type Props = {
  userId: any;
  token: any;
}

const DrawBack = ({ userId, token }: Props) => {

  // global states
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state);
  const [file, setFile] = useState<File[]>([]);

  // hooks
  const { adminUsersFetch } = useAdminUsers(token);
  const { salaryInfoFetch } = useSalaryInfo(token, userId);
  const { drawbacks, drawbacksLoading, drawbacksFetch } = useDrawbacks(token, userId);
  const { empsFetch } = useEMP(token);

  // input items
  const [input, setInput] = useState({ reason: '', drawback: '' });
  const { drawback, reason } = input;

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedDrawback, setSelectedDrawback] = useState(drawbackTypes[0]);
  const [selectedDrawbackType, setSelectedDrawbackType] = useState(drawbackSystemTypes[0]);

  let attachments: any = [];

  const [tableActive, setTableActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    if (selectedDrawbackType.value == '' || selectedDrawback.value === '' || selectedDrawback.label === '' || drawback === '' || reason === '') {
      toast.error('All drawbacks fields are required!');
      return;
    }

    setLoading(true);
    // attachments
    if (files.length > 0) {
      attachments = await uploadFiles(files);
    }

    try {
      const { data } = await axios.post(
        `${process.env.serverUrl}user/drawback/${userId}`, {
        type: selectedDrawbackType.value,
        value: selectedDrawback.value,
        title: selectedDrawback.label,
        drawback,
        reason,
        attachments,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (data.success) {
        setLoading(false);

        // refetch
        drawbacksFetch();
        adminUsersFetch();
        salaryInfoFetch();
        empsFetch();

        setInput({ ...input, drawback: '', reason: '' });
        setFiles([]);
        setFile([])
        setSelectedDrawback(drawbackTypes[0]);
        setSelectedDrawbackType(drawbackSystemTypes[0]);

        socket.emit('createDrawback', {
          recipients: [userId],
          data: data.drawback,
        });

        const notifyData = {
          recipients: [userId],
          url: '/dashboard/salary',
          // @ts-ignore
          content: `You recived a ${selectedDrawbackType.value === 'by-coin' ? 'coin' : 'dollar'} Drawback`,
        };

        dispatch(createNotification(notifyData, token, socket));
        toast.success(data.message);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error as any);
    }
  };

  return (
    <Card wAuto>
      <CardHeader>Drawback</CardHeader>

      <SelectDrawbackType
        onChange={(option: any) => setSelectedDrawbackType(option)}
        values={selectedDrawbackType}
        defaultValue="Select"
        label="Amount Type"
        options={drawbackSystemTypes}
      />

      <SelectDrawbackType
        onChange={(option: any) => setSelectedDrawback(option)}
        values={selectedDrawback}
        defaultValue="Select"
        label="Drawback Type"
        options={drawbackTypes}
      />

      <DrawbackReason
        handleInputChange={handleInputChange}
        label="Reason"
        placeholder="Late joining"
        name="reason"
        required
        type="text"
        value={reason}
      />

      {selectedDrawbackType.value && <Input
        onChange={handleInputChange}
        label="Amount"
        placeholder={`${selectedDrawbackType.value === 'by-coin' ? '1000' : ''} ${selectedDrawbackType.value === 'by-dollar' ? '$1000' : ''}`}
        name="drawback"
        required
        autoComplete="off"
        type="number"
        min={0}
        value={drawback}
        onKeyDown={formatAmountNumberInput}
      />}

      <div className="space-y-3">
        <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
          Attachment
        </h2>
        <DrawbackDropzone setFiles={setFiles} file={file} setFile={setFile} />
      </div>

      <div className="h-[50px] w-full">
        <Button
          className="w-full h-full !rounded-[10px]"
          onClick={handleSubmit}
          loading={loading}
          loadingText={'Updating'}
        >
          Update
        </Button>
      </div>

      {/* datatable */}
      {tableActive && (<DrawBackHistory
        data={drawbacks?.user?.drawbacks}
        loading={drawbacksLoading}
        drawbacksFetch={drawbacksFetch}
        token={token}
        userId={userId}
      />)}

      {/* button */}
      <div className="w-fit" role='button' onClick={() => setTableActive(!tableActive)}>
        <ViewLess active={tableActive} />
      </div>
    </Card>
  );
};
export default DrawBack;

import React, { useState } from 'react';
import Modal from '@components/Modal';
import { EmployeOptionType, RowModal } from '@config/types';

import Button from '@components/Button';
import Select from 'react-select';
import { IoTrashOutline } from 'react-icons/io5';
import uuid from 'react-uuid';

const options: EmployeOptionType[] = [
  { value: 'redwan', label: 'Redwan', job: 'Designer', id: uuid() },
  { value: 'bannah', label: 'Bannah', job: 'Developer', id: uuid() },
  { value: 'raihan', label: 'Raihan', job: 'Developer', id: uuid() },
  { value: 'soumik', label: 'Soumik', job: 'Developer', id: uuid() },
];

const RowModal: React.FC<RowModal> = ({ open, setOpen, dataId }) => {
  const [winner, setWinner] = useState<any>([]);
  const [value, setValue] = useState<any>(null);

  const customStyle = {
    control: (provided: any) => ({
      ...provided,
      height: 0,
      minHeight: '33px',
      padding: 0,
      margin: 0,
      marginLeft: 0,
      border: '0px solid black',
      fontSize: 16,
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  function handleClick() {
    if (!value) return;
    if (winner.length === 3) {
      alert('Winner can not be more than 3');
      setValue(null);
      return;
    }

    setWinner((prev: any) => {
      setValue(null);

      // console.log({ prev, value });
      if (prev.find((filteredItem: any) => filteredItem.id === value.id)) {
        alert('You could not add same user in multiple time');
        return [...prev];
      }
      return [...prev, value];
    });
  }

  function deleteWinner(index: number) {
    setWinner((prev: any) => prev.filter((_: any, i: number) => i !== index));
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="w-[330px] md:w-[500px] min-h-[400px] xl:w-[850px] py-[20px]">
        <div className="flex gap-6">
          <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
            <Select
              options={options}
              styles={customStyle}
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClick} rounded="md">
              Add
            </Button>
          </div>
        </div>
        <div className="mt-6 font-primary space-y-5">
          <div className="flex justify-center">
            <h2 className="text-2xl text-[#555]">This Month Winner List</h2>
          </div>
          <div className="flex justify-center">
            <table className="w-full rounded-[10px] overflow-hidden">
              <thead className="h-[48px] bg-[#263238] text-slate-50">
                <tr className="w-full">
                  <th>Name</th>
                  <th>Position</th>
                  <th>Job</th>
                  <th>Coins</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="w-full text-center">
                {winner?.map(({ label, job }: any, i: number) => {
                  return (
                    <tr
                      key={i}
                      className="relative w-full h-[48px] border border-b cursor-pointer select-none"
                    >
                      <td>{label}</td>
                      <td>
                        {i + 1}
                        {i === 0 ? 'st' : i === 1 ? 'nd' : 'rd'}
                      </td>
                      <td>{job}</td>
                      <td>
                        {i === 0 ? '1000' : i === 1 ? '500' : '250'}dg coins
                      </td>
                      <td onClick={() => deleteWinner(i)}>
                        <IoTrashOutline size={22} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {winner.length > 0 && (
          <div className="mt-8 flex justify-end">
            <Button rounded="md">Submit</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RowModal;

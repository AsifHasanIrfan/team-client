import React, { useState } from 'react';
import Modal from '@components/Modal';
import { RowModal } from '@config/types';

import Button from '@components/Button';
import Select from 'react-select';
import uuid from 'react-uuid';
import Input from '@views/Setting/Input';
import { cx } from '@config/constants';
import { IoMdClose } from 'react-icons/io';

const options = [
  { value: 'redwan', label: 'Redwan', id: uuid() },
  { value: 'bannah', label: 'Bannah', id: uuid() },
  { value: 'raihan', label: 'Raihan', id: uuid() },
  { value: 'soumik', label: 'Soumik', id: uuid() },
];

const RowModal: React.FC<RowModal> = ({ open, setOpen, dataId }) => {
  const [meet, setMeet] = useState<any>([]);
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
    setValue(null);
    setMeet((prev: any) => {
      if (prev.find((filtredItem: any) => filtredItem.id === value.id)) {
        setValue(null);
        alert('You could not add the same person multiple time');
        return [...prev];
      }
      return [...prev, value];
    });
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Create Event'}>
      <div className="w-[330px] md:w-[500px] font-primary min-h-[400px] xl:w-[850px] py-[20px]">
        <form className="space-y-5">
          <Input type="text" placeholder="Title here..." label="Title" />

          <div className="flex items-center gap-5">
            <Input label="Start time" type="time" />
            <Input label="End time" type="time" />
            <Input label="Date" type="date" />
          </div>

          <div className="flex gap-6 items-end">
            <div className="w-full">
              <label
                className={cx(
                  'font-medium text-base leading-6 inline-block mb-2.5'
                )}
                htmlFor={'peopleSelectId'}
              >
                Select people
              </label>
              <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                <Select
                  options={options}
                  styles={customStyle}
                  value={value}
                  onChange={(e) => setValue(e)}
                  id={'peopleSelectId'}
                />
              </div>
            </div>
            <div className="flex justify-end h-fit">
              <Button onClick={handleClick} rounded="md" type="button">
                Add
              </Button>
            </div>
          </div>
          <div>
            <ul className="grid grid-cols-6 gap-3 min-h-[70px]">
              {meet?.map((people: any, i: number) => {
                return (
                  <li
                    onClick={() =>
                      setMeet((prev: any) =>
                        prev.filter(
                          (_: any, findIndex: number) => findIndex !== i
                        )
                      )
                    }
                    key={i}
                    className="flex items-center justify-between h-fit gap-1 pl-6 pr-5 py-3 bg-primary cursor-pointer select-none hover:bg-lightHover duration-150 !text-slate-50 rounded-full"
                  >
                    {people?.label}
                    <span>
                      <IoMdClose color="white" size={20} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="button" rounded="md">
              Create event
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RowModal;

import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import Modal from '@components/Modal';
import useAssignedBenefit from '@hooks/useAssignedBenefit';
import useBenefits from '@hooks/useBenefits';
import useBenefitsUser from '@hooks/useBenefitsUser';
import useUsers from '@hooks/useUsers';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import toast from 'react-hot-toast';
import { VscCalendar } from 'react-icons/vsc';
import Select from 'react-select';

type Props = {
  assignModalOpen: boolean;
  setAssignModalOpen: (createModalOpen: boolean) => void;
  token: string;
};

const AssignBenefitModal = ({
  assignModalOpen,
  setAssignModalOpen,
  token,
}: Props) => {
  const [datePicker, setDatePicker] = useState(false);
  const [datePick, setDatePick] = useState(dayjs());
  const [user, setUser] = useState<any>(null);
  const [assignUsers, setAssignUsers] = useState<any>([]);
  const [newAssignUsers, setNewAssignUsers] = useState<any>([]);
  const [benefit, setBenefit] = useState({ label: '', value: '' });
  const [loading, setLoading] = useState(false);
  const [usersOptions, setUsersOptions] = useState<any>();

  const dateRef = useDetectClickOutside({
    onTriggered: () => setDatePicker(false),
  });

  // use hooks
  const { benefits, benefitsFetch } = useBenefits(token);
  const { benefitsUsersFetch } = useBenefitsUser(token);
  const { assignedBenefitsFetch } = useAssignedBenefit(token);
  const { users } = useUsers(token);

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

  // user select handler
  function handleUser(selectedUser: any) {
    setUser(selectedUser);
  }

  // benefit select handler
  function handleBenefit(selectedUser: any) {
    setBenefit(selectedUser);
  }

  useEffect(() => {
    // user options
    const users_role =
      users?.users
        ?.filter((user: any) => user.role == 'employee')
        .map((e: any) => {
          return { label: `${e.firstName} ${e.lastName}`, value: e._id };
        }) || [];
    users_role.push({
      label: 'All Users',
      value: 'all',
    });
    const sortUsers = users_role.sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );

    setUsersOptions(sortUsers);
  }, [users?.users]);

  useEffect(() => {
    if (benefits?.datas) {
      const benefitUsers =
        benefits?.datas
          .filter((e: any) => e._id === benefit.value);

      const assigned = benefitUsers[0]?.users.map((e: any) => {
        return { label: `${e.firstName} ${e.lastName}`, value: e._id };
      }) || [];
      setAssignUsers(assigned);
    }
  }, [benefits?.datas, benefit]);

  // benefit options
  const benefitOptions =
    benefits?.datas?.map((benefit: any) => {
      return { label: `${benefit.title}`, value: `${benefit._id}` };
    }) || [];

  // assign benefit handler
  const handleAssignBenefit = async (e: any) => {
    e.preventDefault();

    // check user is selected
    if (benefit.value === '') {
      toast.error('Select a benefit!');
      return;
    }

    // check benefit is selected
    if (newAssignUsers.length === 0) {
      toast.error('Select a user!');
      return;
    }
    let usersId = [];
    for (let i = 0; i < newAssignUsers.length; i++) {
      const element = newAssignUsers[i];
      usersId.push(element.value);
    }

    const assignData = {
      users: usersId,
      benefit: benefit.value,
      unlockDate: datePick.format('DD/MM/YYYY'),
    };

    setLoading(true);
    axios
      .post(`${process.env.serverUrl}benefit/assign`, assignData, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setAssignModalOpen(false);
        setBenefit({ label: '', value: '' });
        setAssignUsers([]);
        setNewAssignUsers([]);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          benefitsFetch();
          benefitsUsersFetch();
          assignedBenefitsFetch();
          toast.success(response.data.message);
        }
      });
  };

  // assign user to benefit
  function handleAddUser() {
    if (!user) return;

    if (user.value === 'all') {
      const allUsers =
        users?.users
          ?.filter((user: any) => user.role == 'employee')
          .map((e: any) => {
            return { label: `${e.firstName} ${e.lastName}`, value: e._id };
          }) || [];

      if (
        assignUsers.length === allUsers.length
      ) {
        toast.error('Already all users assigned');
      } else {
        setAssignUsers(allUsers);
        setNewAssignUsers(allUsers);
      }
    } else {
      if (
        assignUsers.find(
          (filteredItem: any) => filteredItem.value === user.value
        )
      ) {
        toast.error('Already Assigned For This Benefit');
      } else {
        setAssignUsers([...assignUsers, user]);
        setNewAssignUsers([...newAssignUsers, user]);
      }
    }
  }

  return (
    <>
      <Modal setOpen={setAssignModalOpen} open={assignModalOpen} title={'Assign Benefit'}>
        <div className="w-[330px] md:w-[500px] xl:w-[850px] benefit__createModal ">

          <form onSubmit={handleAssignBenefit}>
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                Benefits
              </h2>
              <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                <Select
                  onChange={handleBenefit}
                  styles={customStyle}
                  options={benefitOptions}
                />
              </div>
            </div>
            <div className="mb-[15px] sm:mb-[20px] w-full latejoin">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Date
              </h2>
              <div
                className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
                onClick={() => setDatePicker(true)}
                ref={dateRef}
              >
                <p className="ml-2">{datePick.format('DD-MM-YYYY')}</p>
                {datePicker && (
                  <DatePicker selectedDate={datePick} onChange={setDatePick} />
                )}
                <VscCalendar className="ml-5" />
              </div>
            </div>
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                Users
              </h2>
              <div className="flex gap-5">
                <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                  <Select
                    onChange={handleUser}
                    styles={customStyle}
                    options={usersOptions}
                  />
                </div>
                <div>
                  <Button onClick={handleAddUser} type="button" rounded="md">
                    Add
                  </Button>
                </div>
              </div>
              {assignUsers && (
                <ul className="my-4 flex flex-wrap gap-3 min-h-[70px]">
                  {assignUsers?.sort((a: any, b: any) => a.label.localeCompare(b.label)).map((people: any, i: number) => {
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between h-fit gap-1 px-2 py-1 bg-primary select-none hover:bg-lightHover duration-150 !text-slate-50 text-[13px] rounded-md"
                      >
                        {people?.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex justify-end">
              <div className={`md:w-[200px] w-full h-[50px] self-end`}>
                <Button
                  rounded="md"
                  className={`w-full h-full !text-sm !px-[15px]`}
                  disabled={loading}
                  loading={loading}
                  loadingText={'Assigning'}
                >
                  Assign
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AssignBenefitModal;

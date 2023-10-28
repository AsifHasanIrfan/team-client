import Modal from '@components/Modal';
import useAdminUsersSalary from '@hooks/useAdminUsersSalary';
import useTaskEarn from '@hooks/useTaskEarn';
import SalaryInfoCard from '@views/Salary/partials/SalaryInfoCard';
import React from 'react';

type Props = {
  data: any;
  token: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UsersSalaryModal: React.FC<Props> = ({ data, open, setOpen, token }) => {

  // hooks
  const { adminSalaryInfo, adminSalaryInfoLoading } = useAdminUsersSalary(token, data?._id);
  const { taskEarn, taskEarnLoading } = useTaskEarn(token, data?._id);

  return (
    <Modal open={open} setOpen={setOpen} title={'This month salary'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px]">

        <div className=" bg-white rounded-b-[10px] flex flex-col gap-y-5">

          <SalaryInfoCard
            title="Base salary"
            value={adminSalaryInfo?.datas?.baseSalary}
            salary
            loading={adminSalaryInfoLoading}
          />

          <SalaryInfoCard
            title="This month achevement rewards"
            value={adminSalaryInfo?.datas?.totalThisMonthAchievementRewards}
            rewards
            loading={adminSalaryInfoLoading}
          />

          <SalaryInfoCard
            title="This month drawbacks"
            value={adminSalaryInfo?.datas?.totalThisMonthDrawbacks}
            drawback
            loading={adminSalaryInfoLoading}
          />

          <SalaryInfoCard
            title="This month DG Coin"
            value={adminSalaryInfo?.datas?.totalThisMonthRewards}
            dgCoin
            loading={adminSalaryInfoLoading}
          />

          <SalaryInfoCard
            title="This month total salary"
            value={adminSalaryInfo?.datas?.totalThisMonthSalary}
            totalSalary
            loading={adminSalaryInfoLoading}
          />

          <hr />

          <SalaryInfoCard
            title="This month total task coin earn"
            value={taskEarn?.data?.totalThisMonthTaskCoin}
            taskCoinThisMonth
            loading={taskEarnLoading}
          />

          <SalaryInfoCard
            title="Last month total task coin earn"
            value={taskEarn?.data?.totalLastMonthTaskCoin}
            taskCoinLastMonth
            loading={taskEarnLoading}
          />

        </div>
      </div>
    </Modal>
  );
};
export default UsersSalaryModal;

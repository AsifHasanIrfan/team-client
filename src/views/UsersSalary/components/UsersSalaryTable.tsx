//internal imports

import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import { GetTeamAPIRequestDataTypeProp } from '@config/types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useEffect, useState } from 'react'
import useAdminUsers from '@hooks/useAdminUsers';
import MonthlySalary from './fields/MonthlySalary';
import UsersSalaryModal from './UsersSalaryModal';
import TableButton from '@components/TableButton';
import CoinsThisMonth from './fields/CoinsThisMonth';

type Props = {
  token: string;
  value: string;
  email: string;
}

const UsersSalaryTable = ({ token, value, email }: Props) => {

  const currentMonth = new Date().getMonth() + 1;
  const prevMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // hooks
  const { adminUsers, adminUsersLoading } = useAdminUsers(token);

  // states
  const [searchedActiveUsers, setSearchedActiveUsers] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [open, setOpen] = useState(false);

  // filter active/archive data and search
  useEffect(() => {
    const activeUsers = adminUsers?.users?.filter((item: GetTeamAPIRequestDataTypeProp) => item.isArchived !== true);
    const onlyUsers = activeUsers?.filter((item: GetTeamAPIRequestDataTypeProp) => item.role !== 'admin');
    let sortedDatasByFirstName = onlyUsers?.sort((a: any, b: any) => (a.firstName > b.firstName) ? 1 : (a.firstName < b.firstName) ? -1 : 0);
    if (value) {
      setSearchedActiveUsers(sortedDatasByFirstName?.filter((el: any) => (el.firstName.toLowerCase() + ' ' + el.lastName.toLowerCase())?.match(new RegExp(value, "i"))));
    } else {
      setSearchedActiveUsers(sortedDatasByFirstName);
    }
  }, [value, adminUsers?.users]);

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Full Name',
      selector: (row) => row.firstName,
      cell: (row) => row.firstName + ' ' + row.lastName,
      sortable: true,
    },
    {
      name: 'Dg Coins This Month',
      selector: (row): any => {
        // variables
        let totalTasksCoinEarn = 0;
        let totalCoinEarn = 0;
        let totalDrawbackByCoins = 0;
        let totalPurchasedTimeoffByCoins = 0;
        let totalPurchasedBenfitsByCoins = 0;

        // gifted dg coins calculated
        row.dgDetails.map((dg: any) => {
          if (
            new Date(dg.createdAt).getMonth() +
            1 +
            '-' +
            new Date(dg.createdAt).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            totalCoinEarn = totalCoinEarn + parseFloat(dg.amount);
          }
        });

        // task approved dg coins calculated
        row.tasks.map((task: any) => {
          if (
            (task.status === 'Approved' || task.status === 'Approved Late') &&
            new Date(task.updateTime).getMonth() +
            1 +
            '-' +
            new Date(task.updateTime).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            totalTasksCoinEarn = totalTasksCoinEarn + parseFloat(task.receiveDgCoin);
          } else {
            totalTasksCoinEarn = totalTasksCoinEarn + 0;
          }
        });

        // filter all coins drawback and calculate total
        const byCoinDrawbacks = row.drawbacks.filter(
          (item: any) => item.type === 'by-coin'
        );
        byCoinDrawbacks.map((drawback: any) => {
          if (
            new Date(drawback.createdAt).getMonth() +
            1 +
            '-' +
            new Date(drawback.createdAt).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            totalDrawbackByCoins =
              totalDrawbackByCoins + parseFloat(drawback.drawback);
          }
        });

        // calculate total purchased
        row.purchasedBenefits.map((purchasedBenefit: any) => {
          purchasedBenefit.purchasedUsers.map((purchasedUser: any) => {
            if (
              purchasedUser.userId.toString() === row._id.toString() &&
              new Date(purchasedUser.purchasedDate).getMonth() +
              1 +
              '-' +
              new Date(purchasedUser.purchasedDate).getFullYear() ===
              currentMonth + '-' + currentYear
            ) {
              totalPurchasedBenfitsByCoins =
                totalPurchasedBenfitsByCoins +
                parseFloat(purchasedBenefit.dgCost);
            }
          });
        });

        // calculate total purchasedTimeoffs
        row.purchasedTimeoffs.map((purchasedTimeoff: any) => {
          if (
            new Date(purchasedTimeoff.createdAt).getMonth() +
            1 +
            '-' +
            new Date(purchasedTimeoff.createdAt).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            totalPurchasedTimeoffByCoins =
              totalPurchasedTimeoffByCoins + parseFloat(purchasedTimeoff.cost);
          }
        });

        // total cost this month
        const totalCostThisMonth =
          totalPurchasedBenfitsByCoins +
          totalDrawbackByCoins +
          totalPurchasedTimeoffByCoins;
        const totalEarnThisMonth = totalTasksCoinEarn + totalCoinEarn;
        return totalEarnThisMonth - totalCostThisMonth;
      },
      cell: (row) =>
        row && (
          <span className="flex gap-2 items-center">
            <DgCoinIcon />
            <CoinsThisMonth data={row} token={token} />
          </span>
        ),
      sortable: true,
    },
    {
      name: 'Last Month Payment',
      selector: (row): any => {
        const baseSalary = parseFloat(row.monthlyPayment);
        const prevMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        let lastMonthPayment = 0;
        let prevMonthDrawback = 0;

        // Get the previous month achievements
        row.achievements.map((item: any) => {
          // previous month
          if (
            new Date(item.date).getMonth() +
            1 +
            '-' +
            new Date(item.date).getFullYear() ===
            prevMonth + '-' + currentYear
          ) {
            lastMonthPayment = lastMonthPayment + parseFloat(item.amount);
          }
        });

        // get the previous month drawbacks
        const dollarDrawbacks = row.drawbacks.filter(
          (item: any) => item.type === 'by-dollar'
        );

        dollarDrawbacks.map((item: any) => {
          // previous month
          if (
            new Date(item.createdAt).getMonth() +
            1 +
            '-' +
            new Date(item.createdAt).getFullYear() ===
            prevMonth + '-' + currentYear
          ) {
            prevMonthDrawback = prevMonthDrawback + parseFloat(item.drawback);
          }
        });

        const totalPrevMonthSalary =
          baseSalary + lastMonthPayment - prevMonthDrawback;

        return `$${totalPrevMonthSalary}`;
      },
      sortable: true,
      center: true,
    },
    {
      name: 'This Month Payment',
      selector: (row): any => {
        const baseSalary = parseFloat(row.monthlyPayment);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        let thisMonthPayment = 0;
        let thisMonthDrawback = 0;

        // Get this month achievements
        row.achievements.map((item: any) => {
          // this month
          if (
            new Date(item.date).getMonth() +
            1 +
            '-' +
            new Date(item.date).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            thisMonthPayment = thisMonthPayment + parseFloat(item.amount);
          }
        });

        // Get current month drawbacks

        const dollarDrawbacks = row.drawbacks.filter(
          (item: any) => item.type === 'by-dollar'
        );

        dollarDrawbacks.map((item: any) => {
          // current month
          if (
            new Date(item.createdAt).getMonth() +
            1 +
            '-' +
            new Date(item.createdAt).getFullYear() ===
            currentMonth + '-' + currentYear
          ) {
            thisMonthDrawback = thisMonthDrawback + parseFloat(item.drawback);
          }
        });

        const totalThisMonthSalary =
          baseSalary + thisMonthPayment - thisMonthDrawback;

        return `$${totalThisMonthSalary}`;
      },
      // cell: (row) => row && <MonthlySalary data={row} dataType={'thisMonth'} />,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row,
      cell: (row) => (
        <TableButton data={row} setModalData={setModalData} setOpen={setOpen} />
      ),
      center: true,
    },
  ];

  return (
    <div className="">
      <DataTable
        columns={email === 'asifhasanirfan@gmail.com' ? columns : []}
        data={email === 'asifhasanirfan@gmail.com' ? searchedActiveUsers : []}
        // columns={columns}
        // data={searchedActiveUsers}
        progressPending={adminUsersLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
        defaultSortFieldId="firstName"
      />

      <UsersSalaryModal
        data={modalData}
        open={open}
        setOpen={setOpen}
        token={token}
      />
    </div>
  );
};

export default UsersSalaryTable;

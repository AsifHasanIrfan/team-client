import React from 'react'

type Props = {
    data: any;
    dataType: string;
}

const MonthlySalary = ({ data, dataType }: Props) => {

    const baseSalary = parseFloat(data.monthlyPayment);

    // current
    const currentMonth = new Date().getMonth() + 1;
    const prevMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let totalPrevMonth = 0
    let totalThisMonth = 0
    let totalRewardThisMonth = 0
    let totalDrawbackThisMonth = 0
    let totalAchievementRewardThisMonth = 0
    let totalRewardPrevMonth = 0
    let totalDrawbackPrevMonth = 0
    let totalAchievementRewardPrevMonth = 0

    // this month total reward
    data.dgDetails.map((item: any) => {
        if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
            totalRewardThisMonth = totalRewardThisMonth + parseFloat(item.amount);
        }
    })

    // this month total drawback
    data.drawbacks.map((item: any) => {
        if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (currentMonth + '-' + currentYear)) {
            totalDrawbackThisMonth = totalDrawbackThisMonth + parseFloat(item.drawback);
        }

        // previous month
        if ((new Date(item.createdAt).getMonth() + 1) + '-' + new Date(item.createdAt).getFullYear() === (prevMonth + '-' + currentYear)) {
            totalDrawbackPrevMonth = totalDrawbackPrevMonth + parseFloat(item.drawback);
        }
    })

    // this month total Achievement reward
    data.achievements.map((item: any) => {
        if ((new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getFullYear() === (currentMonth + '-' + currentYear)) {
            totalAchievementRewardThisMonth = totalAchievementRewardThisMonth + parseFloat(item.amount);
        }

        // previous month
        if ((new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getFullYear() === (prevMonth + '-' + currentYear)) {
            totalAchievementRewardPrevMonth = totalAchievementRewardPrevMonth + parseFloat(item.amount);
        }
    })

    const totalThisMonthSalary = ((baseSalary + totalAchievementRewardThisMonth) - totalDrawbackThisMonth);
    const totalPrevMonthSalary = ((baseSalary + totalAchievementRewardPrevMonth) - totalDrawbackPrevMonth);

    return (
      <span>
        {dataType === 'dg' && totalRewardThisMonth}
        {dataType === 'lastMonth' && `$ ${totalPrevMonthSalary}`}
        {dataType === 'thisMonth' && `$ ${totalThisMonthSalary}`}
      </span>
    )
}

export default MonthlySalary
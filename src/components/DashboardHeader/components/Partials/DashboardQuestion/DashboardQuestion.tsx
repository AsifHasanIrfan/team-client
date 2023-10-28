import QuestionIcon from '@components/Icons/QuestionIcon';
import { cx } from '@config/constants';
import { dashboardQuestionModalProp } from '@config/types';
import React, { useState } from 'react';

const DashboardQuestion = ({ open, setOpen, iconBtnStyle, displayProperty }: dashboardQuestionModalProp) => {

    const [questionColor, setQuestionColor] = useState<string>('#263238');

    return (
        <button className={cx(iconBtnStyle, `${displayProperty ? 'hidden md:flex' : 'block md:hidden'}`)} type='button'
            onClick={() => setOpen(true)}
            onMouseOver={() => setQuestionColor('#C10206')}
            onMouseLeave={() => setQuestionColor('#263238')}
        >
            <QuestionIcon hoverColor={questionColor} />
        </button>
    );
};

export default DashboardQuestion;
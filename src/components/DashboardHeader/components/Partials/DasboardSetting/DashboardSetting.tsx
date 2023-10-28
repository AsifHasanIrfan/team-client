import CogIcon from '@components/Icons/CogIcon';
import { cx } from '@config/constants';
import Link from 'next/link';
import React, { useState } from 'react';

const DashboardSetting = ({ iconBtnStyle, displayProperty }: { iconBtnStyle: string; displayProperty: boolean }) => {

    const [cogColor, setCogColor] = useState<string>('#263238');

    return (
        <Link href="/dashboard/settings">
            <a
                className={cx(iconBtnStyle, `${displayProperty ? 'hidden md:flex' : 'block md:hidden'}`)}
                onMouseOver={() => setCogColor('#C10206')}
                onMouseLeave={() => setCogColor('#263238')}
            >
                <CogIcon hoverColor={cogColor} />
            </a>
        </Link>
    );
};

export default DashboardSetting;
import React from 'react';
import { Button as DesktopButton } from 'antd';
import { Button as MobileButton } from 'antd-mobile';
import { useDeviceContext } from '../context/MobileResponsible';

const ResponsiveButton = ({ children, ...props }) => {
    const { isMobile } = useDeviceContext();

    if (isMobile) {
        return <MobileButton {...props}>{children}</MobileButton>;
    } else {
        return <DesktopButton {...props}>{children}</DesktopButton>;
    }
};

export default ResponsiveButton;

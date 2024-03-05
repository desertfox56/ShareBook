import React, { useState } from 'react';
import { MenuUnfoldOutlined  } from '@ant-design/icons';
import { Menu, Switch, Avatar } from 'antd';
import { Typography,Image,Layout, Button } from 'antd';
const { Title } = Typography;
    const Settings = () => {
        const [theme, setTheme] = useState('dark');
        const [current, setCurrent] = useState('1');
        
        const changeTheme = (value) => {
            setTheme(value ? 'dark' : 'light');
          };

          const onClick = (e) => {
            console.log('click ', e);
            setCurrent(e.key);
          };
          return (
            <>
            <Title level={2}>Настройки</Title>
              <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
              <br />
              <br />
              </>
  );
};
export default Settings;
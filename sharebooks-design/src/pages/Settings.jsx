import React, { useState } from 'react';
import { NotificationOutlined   } from '@ant-design/icons';
import { Layout, Menu, Checkbox, Card, Button, Typography, Switch,Breadcrumb } from 'antd';
//Сделать по прототипу макет страницы настроек используя Breadcrumb, CheckBox,Card+Collapse(возможно Nav)
const { Title } = Typography;
const { Sider, Content } = Layout;
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
             <Layout style={{ minHeight: '65%', backgroundColor:'#fff', marginLeft: '3%', }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['2']}
          style={{ height: '100%', borderRight: 0, backgroundColor:'#9D9D9D' }}
        >
          <Menu.Item key="1">Мой аккаунт</Menu.Item>
          <Menu.Item key="2" icon={<NotificationOutlined />} >Уведомления</Menu.Item>
          {/* Add more menu items here if needed */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        ><Breadcrumb
        separator=">"
        items={[
          {
            title: 'Настройки',
          },
          {
            title: 'Уведомления',
            href: '',
          },
          
        ]}
      />
          <Card title="Изменить настройки уведомлений" >
          
            <Checkbox>Когда друг вернет книгу</Checkbox>
            <Checkbox>Книга из списка желаний доступна</Checkbox>
            <Checkbox>Анонсы от Sharebook</Checkbox>
            <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
              <br />
              <br />
            <Button type="primary" style={{ marginTop: '16px' }}>
              Сохранить
            </Button>
          </Card>
        </Content>
      </Layout>
    </Layout>
              
              </>
  );
};
export default Settings;
import React, { useState } from 'react';
import { Modal, Form, Input, Button, Card, Menu, Layout, Popconfirm} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Sider, Content } = Layout;

const Settings = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const handlePasswordChange = async (values) => {
    try {
      // Получаем токен из localStorage
      const token = localStorage.getItem('accessToken');

      // Если токен отсутствует, пользователь не авторизован
      if (!token) {
        console.log('No token found, user is not authorized');
        // Здесь может быть код для перенаправления на страницу входа
        return;
      }

      // Добавляем токен в заголовки запроса
      const headers = {
        Authorization: `JWT ${token}`,
      };
      const response = await axios.post('http://localhost:8000/api/users/change_password/', {
        email: values.email,
        password: values.currentPassword,
        new_password: values.newPassword,
      },{ headers });
      Modal.success({
        title: 'Success',
        content: response.data.detail,
      });
      form.resetFields();
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Failed to change password: ' + error.response.data.error,
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Получаем токен из localStorage
      const token = localStorage.getItem('accessToken');

      // Если токен отсутствует, пользователь не авторизован
      if (!token) {
        console.log('No token found, user is not authorized');
        // Здесь может быть код для перенаправления на страницу входа
        return;
      }

      // Добавляем токен в заголовки запроса
      const headers = {
        Authorization: `JWT ${token}`,
      };
      const response = await axios.delete('http://localhost:8000/api/users/delete-account/',{ headers });
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="1">Настройки аккаунта</Menu.Item>
          <div style={{ padding: '10px', borderTop: '1px solid #f0f0f0' }}>
          <Popconfirm
            title="Вы уверены, что хотите удалить ваш аккаунт?"
            onConfirm={handleDeleteAccount}
            okText="Да"
            cancelText="Нет"
            placement="topRight"
          >
            <Button danger icon={<DeleteOutlined />} style={{ width: '100%' }}>
              Удалить аккаунт
            </Button>
          </Popconfirm>
        </div>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Card title="Смена пароля">
            <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="currentPassword" label="Текущий пароль" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item name="newPassword" label="Новый пароль" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit">Сменить пароль</Button>
            </Form>
          </Card>
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default Settings;

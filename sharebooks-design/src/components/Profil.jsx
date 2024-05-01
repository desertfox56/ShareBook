import React, { useEffect, useState } from 'react';
import { Typography, Layout, Menu, Button, Descriptions, Breadcrumb, Avatar } from 'antd';
import { UserOutlined, BookOutlined, HeartOutlined, LogoutOutlined  } from '@ant-design/icons';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Получаем токен из localStorage
        const token = localStorage.getItem('accessToken');

        // Если токен отсутствует, пользователь не авторизован
        if (!token) {
          console.log('No token found, user is not authorized');
          // Здесь может быть код для перенаправления на страницу входа
          return;
        }

        // Декодируем токен и извлекаем ID пользователя
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Добавляем токен в заголовки запроса
        const headers = {
          Authorization: `JWT ${token}`,
        };

        // Формируем URL для запроса данных профиля пользователя
        const userProfileUrl = `http://localhost:8000/api/users/user_profile/${userId}/`;

        // Отправляем запрос на сервер для получения данных пользователя
        const response = await axios.get(userProfileUrl, { headers });

        // Сохраняем данные пользователя в состоянии
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Здесь может быть код для обработки ошибок запроса, например, показ сообщения пользователю
      }
    };

    fetchUserData();
  }, []); // Запрос выполняется один раз при монтировании компонента
  //Выход пользователя из аккаунта
  const navigate = useNavigate();
  const handleLogout = async () => {
      const refreshToken = localStorage.getItem('RefreshToken');
      try {
          await axios.post('http://localhost:8000/api/users/api/logout/', {
              refresh_token: refreshToken
          }, {
              headers: {
                  Authorization: `JWT ${localStorage.getItem('accessToken')}`
              }
          });

          // Clear local storage or specific tokens
          localStorage.removeItem('accessToken');
          localStorage.removeItem('RefreshToken');
          localStorage.removeItem('userId');

          alert('You have successfully logged out.');

          // Redirect to the login page or home page
          navigate('/login');
      } catch (error) {
          console.error('Logout failed:', error);
          alert('Failed to log out.');
      }
  };
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor:'#FAFCFC' }}>
      <Sider style={{backgroundColor:'#FAFCFC'}} breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/ProfilUser/">Профиль</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/PersonalLibrary/">Личная библиотека</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<HeartOutlined />}>
            <Link to="/WishPage/">Список желаний</Link>
          </Menu.Item>
          <div className='Logout'><LogoutOutlined  onClick={handleLogout}/><Link to="#">Выйти</Link></div>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      {userData ? (
        <div>
          <Typography.Title  style={{textAlign:'center'}} level={2}>Профиль пользователя: <br></br>
      {`${userData.first_name} ${userData.second_name} ${userData.patronymic}`} 
    </Typography.Title>
    <Typography.Paragraph>Email: {userData.email}</Typography.Paragraph>
    <Typography.Paragraph>
      <Button type="link">Изменить данные</Button>
    </Typography.Paragraph>
    <Descriptions title="Банковские данные">
  <Descriptions.Item label="Способ оплаты">
    **** **** **** **** 1234 (Mastercard)
  </Descriptions.Item>
  <Descriptions.Item label="Изменить данные">
    <Button type="link">Изменить банковские данные</Button>
  </Descriptions.Item>
</Descriptions>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Content>
    </Layout>
    </Layout>
  );
};

export default UserProfile;






import React, { useEffect, useState } from 'react';
import { Typography,Image,Layout, Button, Descriptions } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
        const userProfileUrl = `http://localhost:8000/users/user_profile/${userId}/`;

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

  return (
    <div>
      {userData ? (
        <div>
          <Typography.Title level={2}> User Profile
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
  );
};

export default UserProfile;






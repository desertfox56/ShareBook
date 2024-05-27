import React, { useState,useEffect, useCallback} from 'react';
import { MenuUnfoldOutlined,GiftOutlined  } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import ModalFormTransfer from './ModalFormTransfer';
import axios from 'axios';

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const AllBooks = () => {
    const [books, setBooks] = useState([]); // Состояние для хранения книг
    
    const [selectedBook, setSelectedBook] = useState(null);
    const [isTransferModalVisible, setTransferModalVisible] = useState(false);
    
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

        // Добавляем токен в заголовки запроса
        const headers = {
          Authorization: `JWT ${token}`,
        };

        // Формируем URL для запроса данных профиля пользователя
        const userPersonalLibraryUrl = `http://localhost:8000/api/myBooks/personal-library/`;

        // Отправляем запрос на сервер для получения данных пользователя
        const response = await axios.get(userPersonalLibraryUrl, { headers });

        if (response.data && response.data.user_books) {
          setBooks(response.data.user_books);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Здесь может быть код для обработки ошибок запроса, например, показ сообщения пользователю
      }
    };

    fetchUserData();
  }, []); // Запрос выполняется один раз при монтировании компонента

  
  const handleTransferClick = useCallback((userBook,e) => {
    e.stopPropagation(); // Stop propagation to prevent menu item click
    setSelectedBook(userBook);
    setTransferModalVisible(true);
  }, []);
  // Функция для создания пунктов меню из полученных книг
  const bookMenuItems = books.map(userBook => ({
    key: userBook.book.id.toString(), // Corrected from setBooks.id to book.id
    icon: <Avatar size="small" src={userBook.book.image} style={{ marginRight: 8 }} />,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {userBook.book.title}
        <GiftOutlined onClick={(e) => handleTransferClick(userBook,e)} style={{ color: '#f56a00', marginLeft: 10 }} />
      </div>
    ),
  }));

  //Подменю
  const items = [
    getItem('ВСЕ', 'sub1', <MenuUnfoldOutlined />, bookMenuItems),
  ];
  
    return (
        <>
          <Menu
            theme={'light'}
            
            style={{ width: 256 }}
            defaultOpenKeys={['sub1']}
            
            mode="inline"
            items={items}
          />
                {selectedBook && (
        <ModalFormTransfer
          selectedBook={selectedBook}
          isVisible={isTransferModalVisible}
          setIsVisible={setTransferModalVisible}
        />
      )}

        </>
      );
    };

export default AllBooks;




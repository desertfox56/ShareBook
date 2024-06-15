import React, { useState,useEffect, useCallback} from 'react';
import { MenuUnfoldOutlined  } from '@ant-design/icons';
import { Menu, Avatar } from 'antd';
import ModalFormTransfer from './ModalFormTransfer';
import axios from 'axios';

// Функция для создания элементов меню
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  // Функция для отображения всех книг пользователя
  const AllBooks = () => {
    const [books, setBooks] = useState([]); // Состояние для хранения книг
    const [selectedBook, setSelectedBook] = useState(null); // Состояние для выбранной книги
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

        // Формируем URL для запроса данных личной библиотеки пользователя
        const userPersonalLibraryUrl = `${process.env.REACT_APP_API_URL}/myBooks/personal-library/`;

        // Отправляем запрос на сервер для получения данных пользователя
        const response = await axios.get(userPersonalLibraryUrl, { headers });
        // Сохраняем книги пользователя в состояние
        if (response.data && response.data.user_books) {
          setBooks(response.data.user_books);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    };

    fetchUserData();
  }, []); // Запрос выполняется один раз при монтировании компонента

  const handleTransferClick = useCallback((userBook,e) => {
    e.stopPropagation(); 
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




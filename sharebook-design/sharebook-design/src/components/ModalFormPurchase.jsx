import React, { useState } from 'react';
import {  Modal } from 'antd';
import axios from 'axios';
import '../assets/css/ModalForm.css'
import { useNavigate } from 'react-router-dom';
// Компонент модального окна для аренды книги
export const ModalFormPurchase = ({ selectedBook, isOpen, setIsOpen }) =>{
    const [confirmLoading, setConfirmLoading] = useState(false); // Состояние для отображения загрузки
    const navigate = useNavigate(); // Хук для навигации
    // Обработчик кнопки "ОК" в модальном окне
    const handleOk = async () => {
      setConfirmLoading(true); // Устанавливаем состояние загрузки
      if (!selectedBook) {
        console.log('No book selected');
        return;
    }
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log('No token found, user is not authorized');
            return;
        }
        const headers = { Authorization: `JWT ${token}` };
        const selectedBookId = selectedBook ? selectedBook.id : null;
        // Формируем URL для запроса аренды книги
        const PurchaseUrl = `${process.env.REACT_APP_API_URL}/myBooks/purchase/${selectedBookId}/`;
        // Отправляем запрос на сервер для аренды книги
        await axios.post(PurchaseUrl, {}, { headers });
        console.log('Purchase successful');
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    setIsOpen(false); // Закрываем модальное окно
    setConfirmLoading(false); // Отключаем состояние загрузки
    alert('Поздравляем, книга арендована и добавлена в вашу коллекцию!');
    navigate('/PersonalLibrary'); // Перенаправляем пользователя на страницу личной библиотеки

};
      // Обработчик кнопки "Отмена" в модальном окне
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsOpen(false); // Закрываем модальное окно
      };

      return (
        <>
          <Modal
            title="Аренда книги" 
            open={isOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <div className="modal-content">
    <div><strong>Название:</strong> {selectedBook?.title || 'Unknown'}</div>
    <div><strong>Автор:</strong> {selectedBook?.author_name || 'Unknown'}</div>
    <div><strong>Жанр:</strong> {selectedBook?.genre_name || 'Unknown'}</div>
    <div><strong>Количество страниц:</strong> {selectedBook?.count_pages || 'Unknown'}</div>
    <div><span><strong>Возрастная группа:</strong> {selectedBook?.age_restriction || 'Unknown'}+</span></div>
    
  </div>      
          </Modal>
        </>
      );
};
export default ModalFormPurchase;

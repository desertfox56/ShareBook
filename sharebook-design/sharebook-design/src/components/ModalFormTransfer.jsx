import React, { useState } from 'react';
import {  Modal, Input } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../assets/css/ModalForm.css'
import { useNavigate } from 'react-router-dom';
// Компонент модального окна для передачи книги 
const  ModalFormTransfer = ({ selectedBook, isOpen, setIsOpen }) =>{
    const [friend_mail, setEmail] = useState(''); // Состояние для почты друга
    const [confirmLoading, setConfirmLoading] = useState(false); // Состояние для отображения загрузки
    const navigate = useNavigate(); // Хук навигации
    // Обработчик кнопки "ОК" в модальном окне
    const handleOk = async () => {
      setConfirmLoading(true); // Устанавливаем состояние загрузки
      if (!selectedBook) {
        console.log('No book selected');
        setIsOpen(false);
        setConfirmLoading(false);
        return;
    }
    try {
        const token = localStorage.getItem('accessToken');
        const userId =localStorage.getItem('userId');
        if (!token) {
            console.log('No token found, user is not authorized');
            setIsOpen(false);
            setConfirmLoading(false);
            return;
        }
        const headers = { Authorization: `JWT ${token}` };
        const selectedBookId = selectedBook ? selectedBook.id : null;
        // Формируем URL для запроса передачи книги
        const TransferUrl = `${process.env.REACT_APP_API_URL}/myBooks/transfer_book/`;
        // Отправляем запрос на сервер для передачи книги другу
        await axios.post(TransferUrl, {
            giver_user_id: userId, // Отправляем значение userID пользователя
            receiver_user_email: friend_mail, // Отправляем почту друга пользователя
            book_id: selectedBookId}, // Отправляем bookId выбранной книги 
            { headers });
        
        console.log('Transfer successful');
        
    } catch (error) {
        console.error('Error during the book transfer:', error);
        alert('Failed to transfer book.');
    }
    setIsOpen(false); // Закрываем модальное окно
    setConfirmLoading(false); // Отключаем состояние загрузки
    alert('Книга успешно передана другу на 14 дней!');
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
            title="Передача книги" 
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
    <div><strong>Возрастная группа:</strong> {selectedBook?.age_restriction || 'Unknown'}+</div>
    
    <br></br>
    <div><Input placeholder="Введите почту друга" prefix={<UserOutlined />} onChange={(e) => setEmail(e.target.value)}/>{friend_mail?.receiver_user_email}</div>
  </div>      
          </Modal>
        </>
      );
      
  };
export default ModalFormTransfer;
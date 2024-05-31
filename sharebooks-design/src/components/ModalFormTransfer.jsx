import React, { useState } from 'react';
import {  Modal, Input } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../assets/css/ModalForm.css'
import { useNavigate } from 'react-router-dom';

const  ModalFormTransfer = ({ selectedBook, isOpen, setIsOpen }) =>{
    const [friend_mail, setEmail] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const handleOk = async () => {
      setConfirmLoading(true);
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
        const TransferUrl = `${process.env.REACT_APP_API_URL}/myBooks/transfer_book/`;
        await axios.post(TransferUrl, {
            giver_user_id: userId,
            receiver_user_email: friend_mail,
            book_id: selectedBookId},
            { headers });
        
        console.log('Transfer successful');
        
    } catch (error) {
        console.error('Error during the book transfer:', error);
        alert('Failed to transfer book.');
    }
    setIsOpen(false);
    setConfirmLoading(false);
    alert('Книга успешно передана другу на 14 дней!');
    navigate('/PersonalLibrary');
  };
  
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsOpen(false);
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
    <div><span className='Price'>Цена: {selectedBook?.price || 'Unknown'}₽</span></div>
    <br></br>
    <div><Input placeholder="Введите почту друга" prefix={<UserOutlined />} onChange={(e) => setEmail(e.target.value)}/>{friend_mail?.receiver_user_email}</div>
  </div>      
          </Modal>
        </>
      );
      
  };
export default ModalFormTransfer;
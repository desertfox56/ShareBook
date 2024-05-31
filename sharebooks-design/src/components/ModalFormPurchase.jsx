import React, { useState } from 'react';
import {  Modal } from 'antd';
import axios from 'axios';
import '../assets/css/ModalForm.css'
import { useNavigate } from 'react-router-dom';
export const ModalFormPurchase = ({ selectedBook, isOpen, setIsOpen }) =>{
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const handleOk = async () => {
      setConfirmLoading(true);
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
        const PurchaseUrl = `${process.env.REACT_APP_API_URL}myBooks/purchase/${selectedBookId}/`;
        //const PurchaseUrl = `http://localhost:8000/api/myBooks/purchase/${selectedBookId}/`;
        //const purchaseUrl = `${process.env.REACT_APP_API_URL}/myBooks/purchase/${selectedBookId}/`;
        await axios.post(PurchaseUrl, {}, { headers });
        console.log('Purchase successful');
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    setIsOpen(false);
    setConfirmLoading(false);
    alert('Поздравляем, книга куплена и добавлена в вашу коллекцию!');
    navigate('/PaymentPage');
};
  
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsOpen(false);
      };

      return (
        <>
          <Modal
            title="Покупка" 
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
    <div><span className='Price'>Цена: {selectedBook?.price || 'Unknown'}₽</span></div>
  </div>      
          </Modal>
        </>
      );
};
export default ModalFormPurchase;

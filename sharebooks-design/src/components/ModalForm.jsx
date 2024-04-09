import React, { useState,useEffect } from 'react';
import {  Modal } from 'antd';
import axios from 'axios';
import '../assets/css/ModalForm.css'

const ModalForm = ({ selectedBook, isOpen, setIsOpen }) =>{
    const [ setUserData] = useState(null);
    
  useEffect(() => {
    const fetchUserData = async () => {
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
        const PurchaseUrl = `http://localhost:8000/api/myBooks/purchase/${selectedBookId}/`;
        const response = await axios.post(PurchaseUrl, {}, { headers });
        setUserData(response.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

fetchUserData();
}, [selectedBook]); // Depend on selectedBookId




    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    

    const showModal = () => {
        setOpen(true);
      };

      const handleOk = () => {
        
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
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
    <div><strong>Возрастная группа:</strong> {selectedBook?.age_restriction || 'Unknown'}</div>
    <div><span className='Price'>Цена: {selectedBook?.price || 'Unknown'}₽</span></div>
  </div>
            
            
          </Modal>
        </>
      );
};
export default ModalForm;
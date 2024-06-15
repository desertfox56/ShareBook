import React, { useEffect } from 'react';
import axios from 'axios';

const BookItem = ({ book }) => {
  const handleBookClick = () => {
    // Сохраняем книги пользователя в состояние
    localStorage.setItem('selectedBookID', book.id.toString());
    
  };
  // Эффект, выполняемый при изменении книги
  useEffect(() => {
    const fetchBookDetails = async () => {
      const bookId = localStorage.getItem('selectedBookID'); // Получаем bookID из localStorage
      if (bookId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/marketplace/book/${bookId}/`);
         
          console.log(response.data); 
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      }
    };

    fetchBookDetails();
  }, [book]); // Зависимость эффекта, перезапуск при изменении пропса book
  return (
    <div onClick={handleBookClick} style={{ cursor: 'pointer' }}>
      <h3>{book.title}</h3>
    </div>
  );
};

export default BookItem;

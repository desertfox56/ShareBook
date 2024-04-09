import React, { useEffect } from 'react';
import axios from 'axios';

const BookItem = ({ book }) => {
  const handleBookClick = () => {
    // Save the bookID to localStorage
    localStorage.setItem('selectedBookID', book.id.toString());
    // Add additional actions here, such as navigation
  };
  useEffect(() => {
    const fetchBookDetails = async () => {
      const bookId = localStorage.getItem('selectedBookID'); // Get bookID from localStorage
      if (bookId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/marketplace/book/${bookId}/`);
          // Handle response data
          console.log(response.data); // Example action
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      }
    };

    fetchBookDetails();
  }, [book]); // Dependency array, re-run effect if book prop changes
  return (
    <div onClick={handleBookClick} style={{ cursor: 'pointer' }}>
      {/* Render your book details here */}
      <h3>{book.title}</h3>
      {/* More details */}
    </div>
  );
};

export default BookItem;

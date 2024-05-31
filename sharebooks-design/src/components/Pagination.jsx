import React,{useEffect, useState} from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
function AppPagination(){
  const [totalBooks, setTotalBooks ] = useState(0);
  const booksPerPage = 10; // Adjust based on your backend settings or user choice
  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_URL}/marketplace/pagination/');
        setTotalBooks(response.data.count);
      } catch (error) {
        console.error('Error counting pages:', error);
    }
};

fetchTotalBooks();
}, []);
const totalPages = Math.ceil(totalBooks / booksPerPage); // Calculate the total pages
    return(
        <Pagination style={{marginBottom:'30px'}}
        total={totalPages}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Всего ${total} страниц`}
        pageSize={booksPerPage}
      />
    );
}

export default AppPagination;
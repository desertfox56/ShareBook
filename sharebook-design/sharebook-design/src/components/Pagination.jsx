import React,{useEffect, useState} from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
// Функция пагинации книг
function AppPagination(){
  const [totalBooks, setTotalBooks ] = useState(0); // Состояние для количества книг
  const booksPerPage = 10; // Настройка на основе настроек Django или выбора пользователя
  //Эффект для отправки на сервер запроса с количеством книг 
  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/marketplace/pagination/`);
        setTotalBooks(response.data.count);
      } catch (error) {
        console.error('Error counting pages:', error);
    }
};

fetchTotalBooks();
}, []);
const totalPages = Math.ceil(totalBooks / booksPerPage); // Считаем количество страниц 
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
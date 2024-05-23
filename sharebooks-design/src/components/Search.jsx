import React,{useState} from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../assets/css/SearchBar.css';

function SearchBar({ setSearchResults, setIsSearched }){
    const { Search } = Input;
    
    const handleSearch = (value) => {
      if (!value.trim()) return; // Игнорировать пустые запросы или запросы, состоящие только из пробелов
      setIsSearched(true); // Пометить, что был выполнен поиск
      const apiUrl = 'http://localhost:8000/api/marketplace/search'; // URL вашего API для поиска книг
      const params = {
          title: value // Параметр поиска, совпадающий с настройками на бэкенде
      };

      axios.get(apiUrl, { params })
          .then(response => {
            setSearchResults(response.data.results || []); // Устанавливаем результаты в состояние
          })
          .catch(error => {
              console.error('Error during search:', error);
              setSearchResults([]); // Обеспечьте сброс состояния при ошибке
          });
      };
    
    return(
        <Search
      placeholder="Введите название книги"
      enterButton={<Button type="primary" icon={<SearchOutlined />}>Поиск</Button>}
      size="middle"
      onSearch={handleSearch}
      style={{width:'30%'}}
    />
    );
}

export default SearchBar;
import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearch } from '../context/searchContext';

import '../assets/css/SearchBar.css';

function SearchBar({ setSearchResults, setIsSearched }){
  const { handleSearch } = useSearch(); // Использование функции из контекста
  
    const { Search } = Input;
    
    
    
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
import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../assets/css/SearchBar.css';

function SearchBar(){
    const { Search } = Input;
    const handleSearch = (value) => {
        console.log(value); //Обработать запрос поиска
      };
    
    return(
        <Search
      placeholder="Введите запрос"
      enterButton={<Button type="primary" icon={<SearchOutlined />}>Поиск</Button>}
      size="middle"
      onSearch={handleSearch}
      style={{width:'30%'}}
    />
    );
}

export default SearchBar;
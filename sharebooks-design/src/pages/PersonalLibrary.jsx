import React from 'react';
import { Typography,Image,Layout, Button } from 'antd';
import AllBooks from '../components/allbooks';
import PopularBooks from '../components/PopularBooks';
import Filter from '../components/Filter';
import SearchBar from '../components/Search';
const { Title } = Typography;
function PersonalLibrary(){
    return(
        <div className='PersonalLibrary'>
            <div className='SearchBar'>
                <SearchBar/>
            </div>
             <div className="all-books-section">
                <Title level={2}>Моя библиотека</Title>
                <AllBooks/>
            </div>
            <div className="Filter">
                <Title level={3}>Фильтры</Title>
                <Filter/>
            </div>
            <div className="popular-books-section">
                <Title level={3}>Недавние книги</Title>
                <PopularBooks/>
            </div>
        </div>
    );
}
export default PersonalLibrary;
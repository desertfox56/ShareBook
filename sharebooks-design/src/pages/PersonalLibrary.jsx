import React from 'react';
import { Typography } from 'antd';
import AllBooks from '../components/allbooks';
import PopularBooks from '../components/PopularBooks';
import Filter from '../components/Filter';
import SearchBar from '../components/Search';
import '../assets/css/PersonalLibrary.css'
const { Title } = Typography;
function PersonalLibrary(){
    return(
        <div className='PersonalLibrary'>
         <div className='Page_name'> <Title level={2}>Моя библиотека</Title> </div>
         <div className="Filter_library">
                <Filter/>
            </div>
            <div className='SearchBar'>
                <SearchBar/>
            </div>
             <div className="all-books-section"> 
                <AllBooks/>
            </div>
            <div className="popular-books-section">
                <Title level={3}>Недавние книги</Title>
                <PopularBooks/>
            </div>
        </div>
    );
}
export default PersonalLibrary;
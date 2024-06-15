import React from 'react';
import { Typography } from 'antd';
import AllBooks from '../components/allbooks';
import PopularBooks from '../components/PopularBooks';
import '../assets/css/PersonalLibrary.css';
const { Title } = Typography;
function PersonalLibrary(){
    return(
        <div className='PersonalLibrary'>
         <div className='Page_name'> <Title level={2}>Моя библиотека</Title> </div>
         <div className="Filter_and_Books">
             <div className="all-books-section"> 
                <AllBooks/>
            </div></div>
            <div className="popular-books-section">
                <Title level={3}>Популярные книги</Title>
                <PopularBooks/>
            </div>
        </div>
    );
}
export default PersonalLibrary;
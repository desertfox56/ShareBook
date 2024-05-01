import React from 'react';
import Filter from '../components/Filter';
import Cards from '../components/Cards';
import AppPagination from '../components/Pagination';
import WishCards from '../components/WishCards';
import '../assets/css/marketplace.css';
//Сделать на подобие страницы маркетплейса, только добавив например иконки для обозначения что книги в списке желания, но недоступны/доступны
function WishPage(){
    return(
        <div className='marketplace-container'>
      <div className='filter-container'>
        <Filter />
      </div>
      <div className='cards-container'>
        <WishCards />
        
        <AppPagination />
      </div>
    </div>

    );
}
export default WishPage;
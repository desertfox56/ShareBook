import React from 'react';
import Filter from '../components/Filter';
import AppPagination from '../components/Pagination';
import WishCards from '../components/WishCards';
import '../assets/css/marketplace.css';

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
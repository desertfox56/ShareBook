import React from 'react';
import Filter from '../components/Filter';
import Cards from '../components/Cards';
import AppPagination from '../components/Pagination';
import Cards2 from '../components/Cards2';
import '../assets/css/marketplace.css';

function Marketplace(){
    return(
        <div className='marketplace-container'>
      <div className='filter-container'>
        <Filter />
      </div>
      <div className='cards-container'>
        <Cards2 />
        <Cards />
        <Cards />
        <AppPagination />
      </div>
    </div>

    );
}
export default Marketplace;
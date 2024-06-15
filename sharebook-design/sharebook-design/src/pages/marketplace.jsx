import React from 'react';
import Filter from '../components/Filter';
import Cards from '../components/Cards';
import AppPagination from '../components/Pagination';
import '../assets/css/marketplace.css';

function Marketplace(){
  
  return(
      <div className='marketplace-container'>
        <div className='filter-container'>
          <Filter  />
        </div>
        <div className='cards-container'>
        <Cards  />

          <AppPagination />
        </div>
      </div>
  );
}

export default Marketplace;
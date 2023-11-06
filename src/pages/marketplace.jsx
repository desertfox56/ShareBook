import React from 'react';
import Filter from '../components/Filter';
import Cards from '../components/Cards';
import AppPagination from '../components/Pagination';
function Marketplace(){
    return(
        <div className='Marketplace'>
            <Filter/>
            <Cards/>
            <AppPagination/>
        </div>

    );
}
export default Marketplace;
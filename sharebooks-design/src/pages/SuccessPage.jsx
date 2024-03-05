import React from 'react';
import PopularBooks from '../components/PopularBooks';
import SearchBar from '../components/Search';
function SuccessPage(){
  return(
    <div className='SuccessPage'>
      <SearchBar/>
      <PopularBooks/>
      
    </div>
  );
}
 export default SuccessPage;
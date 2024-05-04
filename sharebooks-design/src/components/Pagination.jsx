import React,{useEffect, useState} from 'react';
import { Pagination } from 'antd';
import axios from 'axios';
function AppPagination(){
  const [totalPages, setTotalPages ] = useState([]);
  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/marketplace/pagination/');
        setTotalPages(response.data.count);
      } catch (error) {
        console.error('Error counting pages:', error);
    }
};

fetchTotalPages();
}, []);

    return(
        <Pagination style={{marginBottom:'30px'}}
        total={totalPages}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Всего ${total} страниц`}
      />
    );
}

export default AppPagination;
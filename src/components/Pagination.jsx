import React from 'react';
import { Pagination } from 'antd';

function AppPagination(){
    return(
        <Pagination
        total={85}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Всего ${total} страниц`}
      />
    );
}

export default AppPagination;
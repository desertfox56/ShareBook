import React from 'react';
import Project from '../components/Project';
import { Typography } from 'antd';
const { Title } = Typography;
function OurProjectPage(){
    return(
      <>
      <div className='ProjectsTitle' style={{textAlign:'center',marginBottom:'2%'}}><Title level={3}>Наши проекты</Title></div>
      <div className='OurProjectPage' style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
        
        <Project/>
        <Project/>
      </div></>
    );
  }
   export default OurProjectPage;
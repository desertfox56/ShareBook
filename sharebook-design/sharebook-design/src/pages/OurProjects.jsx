import React from 'react';
import Project from '../components/Project';
import { Typography } from 'antd';
import '../assets/css/OurProjectPage.css';
const { Title } = Typography;
function OurProjectPage(){
    return(
      <>
      <div className='ProjectsTitle' style={{textAlign:'center',marginBottom:'2%'}}><Title level={3}>Наши проекты</Title></div>
      <div className='OurProjectPage' >
        
        <Project/>
        <Project/>
      </div></>
    );
  }
   export default OurProjectPage;
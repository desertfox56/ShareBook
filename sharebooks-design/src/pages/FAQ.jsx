import React from 'react';
import {  Typography } from 'antd';
import FAQAccordion from '../components/Accordion';
import '../assets/css/FAQ.css';
const { Title, Paragraph } = Typography;
function FAQPage(){
  return(
    <>
    <Title level={3} style={{textAlign:'center', marginBottom:'1%'}}>Часто задаваемые вопросы</Title>
    <div className='FAQ'>
      <FAQAccordion/>
    </div>
    </>
  );
}
 export default FAQPage;
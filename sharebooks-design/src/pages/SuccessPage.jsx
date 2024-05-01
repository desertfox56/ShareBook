import React from 'react';
import PopularBooks from '../components/PopularBooks';
import SearchBar from '../components/Search';
import { Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import '../assets/css/SuccessPage.css';
const { Title } = Typography;
function SuccessPage(){
  return(
    <div className='SuccessPage'>
      <div className='SearchBars'><SearchBar/></div>
      <div className='TopBar'>
      
          <div className='ProfilUser'><Avatar icon={<UserOutlined />} /><Link to="/ProfilUser/">Профиль</Link></div>
          
          <div className='profile-settings'><SettingOutlined /><Link to="/Settings/">Настройки</Link></div>
          
        
      </div>
      <div className="popularBooks">
        <Title level={2}>Топ-5 популярных книг</Title>
      <PopularBooks/>
      </div>
    </div>
  );
}
 export default SuccessPage;
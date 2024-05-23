import React,{useState} from 'react';
import PopularBooks from '../components/PopularBooks';
import SearchBar from '../components/Search';
import ResultSearchBooks from '../components/ResultSearchBooks';
import { Avatar, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import '../assets/css/SuccessPage.css';
const { Title } = Typography;
function SuccessPage(){
  const [searchResults, setSearchResults] = useState([]); // Состояние для хранения результатов поиска
  const [isSearched, setIsSearched] = useState(false); // Состояние для управления видимостью результатов
  return(
    <div className='SuccessPage'>
      <div className='SearchBars'><SearchBar setSearchResults={setSearchResults} setIsSearched={setIsSearched}/></div>
      <div className='TopBar'>
          <div className='ProfilUser'><Avatar icon={<UserOutlined />} /><Link to="/ProfilUser/">Профиль</Link></div> 
          <div className='profile-settings'><SettingOutlined /><Link to="/Settings/">Настройки</Link></div>      
      </div>
      <div className="popularBooks">
        <Title level={2}>Топ-5 популярных книг</Title>
      <PopularBooks/>
      </div>
      {isSearched && searchResults.length > 0 && (
      <div className="searchResults">
        <Title level={3} style={{textAlign:'center'}}>Результаты поиска:</Title>
        <ResultSearchBooks books={searchResults} />
      </div>
    )}
    </div>
  );
}
 export default SuccessPage;
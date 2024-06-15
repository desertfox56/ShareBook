import React, { useState, useEffect } from 'react';
import { Drawer, Button, Menu, Layout,Image,Modal, Input } from 'antd';
import { MenuOutlined,SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Header.css';
import logo from '../assets/img/ShareBookLogo.png';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/searchContext';
import AppHeader from './Header'; // Компонент с десктопным меню
const { Header } = Layout;
// Компонент для адаптивного меню
function ResponsiveMenu() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Состояние для отслеживания ширины экрана
  const [visible, setVisible] = useState(false);  // Состояние для видимости меню
  const [searchVisible, setSearchVisible] = useState(false); // Состояние для видимости модального окна поиска
  const { handleSearch } = useSearch(); // Получаем функцию поиска из контекста
  const navigate = useNavigate(); // Хук навигации
  // Эффект для отслеживания изменений ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Обработчик для переключения видимости меню
  const toggleDrawer = () => {
    setVisible(!visible);
  };
  // Обработчик для показа модального окна поиска
  const showSearchModal = () => {
    setSearchVisible(true);
  };

  const handleSearchCancel = () => {
    setSearchVisible(false);
  };

  const onSearch = (value) => {
    handleSearch(value);
    setSearchVisible(false);
  };
  const handleMenuClick = (e) => {
    navigate(e.key);
    setVisible(false); // Закрываем меню
  };
  //Если ширина экрана == мобильная:
  if (isMobile) {
    return (
        <Header >
        <div className='LogoMobile' style={{width:'10%', marginLeft:'-13%'}} >
        <Link to="/">
            <Image
                width="100%"
                height="100%"
                src={logo}
                alt="ShareBook logo"
            /></Link>
        </div>
        <div className='SearchBar' style={{width:'100%', marginLeft:'-35%'}}>
        <Button 
          icon={<SearchOutlined />} 
          onClick={showSearchModal} 
           style={{color:'#69B1FF'}}
        />
            </div>
        <Button className="menu-button" icon={<MenuOutlined />} onClick={toggleDrawer} style={{marginRight:'-13%'}}>
          Меню
        </Button>
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          visible={visible}
        >
           <Menu mode="vertical" onClick={handleMenuClick}>
            <Menu.Item key="/">Главная</Menu.Item>
            <Menu.Item key="/Marketplace">Наши книги</Menu.Item>
            <Menu.Item key="/OurProjects">Наши проекты</Menu.Item>
            <Menu.Item key="/contacts">Контакты</Menu.Item>
            <Menu.Item key="/FAQ">FAQ</Menu.Item>
          </Menu>
        </Drawer>
        <Modal
          title="Поиск"
          visible={searchVisible}
          onCancel={handleSearchCancel}
          footer={null}
        >
          <Input.Search
            placeholder="Введите название книги"
            enterButton={<Button type="primary" icon={<SearchOutlined />}>Поиск</Button>}
            size="large"
            onSearch={handleSearch}
          />
        </Modal>

        </Header>
    );
  } else {
    return <AppHeader />; // В других случаях показывается компонент меню для десктопных версий
  }
}

export default ResponsiveMenu;

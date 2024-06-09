import React, { useState, useEffect } from 'react';
import { Drawer, Button, Menu, Layout,Image,Modal, Input } from 'antd';
import { MenuOutlined,SearchOutlined } from '@ant-design/icons';
import SearchBar from './Search';
import '../assets/css/Header.css';
import logo from '../assets/img/ShareBookLogo.png';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/searchContext';
import AppHeader from './Header'; // Предполагается, что это ваш компонент с обычным меню
const { Header } = Layout;
function ResponsiveMenu() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const { handleSearch } = useSearch();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

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
        <div className='SearchBar' style={{width:'100%', marginLeft:'-85%'}}>
        <Button 
          icon={<SearchOutlined />} 
          onClick={showSearchModal} 
           style={{color:'#69B1FF'}}
        />
            </div>
        <Button className="menu-button" icon={<MenuOutlined />} onClick={toggleDrawer} style={{marginRight:'3%'}}>
          Меню
        </Button>
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          visible={visible}
        >
          <Menu mode="vertical">
            <Menu.Item key="1"><Link to="/">Главная</Link></Menu.Item>
            <Menu.Item key="2"><Link to="Marketplace/">Наши книги</Link></Menu.Item>
            <Menu.Item key="3"><Link to="OurProjects/">Наши проекты</Link></Menu.Item>
            <Menu.Item key="4"><Link to="contacts/">Контакты</Link></Menu.Item>
            <Menu.Item key="5"><Link to="FAQ/">FAQ</Link></Menu.Item>
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
    return <AppHeader />; // Ваш обычный компонент меню для десктопных версий
  }
}

export default ResponsiveMenu;

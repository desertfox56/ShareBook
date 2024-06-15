import React from 'react';
import { Layout, Menu, Image } from 'antd';
import SearchBar from './Search';
import '../assets/css/Header.css';
import logo from '../assets/img/ShareBookLogo.png';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/searchContext';
const { Header } = Layout;

// Link - это замена <a href="">; обеспечивает декларативный и доступный способ навигации в React-приложении.
function AppHeader() {
    const { handleSearch } = useSearch(); // Получаем функцию поиска из контекста
    return (
        <Header >
        <div className='Logo' >
        <Link to="/">
            <Image
                width="10%"
                height="10%"
                src={logo}
                alt="ShareBook logo"
            /></Link>
        </div>
        <div className='SearchBar'>
                <SearchBar onSearch={handleSearch} />
            </div>
        <div className='Nav' >
            <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/">Главная</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="Marketplace/">Наши книги</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="OurProjects/">Наши проекты</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="contacts/">Контакты</Link>
                    
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="FAQ/">FAQ</Link>
                </Menu.Item>
            </Menu>
        </div>  
    </Header>
    );
}

export default AppHeader;

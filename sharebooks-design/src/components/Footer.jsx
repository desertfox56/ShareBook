import React from 'react';
import { GithubOutlined, DiscordOutlined , RedditOutlined, TikTokOutlined , InstagramOutlined } from '@ant-design/icons';
import { Layout, Menu, Image,Typography,Divider } from 'antd';
import { Icon32LogoVk } from '@vkontakte/icons';
import { FaDiscord, FaTiktok } from "react-icons/fa";
import logo from '../assets/img/Logotype1.png';
const {Footer} = Layout;
const { Title } = Typography;
function AppFooter(){
    return(
        <Footer style={{ display: 'flex', alignItems: 'center', padding: '20px', width: '100%',backgroundColor:'#fafcfc'}}>
        
        <div className='Logo' style={{ display: 'flex',flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            <Image src={logo} width={50} />
            <Title level={3} style={{ marginLeft: '15px' }}>&copy; 2024 ShareBook. All rights reserved.</Title>
        </div>

        <div style={{ display: 'flex',flex: 2, justifyContent: 'right', gap: '15px' }}>
            <GithubOutlined title="GitHub"  style={{ fontSize: '30px' }}/>
            <FaDiscord  title="Facebook" style={{ fontSize: '30px' }} />
            <RedditOutlined title="Reddit"  style={{ fontSize: '30px' }}/>
            <FaTiktok  title="Twitter" style={{ fontSize: '30px' }} />
            <Icon32LogoVk title="VK" style={{ fontSize: '30px' }}/>
        </div>

    </Footer>
        
    );
}
export default AppFooter;
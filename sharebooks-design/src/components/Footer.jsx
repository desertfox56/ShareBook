import React,{useState} from 'react';
import { GithubOutlined, DiscordOutlined , RedditOutlined, TikTokOutlined , InstagramOutlined } from '@ant-design/icons';
import { Layout, Menu, Image,Typography,Divider } from 'antd';
import { Icon32LogoVk } from '@vkontakte/icons';
import { FaDiscord, FaTiktok } from "react-icons/fa";
import logo from '../assets/img/ShareBookLogo.png';
import UserAgreementModal from './UserAgreement';
const {Footer} = Layout;
const { Title } = Typography;
function AppFooter(){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <Footer style={{ display: 'flex', alignItems: 'center', padding: '20px', width: '100%', backgroundColor: '#fafcfc', justifyContent: 'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center',textAlign: 'center' }}>
            <Image src={logo} width={50} />
            <Title level={3} style={{ margin: '5px 0 0 15px' }}>&copy; 2024 ShareBook. Все права защищены.</Title>
        </div>
        <Title level={3} style={{ margin: '5px 0 0 0',alignSelf: 'center' }}><a onClick={() => setModalVisible(true)}>Политика конфиденциальности</a></Title>
        <UserAgreementModal
          visible={modalVisible}
          setVisible={setModalVisible}
         
        />
        <div style={{ display: 'flex', gap: '15px',alignItems: 'center' }}>
            <GithubOutlined title="GitHub" style={{ fontSize: '30px' }}/>
            <FaDiscord title="Discord" style={{ fontSize: '30px' }} />
            <RedditOutlined title="Reddit" style={{ fontSize: '30px' }}/>
            <FaTiktok title="TikTok" style={{ fontSize: '30px' }} />
            <Icon32LogoVk title="VK" style={{ fontSize: '30px' }}/>
        </div>
        
    </Footer>
        
    );
}
export default AppFooter;
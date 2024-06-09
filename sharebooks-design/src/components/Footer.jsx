import React,{useState} from 'react';
import { GithubOutlined, DiscordOutlined , RedditOutlined, TikTokOutlined , InstagramOutlined } from '@ant-design/icons';
import { Layout, Menu, Image,Typography,Divider } from 'antd';
import { Icon32LogoVk } from '@vkontakte/icons';
import { FaDiscord, FaTiktok } from "react-icons/fa";
import logo from '../assets/img/ShareBookLogo.png';
import UserAgreementModal from './UserAgreement';
import '../assets/css/Footer.css'; 
const {Footer} = Layout;
const { Title } = Typography;
function AppFooter(){
    const [modalVisible, setModalVisible] = useState(false);
    
    return(
        <Footer className="footer">
        <div className="footer-section">
            <Image src={logo} width={50} />
            <Title level={3} className="footer-text">&copy; 2024 ShareBook. Все права защищены.</Title>
        </div>
        <Title level={3} className="footer-text"><a onClick={() => setModalVisible(true)}>Политика конфиденциальности</a></Title>
        <UserAgreementModal
          visible={modalVisible}
          setVisible={setModalVisible}
         
        />
        <div className="footer-icons">
            <GithubOutlined title="GitHub" className="footer-icons"  style={{
        fontSize: '32px',
      }}/>
            <FaDiscord title="Discord" className="footer-icons"  style={{
        fontSize: '32px',
      }}/>
            <RedditOutlined title="Reddit" className="footer-icons"  style={{
        fontSize: '32px',
      }}/>
            <FaTiktok title="TikTok" className="footer-icons" style={{
        fontSize: '32px',
      }} />
            <Icon32LogoVk title="VK" className="footer-icons" style={{
        fontSize: '32px',
      }}/>
        </div>
        
    </Footer>
        
    );
}
export default AppFooter;
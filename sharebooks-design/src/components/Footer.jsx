import React from 'react';
import { GithubOutlined, FacebookOutlined, RedditOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Layout, Menu, Image,Typography,Divider } from 'antd';
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
            <FacebookOutlined title="Facebook" style={{ fontSize: '30px' }} />
            <RedditOutlined title="Reddit"  style={{ fontSize: '30px' }}/>
            <TwitterOutlined title="Twitter" style={{ fontSize: '30px' }} />
            <InstagramOutlined title="Instagram"  style={{ fontSize: '30px' }}/>
            <LinkedinOutlined title="LinkedIn" style={{ fontSize: '30px' }} />
        </div>

    </Footer>
        
    );
}
export default AppFooter;
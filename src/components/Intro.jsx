import React,{useState} from 'react';
import { Typography,Image,Layout, Button } from 'antd';
import Photo1 from '../assets/img/reading_man.jpg';
import Photo2 from '../assets/img/reading_girl.jpg';
import { Link } from 'react-router-dom';
//import  { SizeType } from 'antd/es/config-provider/SizeContext';
const { Title } = Typography;

function Intro(){
    //const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    //const [size, setSize] = useState('large'); // default is 'middle'
    return(
        
        <div className='Intro' style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>

            <div className='IntroLeftCard' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                <Image
                    width="80%"
                    height="70%"
                    src={Photo1}
                    alt="ShareBook Intro Picture"
                />
                <Title level={3}>Читать стало комфортнее</Title>
            </div>

            <div className='IntroCenterCard' style={{display: 'flex',textAlign:'center', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                <Title level={2}>Онлайн библиотека-ShareBooks</Title>
                <Title level={3}>Читать теперь стало удобнее на нашем сайте</Title>
                <Button type="primary" >
                <Link to="/login/">Читать сейчас</Link>
                </Button> 
            </div>

            <div className='IntroRightCard' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                <Image
                    width="80%"
                    height="70%"
                    src={Photo2}
                    alt="ShareBook Intro Picture"
                />
                <Title level={3}>Читать стало интереснее</Title>
            </div>

        </div>

    );
}

export default Intro;
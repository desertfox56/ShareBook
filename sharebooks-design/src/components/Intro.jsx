import React from 'react';
import { Typography,Image, Button } from 'antd';
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
                <p style={{textAlign:'justify'}}>Откройте для себя радость чтения без ограничений. Наша библиотека доступна 24/7, что позволяет вам погружаться в книги, будь то раннее утро или поздний вечер. Мы заботимся о том, чтобы наше приложение было удобным для каждого пользователя, обеспечивая адаптивный дизайн для чтения на любом устройстве. Ваше удобство — наш приоритет, поэтому вы можете настроить формат текста, размер шрифта и фон, чтобы чтение было максимально комфортным и не нагружало зрение.</p>
            </div>

            <div className='IntroCenterCard' style={{display: 'flex',textAlign:'center', flexDirection: 'column', alignItems: 'center', width: '30%'}}>
                <Title level={2}>Онлайн библиотека-ShareBooks</Title>
                <Title level={3}>Читать теперь стало удобнее на нашем сайте</Title>
                <Button type="primary" danger>
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
                <p style={{textAlign:'justify'}}>Расширяйте свои горизонты с каждой новой книгой. Наш каталог — это сокровищница разнообразных жанров и направлений, от классики до современных бестселлеров. Исследуйте произведения мировой литературы, подберите книги по вашим интересам и получайте персональные рекомендации, основанные на ваших предпочтениях. Читать с нами — это не только отдых, но и возможность учиться, открывать что-то новое и даже участвовать в обсуждениях с единомышленниками.</p>
            </div>

        </div>

    );
}

export default Intro;
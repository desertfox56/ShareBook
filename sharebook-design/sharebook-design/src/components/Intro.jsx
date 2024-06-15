import React from 'react';
import { Typography,Image,Button} from 'antd';
import Photo1 from '../assets/img/reading_man.jpg';
import Photo2 from '../assets/img/reading_girl.jpg';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function Intro(){
    
    return(
        
        <div className='Intro' style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>

            <div className='IntroLeftCard'>
                <Image
                    className="intro-image"
                    src={Photo1}
                    alt="ShareBook Intro Picture"  
                />
                
                <Title level={3} className='IntroTitle'>Читать стало комфортнее</Title>
                <p style={{textAlign:'justify', marginTop:'7px'}}>Откройте для себя радость чтения без ограничений. Наша библиотека доступна 24/7, что позволяет вам погружаться в книги, будь то раннее утро или поздний вечер. Мы заботимся о том, чтобы наше приложение было удобным для каждого пользователя, обеспечивая адаптивный дизайн для чтения на любом устройстве. Ваше удобство — наш приоритет, поэтому вы можете настроить формат текста, размер шрифта и фон, чтобы чтение было максимально комфортным и не нагружало зрение.</p>
            </div>

            <div className='IntroCenterCard'>
                <Title level={2} className='IntroTitle'>Онлайн библиотека-ShareBook</Title>
                <Title level={3} className='IntroTitle'>Читать теперь стало удобнее на нашем сайте</Title>
                <Button type="primary"  style={{backgroundColor:'#13C2C2'}}>
                <Link to="/login/">Читать сейчас</Link>
                </Button> 
            </div>

            <div className='IntroRightCard'>
                <Image
                    className="intro-image"
                    src={Photo2}
                    alt="ShareBook Intro Picture"
                    
                />
                <Title level={3} className='IntroTitle'>Читать стало интереснее</Title>
                <p style={{textAlign:'justify', marginTop:'7px'}}>Расширяйте свои горизонты с каждой новой книгой. Наш каталог — это сокровищница разнообразных жанров и направлений, от классики до современных бестселлеров. Исследуйте произведения мировой литературы, подберите книги по вашим интересам и получайте персональные рекомендации, основанные на ваших предпочтениях. Читать с нами — это не только отдых, но и возможность учиться, открывать что-то новое и даже участвовать в обсуждениях с единомышленниками.</p>
            </div>

        </div>

    );
}

export default Intro;
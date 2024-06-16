import React from 'react';
import { Badge, Descriptions } from 'antd';

const items = [
  {
    key: '1',
    label: 'Продукт',
    children: 'ShareBook',
  },
  
  {
    key: '2',
    label: 'Описание продукта',
    children: 'Сайт "Sharebook" создан для предоставления пользователю возможности не только читать самому, но и обмениваться книгами с другими участниками онлайн-библиотеки. Пользователи могут как запрашивать доступ к книгам других участников, так и предоставлять доступ к своим собственным книгам, создавая виртуальную среду для обмена литературными произведениями. Кроме того, платформа дает возможность пользователям следить за новыми поступлениями книг, просматривать отзывы и рекомендации, а также подписываться на интересные авторов и жанры.',
    contentStyle: {fontSize:'smaller'},
},
  
  {
    key: '5',
    label: 'Статус',
    span: 3,
    children: <Badge status="processing" text={<span style={{ fontSize: 'default',width:'100%' }}>В разработке</span>} />,
    
  },
  {
    key: '6',
    label: 'Стоимость',
    children: '$80.00',
  },
  {
    key: '7',
    label: 'Скидка',
    children: '$20.00',
  },
  {
    key: '8',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '9',
    label: 'Системные требования',
    children: (
      <>
        ОС: Современные версии Windows, macOS, Linux или мобильные ОС (iOS, Android)
        <br></br>
        Браузер: Последние версии Google Chrome, Mozilla Firefox, Safari, Opera, Edge
        <br></br>
        Оперативная память: Минимум 2 ГБ RAM
        <br></br>
        Процессор: Современный процессор
      </>
    ),
  },
];
function Project(){
    return(
        <div className='OurProjects' >
        <Descriptions title="Sharebook" layout="vertical" theme="light" size='small' bordered  column={1} items={items} />
        </div>
    );
}
export default Project;



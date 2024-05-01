//Доделать
import React from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { LockOutlined , UnlockOutlined , HeartOutlined ,DollarOutlined,GiftOutlined,ReadOutlined } from '@ant-design/icons';
import '../assets/css/Cards.css';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import ServantesAvatar from '../assets/img/migel-de-servantes.jpg';
import PictureRobinsonCrusoe from '../assets/img/RobinsonCrusoe.jpg';
import DefoeAvatar from '../assets/img/DanielDefoe.jpg';
import PictureAncientGreekMythos from '../assets/img/AncientGreekMythos.jpg';
import SchwabAvatar from '../assets/img/GustavSchwab.jpg';

const { Title, Text } = Typography;
const { Meta } = Card;

function WishCards(){
  const cardStyle = {
    width: '100%', // ширина карточки в процентах относительно родителя
    height: '650px',
    maxHeight: '780px', // максимальная высота карточки
    margin: '0 auto', // центрирование карточки
  };

  const coverImageStyle = {
    width: '100%', // ширина обложки равна ширине карточки
    height: '300px', // фиксированная высота обложки
    objectFit: 'cover', // обрезка изображения по размеру контейнера
  };
    return(
      <Row gutter={16} className='Row2'>
      <Col span={8} >
        <Card  bordered={false} style={cardStyle} className="custom-card2"
        cover={
          <Image
            alt="example"
            src={PictureDonQuxote}
            height="40%"
            width="100%"
            style={coverImageStyle}
            
          />
        }
        actions={[
          <DollarOutlined key="buy" />,
          <ReadOutlined key="reading" />,
          <GiftOutlined key="gift" />,
          <LockOutlined />
        ]}>
          <Meta
      avatar={<Avatar src={ServantesAvatar} />}
      title={null}
      description={
        <div><HeartOutlined style={{ fontSize: '170%'}}/>
          <div style={{ marginBottom: '16px' }}>
            <Button  style={{ marginTop: '8px' }}>Мигель де Сервантес</Button> {/* Кнопка автора */}
            <Button >Роман</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
        Дон Кихот
      </div>
      <div style={{color:'#1F1F1F'}}>
          История об Алонсо Кихано, жителе некоего села в захолустной испанской провинции Ла-Манча, который воображает себя странствующим рыцарем, бессмертна, а имя Дон Кихот стало своего рода мерилом оценки человеческих поступков.
        </div>
        </div>
      }
    />
        </Card>
      </Col>


      <Col span={8} >
      <Card  bordered={false} style={cardStyle} className="custom-card2"
        cover={
          <Image
            alt="example"
            src={PictureRobinsonCrusoe}
            height="40%"
            width="100%"
            style={coverImageStyle}
            
          />
        }
        actions={[
          <DollarOutlined key="buy" />,
          <ReadOutlined key="reading" />,
          <GiftOutlined key="gift" />,
          <UnlockOutlined />
        ]}>
          <Meta
      avatar={<Avatar src={DefoeAvatar} />}
      title={null}
      description={
        <div><HeartOutlined style={{ fontSize: '170%'}}/>
          <div style={{ marginBottom: '16px' }}>
            <Button  style={{ marginTop: '8px' }}>Даниэль Дефо</Button> {/* Кнопка автора */}
            <Button >Роман</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
        Робинзон Крузо
      </div>
      <div style={{color:'#1F1F1F'}}>
      Робинзон Крузо, молодой и легкомысленный, после кораблекрушения оказывается на необитаемом острове в полном одиночестве. Он осваивает новый мир, благодаря упорству и трудолюбию учится обеспечивать себя необходимым и неутомимо ищет пути к спасению.
        </div>
        </div>
      }
    />
        </Card>
      </Col>


      <Col span={8} >
        <Card  bordered={false} style={cardStyle} className="custom-card2" 
        cover={
          <Image
            alt="example"
            src={PictureDonQuxote}
            height="40%"
            width="100%"
            style={coverImageStyle}
           
            
          />
        }
        actions={[
          <DollarOutlined key="buy" />,
          <ReadOutlined key="reading" />,
          <GiftOutlined key="gift" />,
          <LockOutlined />
        ]}>
          <Meta
      avatar={<Avatar src={ServantesAvatar} />}
      title={null}
      description={
        <div><HeartOutlined style={{ fontSize: '170%'}}/>
          <div style={{ marginBottom: '16px' }}>
            <Button  style={{ marginTop: '8px' }}>Мигель де Сервантес</Button> {/* Кнопка автора */}
            <Button >Роман</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
        Дон Кихот
      </div>
      <div style={{color:'#1F1F1F'}}>
          История об Алонсо Кихано, жителе некоего села в захолустной испанской провинции Ла-Манча, который воображает себя странствующим рыцарем, бессмертна, а имя Дон Кихот стало своего рода мерилом оценки человеческих поступков.
        </div>
        </div>
      }
    />
        </Card>
      </Col>

    </Row>
    );
}
export default WishCards;
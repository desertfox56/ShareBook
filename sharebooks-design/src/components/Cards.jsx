//Доделать
import React, { useState, useEffect } from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { DollarOutlined,GiftOutlined,ReadOutlined } from '@ant-design/icons';
import '../assets/css/Cards.css';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import ServantesAvatar from '../assets/img/migel-de-servantes.jpg';
import PictureRobinsonCrusoe from '../assets/img/RobinsonCrusoe.jpg';
import DefoeAvatar from '../assets/img/DanielDefoe.jpg';
import PictureAncientGreekMythos from '../assets/img/AncientGreekMythos.jpg';
import SchwabAvatar from '../assets/img/GustavSchwab.jpg';
import ModalForm from '../components/ModalForm';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { Title, Text } = Typography;
const { Meta } = Card;

const Cards =()=>{
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  


  useEffect(() => {
    const fetchBooks = async () => {
        try {
            // Получаем токен из localStorage
            const token = localStorage.getItem('accessToken');
            // Декодируем токен и извлекаем ID пользователя
        const decodedToken = jwtDecode(token);
        

        // Добавляем токен в заголовки запроса
        const headers = {
          Authorization: `JWT ${token}`,
        };
            const response = await axios.get('http://localhost:8000/marketplace/allbooks/',{ headers });
            setBooks(response.data);
            
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    fetchBooks();
}, []);

  


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

  const handlePurchaseClick = (book) => {
    setSelectedBook(book);
    setIsModalVisible(true); // Opens the modal when a book is selected
  };
  

    return(
      
      <Row gutter={16} className='Row'>
         {books.map((book) => (
      <Col span={8} key={book.id}>
      
        <Card  bordered={false} style={cardStyle} className="custom-card"
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
          <DollarOutlined key="buy" onClick={() => handlePurchaseClick(book)} />,
          <ReadOutlined key="reading" />,
          <GiftOutlined key="gift" />,
        ]}>
          <Meta
      avatar={<Avatar src={ServantesAvatar} />}
      title={null}
      description={
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Button  style={{ marginTop: '8px' }}>{book.author_name}</Button> {/* Кнопка автора */}
            <Button >{book.genre_name}</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
          {book.title}
      </div>
      <div style={{color:'#1F1F1F'}}>
      {book.description}
        </div>
        </div>
      }
    />
        </Card>
      </Col>
      
))}

<ModalForm selectedBook={selectedBook} isOpen={isModalVisible} setIsOpen={setIsModalVisible} />


      <Col span={8} >
      <Card  bordered={false} style={cardStyle} className="custom-card"
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
        ]}>
          <Meta
      avatar={<Avatar src={DefoeAvatar} />}
      title={null}
      description={
        <div>
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


      <Col span={8}>
        <Card  bordered={false} style={cardStyle} className="custom-card"
        cover={
          <Image
            alt="example"
            src={PictureAncientGreekMythos}
            height="40%"
            width="100%"
            style={coverImageStyle}
            
          />
        }
        actions={[
          <DollarOutlined key="buy" />,
          <ReadOutlined key="reading" />,
          <GiftOutlined key="gift" />,
        ]}>
          <Meta
      avatar={<Avatar src={SchwabAvatar} />}
      title={null}
      description={
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Button  style={{ marginTop: '8px' }}>Густав Шваб</Button> {/* Кнопка автора */}
            <Button >Эпос</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold',color:'#1F1F1F' }}>
          Мифы и притчи классической древности
      </div>
      <div style={{color:'#1F1F1F'}}>
      В настоящее издание включены наиболее популярные античные мифы, изложенные поэтом-романтиком, а также ряд произведений французского и немецкого эпосов в литературной обработке писателя.
        </div>
        </div>
      }
    />
        </Card>
      </Col>  

      

    </Row>

    );
}
export default Cards;
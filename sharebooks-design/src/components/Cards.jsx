//Доделать
import React, { useState, useEffect } from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { DollarOutlined,GiftOutlined,ReadOutlined } from '@ant-design/icons';
import '../assets/css/Cards.css';
import ServantesAvatar from '../assets/img/migel-de-servantes.jpg';
import PictureRobinsonCrusoe from '../assets/img/RobinsonCrusoe.jpg';
import DefoeAvatar from '../assets/img/DanielDefoe.jpg';
import PictureAncientGreekMythos from '../assets/img/AncientGreekMythos.jpg';
import SchwabAvatar from '../assets/img/GustavSchwab.jpg';
import ModalFormPurchase from './ModalFormPurchase';
import ModalFormTransfer from './ModalFormTransfer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FiltersContext';
//const { Title, Text } = Typography;
const { Meta } = Card;

const Cards =()=>{
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPurchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { filteredBooks } = useFilters();

  useEffect(() => {
    const fetchBooks = async () => {
        try {
  
            const response = await axios.get('http://localhost:8000/api/marketplace/allbooks/');
            setBooks(response.data.results);
            
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
    setPurchaseModalVisible(true); // Opens the modal when a book is selected
  };
  const handleTransferClick = (book) => {
    setSelectedBook(book);
    setTransferModalVisible(true); // Opens the modal when a book is selected
  };
  const handleReadingClick=()=>{
    navigate('/Reading');
  }

    return(
      
      <Row gutter={16} className='Row'>
         {(filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
      <Col span={8} key={book.id} style={{marginBottom:'5%'}}>
      
        <Card  bordered={false} style={cardStyle} className="custom-card"
        cover={
          <Image
            alt="example"
            src={book.image}
            height="40%"
            width="100%"
            style={coverImageStyle}
            
          />
        }
        actions={[
          <DollarOutlined key="buy" onClick={() => handlePurchaseClick(book)} />,
          <ReadOutlined key="reading" onClick={handleReadingClick} />,
          <GiftOutlined key="gift" onClick={() => handleTransferClick(book)} />,
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

<ModalFormPurchase selectedBook={selectedBook} isOpen={isPurchaseModalVisible} setIsOpen={setPurchaseModalVisible} />
<ModalFormTransfer selectedBook={selectedBook} isOpen={isTransferModalVisible} setIsOpen={setTransferModalVisible} />

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
            <Button >Роман</Button> {/* Кнопка жанра  */}
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
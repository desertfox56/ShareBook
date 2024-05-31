//Доделать
import React, { useState, useEffect,useCallback } from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { DollarOutlined,GiftOutlined,ReadOutlined, HeartOutlined  } from '@ant-design/icons';
import '../assets/css/Cards.css';
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
  
            const response = await axios.get('${process.env.REACT_APP_API_URL}/marketplace/allbooks/');
            setBooks(response.data.results);
            
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    fetchBooks();
}, []);

const addBookToWishList = async (selectedBook) => {
  if (!selectedBook) {
    console.log('No book selected');
    return;
  }

  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No token found, user is not authorized');
      return;
    }

    const headers = { Authorization: `JWT ${token}` };
    const selectedBookId = selectedBook ? selectedBook.id : null;
    const wishListUrl = `${process.env.REACT_APP_API_URL}/myBooks/wishlist/${selectedBookId}/`;
    await axios.post(wishListUrl, {}, { headers });

    console.log('WishList adding successful');
    alert('Книга успешно добавлена в ваш список желаний!');
    navigate('/WishPage');
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    alert('Произошла ошибка:(');
  }
};


  const cardStyle = {
    width: '100%', // ширина карточки в процентах относительно родителя
    height: '650px',
    maxHeight: '830px', // максимальная высота карточки
    margin: '0 auto', // центрирование карточки
    
  };

  const coverImageStyle = {
    width: '100%', // ширина обложки равна ширине карточки
    height: '280px', // фиксированная высота обложки
    objectFit: 'cover', // обрезка изображения по размеру контейнера
  };
  const handleBookSelect = useCallback((book) => {
    if (book && book.id) {
      localStorage.setItem('selectedBookId', book.id);
      setSelectedBook(book);
      console.log(`Book ID ${book.id} saved to localStorage`);
    } else {
      console.log('Attempted to select a book with undefined ID');
    }
  }, []);
  const handlePurchaseClick = useCallback((book) => {
    setSelectedBook(book);
    setPurchaseModalVisible(true); // Opens the modal when a book is selected
  }, []);
  const handleTransferClick = useCallback((book) => {
    setSelectedBook(book);
    setTransferModalVisible(true); // Opens the modal when a book is selected
  }, []);
  const handleReadingClick=useCallback((book)=>{
    if (selectedBook !== book) { // Проверяем, что выбранная книга действительно изменилась
      handleBookSelect(book);
    }
    navigate('/Reading');
  }, [selectedBook, navigate, handleBookSelect])

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
          <ReadOutlined key="reading" onClick={() => handleReadingClick(book)} />,
          <GiftOutlined key="gift" onClick={() => handleTransferClick(book)} />,
          <HeartOutlined key="wishlist" onClick={() => addBookToWishList(book)} style={{ color: 'red' }} />,
        ]}>
          <Meta
      avatar={<Avatar src={book.avatar} />}
      title={null}
      description={
        <div> 
          <div style={{ marginBottom: '16px', display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            <Button  style={{ marginTop: '8px', display:'flex', flexDirection:'row', fontSize:'12px', textAlign:'center' }}>{book.author_name}</Button> {/* Кнопка автора */}
            <Button style={{ marginTop: '8px', display:'flex', flexDirection:'row', fontSize:'12px', textAlign:'center' }}>{book.genre_name}</Button> {/* Кнопка жанра */}
          </div>
          <div style={{ marginTop: '16px', marginBottom:'8px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
          {book.title}
      </div>
      <div style={{color:'#1F1F1F', textAlign:'justify'}}>
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

      

    

    </Row>

    );
}
export default Cards;
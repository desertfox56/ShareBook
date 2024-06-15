import React, { useState, useEffect,useCallback } from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { DollarOutlined,GiftOutlined,ReadOutlined, HeartOutlined  } from '@ant-design/icons';
import '../assets/css/Cards.css';
import ModalFormPurchase from './ModalFormPurchase';
import ModalFormTransfer from './ModalFormTransfer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FiltersContext';

const { Meta } = Card;

const Cards =()=>{
  //Состояния компонента
  const [books, setBooks] = useState([]); // Состояние для хранения всех книг
  const [selectedBook, setSelectedBook] = useState(null); // Состояние для выбранной книги
  const [isPurchaseModalVisible, setPurchaseModalVisible] = useState(false);  // Состояние для видимости модального окна покупки
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);  // Состояние для видимости модального окна передачи
  const navigate = useNavigate(); // Хук для навигации
  const { filteredBooks } = useFilters(); // Используем контекст фильтров

  // Эффект для получения списка книг при монтировании компонента
  useEffect(() => {
    const fetchBooks = async () => {
        try {
  
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/marketplace/allbooks/`);
            setBooks(response.data.results); // Сохраняем полученные книги в состояние
            
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    fetchBooks();
}, []);

// Функция для добавления книги в список желаемого
const addBookToWishList = async (selectedBook) => {
  // Проверяем, выбрана ли книга
  if (!selectedBook) {
    console.log('No book selected');
    return;
  }

  try {
    // Получаем токен из localStorage
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No token found, user is not authorized');
      return;
    }
    const headers = { Authorization: `JWT ${token}` };
    const selectedBookId = selectedBook ? selectedBook.id : null;
    // Формируем URL для добавления книги в список желаемого
    const wishListUrl = `${process.env.REACT_APP_API_URL}/myBooks/wishlist/${selectedBookId}/`;
    // Отправляем POST запрос на сервер для добавления книги
    await axios.post(wishListUrl, {}, { headers });
    console.log('WishList adding successful');
    alert('Книга успешно добавлена в ваш список желаний!');
    navigate('/WishPage'); // Перенаправляем пользователя на страницу желаемого
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
  // Обработчик выбора книги
  const handleBookSelect = useCallback((book) => {
    if (book && book.id) {
      localStorage.setItem('selectedBookId', book.id);
      setSelectedBook(book);
      console.log(`Book ID ${book.id} saved to localStorage`);
    } else {
      console.log('Attempted to select a book with undefined ID');
    }
  }, []);
  // Обработчик клика для аренды книги
  const handlePurchaseClick = useCallback((book) => {
    setSelectedBook(book);
    setPurchaseModalVisible(true); // Открываем модальное окно покупки, когда книга выбрана
  }, []);
  // Обработчик клика для передачи книги
  const handleTransferClick = useCallback((book) => {
    setSelectedBook(book);
    setTransferModalVisible(true); // Открываем модальное окно покупки, когда книга выбрана
  }, []);
  // Обработчик клика для чтения книги
  const handleReadingClick=useCallback((book)=>{
    if (selectedBook !== book) { // Проверяем, что выбранная книга действительно изменилась
      handleBookSelect(book);
    }
    navigate('/Reading'); //Перенаправляем на страницу чтения
  }, [selectedBook, navigate, handleBookSelect])

    return(
      <Row gutter={16} className='Row2'>
        {/* Отображаем либо отфильтрованные книги, либо все книги */}
         {(filteredBooks.length > 0 ? filteredBooks : books).map((book) => (
      <Col span={8} xs={24} sm={12} lg={8} key={book.id} style={{marginBottom:'6%'}}>
      
        <Card  bordered={false} style={cardStyle} className="custom-card2"
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

 {/* Модальные окна для аренды и передачи книг */}
<ModalFormPurchase selectedBook={selectedBook} isOpen={isPurchaseModalVisible} setIsOpen={setPurchaseModalVisible} />
<ModalFormTransfer selectedBook={selectedBook} isOpen={isTransferModalVisible} setIsOpen={setTransferModalVisible} />

    </Row>
    );
}
export default Cards;
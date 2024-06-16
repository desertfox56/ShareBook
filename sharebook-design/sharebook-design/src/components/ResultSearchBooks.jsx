import React from 'react';
import { useSearch } from '../context/searchContext';
import { Card, Image, Avatar,Button } from 'antd';
// import { DollarOutlined,GiftOutlined,ReadOutlined, HeartOutlined  } from '@ant-design/icons';
//Добавить те же кнопки как и на странице маркетплейса?
function ResultSearchBooks({ books }) {
    const { Meta } = Card;
    const { searchResults, isSearched } = useSearch();

    if (!isSearched) {
        return null; // Не отображать компонент, если поиск не был выполнен
    }
    const cardStyle = {
        width: '340px', // ширина карточки в процентах относительно родителя
        height: '650px',
        maxHeight: '830px', // максимальная высота карточки
        margin: '0 auto', // центрирование карточки
        
      };
    
      const coverImageStyle = {
        width: '100%', // ширина обложки равна ширине карточки
        height: '280px', // фиксированная высота обложки
        objectFit: 'cover', // обрезка изображения по размеру контейнера
      };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {books.map(book => (
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
        >
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
      ))}
    </div>
  );
}

export default ResultSearchBooks;

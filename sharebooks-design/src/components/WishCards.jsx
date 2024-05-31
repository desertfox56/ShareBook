//Доделать {books.map((book) => (
import React,{useEffect,useState} from 'react';
import { Card, Col, Row,Typography, Image, Avatar,Button } from 'antd';
import { LockOutlined , UnlockOutlined , HeartOutlined ,DollarOutlined,GiftOutlined,ReadOutlined } from '@ant-design/icons';
import '../assets/css/Cards.css';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import ServantesAvatar from '../assets/img/migel-de-servantes.jpg';
import PictureRobinsonCrusoe from '../assets/img/RobinsonCrusoe.jpg';
import DefoeAvatar from '../assets/img/DanielDefoe.jpg';
//import PictureAncientGreekMythos from '../assets/img/AncientGreekMythos.jpg';
//import SchwabAvatar from '../assets/img/GustavSchwab.jpg';
import axios from 'axios';
//const { Title, Text } = Typography;
const { Meta } = Card;

function WishCards(){
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchWishBooks = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
              console.log('No token found, user is not authorized');
              return;
          }
            const headers = { Authorization: `JWT ${token}` };
            const WishListLibraryUrl ='${process.env.REACT_APP_API_URL}/myBooks/wishlist-library/';
            const response = await axios.get(WishListLibraryUrl, { headers });
            if (response.data && response.data.wish_books) {
              setBooks(response.data.wish_books);
            }
            
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    fetchWishBooks();
}, []);
     



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
    return(
      <Row gutter={16} className='Row2'>
        {books.map((book )  => ( 
      <Col span={8} key={book.id} style={{marginBottom:'5%'}}>
        <Card  bordered={false} style={cardStyle} className="custom-card2"
        cover={
          <Image
            alt="example"
            src={book.book.image ? `${process.env.REACT_APP_API_URL}${book.book.image}` : PictureDonQuxote}
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
      avatar={<Avatar src={book.book.avatar ? `${process.env.REACT_APP_API_URL}${book.book.avatar}` : ServantesAvatar} />}
      title={null}
      description={
        <div>
          <div style={{ marginBottom: '16px', display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            <Button  style={{ marginTop: '8px', display:'flex', flexDirection:'row', fontSize:'12px', textAlign:'center' }}>{book.book.author_name}</Button> {/* Кнопка автора */}
            <Button style={{ marginTop: '8px', display:'flex', flexDirection:'row', fontSize:'12px', textAlign:'center' }}>{book.book.genre_name}</Button> {/* Кнопка жанра */}
            <HeartOutlined style={{ fontSize: '170%', color:'red'}}/>
          </div>
          <div style={{ marginTop: '16px', marginBottom:'8px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold',color:'#1F1F1F' }}>
          {book.book.title}
      </div>
      <div style={{color:'#1F1F1F', textAlign:'justify'}}>
      {book.book.description}
        </div>
        </div>
      }
    />
        </Card>
      </Col>

))}
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
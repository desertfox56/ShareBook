import React from 'react';
import { Carousel } from 'antd';
import { Image } from 'antd';
import PictureHarryPotter from '../assets/img/HarryPotter.jpg';
import PictureDonQuxote from '../assets/img/Don Quixote.jpg';
import AizekAzimov from '../assets/img/AizekAzimov.jpeg';
import Dostoevsky from '../assets/img/Dostoevsky.jpg';
import '../assets/css/PersonalLibrary.css';
// Стили для контента карусели
const contentStyle = {
  height: '300px', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#364d79',
  textAlign: 'center',
  width: '878px',
  };
// Стили для изображений в карусели
const imageStyle = {
    objectFit: 'cover',
    height: '450px',
    width: '100%',  
  };

// Компонент для отображения популярных книг в карусели
function PopularBooks(){
    return(
        // Карусель с автоматическим воспроизведением
        <Carousel autoplay>
    <div className='HarryPotter' style={contentStyle}>
                <Image
                    style={imageStyle} 
                    src={PictureHarryPotter}
                    alt="Гарри Потер"
                    className='CarouselImage'
                />
                <h3>Гарри Потер Описание</h3>
            </div>

    <div className='DonQuxote' style={contentStyle}>
                <Image
                    style={imageStyle} 
                    src={PictureDonQuxote}
                    alt="Дон Кихот"
                />
                <h3>Дон Кихот Описание</h3>
            </div>
    <div className='AizekAzimov' style={contentStyle}>
    <Image
                    style={imageStyle} 
                    src={AizekAzimov}
                    alt="Великие научно-фантастические рассказы 1939"
                />
      <h3>Великие научно-фантастические рассказы 1939 описание</h3>
    </div>
    <div className='Dostoevsky' style={contentStyle}>
    <Image
                    style={imageStyle} 
                    src={Dostoevsky}
                    alt="Преступление и наказание"
                />
      <h3>Преступление и наказание описание</h3>
    </div>
  </Carousel>
    );
}
export default PopularBooks;
import React from 'react';
import { Carousel } from 'antd';
import { Image } from 'antd';
import PictureHarryPotter from '../assets/img/HarryPotter.jpg'
import PictureDonQuxote from '../assets/img/Don Quixote.jpg'
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

const imageStyle = {
    objectFit: 'cover',
    height: '50%',
    width: '50%',
    
  };

function PopularBooks(){
    return(
        <Carousel autoplay>
    <div className='HarryPotter' style={contentStyle}>
                <Image
                    style={imageStyle} 
                    src={PictureHarryPotter}
                    alt="Гарри Потер"
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
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
    );
}
export default PopularBooks;
import React from 'react';
import { Card, Row, Col, Typography, Image, List } from 'antd';
import Photo1 from '../assets/img/персональная онлайн-библиотека.jpg';
import Photo2 from '../assets/img/Покупайте книги выгодно.jpg';
import Photo3 from '../assets/img/Обменивайтесь книгами с друзьями.webp';
import Photo4 from '../assets/img/Добро пожаловать.jpg';
import '../assets/css/HomePage.css';
const { Title, Text } = Typography;

function Section({ imageSrc, headingText, children }) {
  return (
    <Col xs={24} sm={24} span={8} md={8} className="section-col">
      <Row gutter={16} justify="center" align="middle">
        <Col>
          <Image
             
            src={imageSrc}
            fallback="https://via.placeholder.com/150"
            alt="ShareBook About us"
            style={{ display: 'block', margin: '0 auto' }}
            className='SectionImage'
          />
        </Col>
        <Col span={24}>
          <Title level={4} style={{ textAlign: 'center' }}>{headingText}</Title>
          {typeof children === "string" ? <Text className="section-content">{children}</Text> : children}
        </Col>
      </Row>
    </Col>
  );
}

function About_us() {
  return (
    <Card  className="card-section">
      <Row justify="center" align="middle" className="welcome-section">
        <Image
          width={100}
          src={Photo4}
          fallback="https://via.placeholder.com/150"
          alt="ShareBook Logo"
          style={{ marginRight: '4rem' }}
        />
        <Title level={2} className="section-title">Добро пожаловать в ShareBook!</Title>
      </Row>
      <Row gutter={32} justify="center" className="section-row">
        <Section imageSrc={Photo1} headingText="Ваша персональная онлайн-библиотека." className="section-content">
          Наша платформа создана для того, чтобы предоставить вам комфортное пространство для чтения книг в интернете.
          Погрузитесь в мир литературы без границ и ограничений.
        </Section>
        <Section imageSrc={Photo2} headingText="Покупайте книги выгодно!">
          <List size="small" bordered={false} className="section-content">
            <List.Item>Платите меньше за книги</List.Item>
            <List.Item>Книги никогда не испортятся</List.Item>
            <List.Item>Нет затрат на доставку</List.Item>
          </List>
        </Section>
        <Section imageSrc={Photo3} headingText="Обменяйтесь книгами с друзьями.">
          Наша платформа не только предоставляет доступ к огромной коллекции книг, но и позволяет делиться своими книгами с друзьями и близкими.
          Откройте для себя новые произведения, рекомендованные друзьями, и дарите радость чтения своим близким.
        </Section>
      </Row>
    </Card>
  );
}

export default About_us;

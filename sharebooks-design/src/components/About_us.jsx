import React from 'react';
import { Card, Row, Col, Typography, Image, List } from 'antd';

const { Title, Text } = Typography;

function Section({ imageSrc, headingText, children }) {
  return (
    <Col span={8}>
      <Row gutter={16} justify="center" align="middle">
        <Col>
          <Image
            width={50}
            src={imageSrc}
            fallback="https://via.placeholder.com/150"
            alt="ShareBook About us"
            style={{ display: 'block', margin: '0 auto' }}
          />
        </Col>
        <Col span={24}>
          <Title level={4} style={{ textAlign: 'center' }}>{headingText}</Title>
          {typeof children === "string" ? <Text>{children}</Text> : children}
        </Col>
      </Row>
    </Col>
  );
}

function About_us() {
  return (
    <Card style={{ padding: '1.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Row justify="center" align="middle" style={{ marginBottom: '2.5rem' }}>
        <Image
          width={100}
          src="logo.svg"
          fallback="https://via.placeholder.com/150"
          alt="ShareBook Logo"
          style={{ marginRight: '4rem' }}
        />
        <Title level={2} style={{ marginTop: '1rem', marginLeft:'1rem', textAlign: 'center' }}>Добро пожаловать в ShareBook!</Title>
      </Row>
      <Row gutter={32} justify="center">
        <Section imageSrc="logo.svg" headingText="Ваша персональная онлайн-библиотека.">
          Наша платформа создана для того, чтобы предоставить вам комфортное пространство для чтения книг в интернете.
          Погрузитесь в мир литературы без границ и ограничений.
        </Section>
        <Section imageSrc="logo.svg" headingText="Покупайте книги выгодно!">
          <List size="small" bordered={false}>
            <List.Item>Платите меньше за книги</List.Item>
            <List.Item>Книги никогда не испортятся</List.Item>
            <List.Item>Нет затрат на доставку</List.Item>
          </List>
        </Section>
        <Section imageSrc="logo.svg" headingText="Обменяйтесь книгами с друзьями.">
          Наша платформа не только предоставляет доступ к огромной коллекции книг, но и позволяет делиться своими книгами с друзьями и близкими.
          Откройте для себя новые произведения, рекомендованные друзьями, и дарите радость чтения своим близким.
        </Section>
      </Row>
    </Card>
  );
}

export default About_us;

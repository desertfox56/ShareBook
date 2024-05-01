import React, { useState } from 'react';
import { Card, Input, Button, Form, Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import '../assets/css/PaymentForm.css';
const { Title } = Typography;

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log(formData);
    alert('Payment information submitted!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    return(
    <div className='PaymentForm' style={{ maxWidth: 400, margin: 'auto', marginBottom:'3%' }}>
      <Card title="Оплата" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Имя владельца карты">
            <Input 
              name="cardHolder" 
              value={formData.cardHolder} 
              onChange={handleChange} 
              placeholder='Ваше имя'
            />
          </Form.Item>
          <Form.Item label="Номер карты">
            <Input 
              name="cardNumber" 
              value={formData.cardNumber} 
              onChange={handleChange} 
              placeholder='XXXX XXXX XXXX XXXX '
            />
          </Form.Item>
          <Form.Item label="Дата окончания действия карты">
            <Input 
              name="expiryDate" 
              value={formData.expiryDate} 
              onChange={handleChange} 
              placeholder='MM / YY'
            />
          </Form.Item>
          <Form.Item label="CVV">
            <Input 
              name="cvv" 
              value={formData.cvv} 
              onChange={handleChange} 
              placeholder='_ _ _'
            />
          </Form.Item>
          <Divider />
          <Title level={4}>Стоимость платежа</Title>
          {/* Add price details here */}
          <Button type="primary" htmlType="submit" block><Link to="/PersonalLibrary/">
            Оплатить сейчас</Link>
          </Button>
        </Form>
      </Card>
    </div>
  );
}
  export default PaymentForm;
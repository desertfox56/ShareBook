import React, {useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../assets/css/login.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
const LogIn=()=>{
  const navigate = useNavigate();
  const onFinish = async (values) => {

    console.log('Form values:', values); // Добавляем эту строку
    try {
      // Отправляем запрос на Django API для получения токенов
      const response = await axios.post('http://localhost:8000/api/users/api/token/', values, { withCredentials: true });
      console.log('Login successful', response.data);

      // Получаем токен доступа из ответа
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // Декодируем токен доступа, чтобы извлечь id пользователя
      const decoded = jwtDecode(accessToken);
      console.log('User ID is: ', decoded.id);

      // Сохраняем токен доступа и id пользователя в localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', decoded.id);
      localStorage.setItem('RefreshToken', refreshToken);

      alert('Вы вошли успешно!');
      navigate('/SuccessPage');
    } catch (error) {
      // Обработка ошибок
      // Обработка ошибок
  console.error('Error logging in:', error);

  if (error.response) {
    // Ответ от сервера с ошибкой
    console.error('Response status:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    // Запрос был отправлен, но нет ответа
    console.error('No response received. Request:', error.request);
  } else {
    // Произошла ошибка при настройке запроса
    console.error('Error setting up request:', error.message);
  }
    }
  };

    return(
      <div className='form' >
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish} // Добавляем функцию onFinish
      >
        <Form.Item 
          label="E-mail"
          name={[ 'email']}
          rules={[{ required: true, message: 'Пожалуйста введите свою почту',type: 'email' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Пароль"
          name={[ 'password']}
          rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox>Запомнить меня</Checkbox> 
          
          <Link className="login-form-forgot" to="/reset_password/">Забыл пароль?</Link></div>
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button type="primary" style={{marginRight: '2%'}} htmlType="submit" onClick={onFinish}> Войти</Button>
          Или <Link to="/Registration/" style={{marginLeft:'2%'}} >Зарегистрироваться</Link></div>
        </Form.Item>
      </Form>
      </div>
    );
}
//Авторизация сейчас происходит через нажатие enter, а черезнажатие кнопки Войти просто происходит переадресация на страницу успеха. Исправить это
export default LogIn;
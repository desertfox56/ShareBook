import React, {useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../assets/css/login.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//Валидация полей авторизации
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

//Функция  формы авторизации
const LogIn=()=>{
  const navigate = useNavigate(); // Хук для навигации
  // Обработчик отправки формы
  const onFinish = async (values) => {
    try {
      // Отправляем запрос на Django API для получения токенов
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/api/token/`, values, { withCredentials: true });
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
        onFinish={onFinish} 
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
    <div className='BottomPartForm'>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='basic_remember'>
          <Checkbox>Запомнить меня</Checkbox> 
          
          <Link className="login-form-forgot" to="/reset_password/">Забыл пароль?</Link></div>
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='ButtonORRegistartion'>
          <Button type="primary" style={{marginRight: '4%'}} htmlType="submit" onClick={onFinish} className='ButtonForm'> Войти</Button>
          Или <Link to="/Registration/" style={{marginLeft:'4%'}} >Зарегистрироваться</Link></div>
        </Form.Item></div>
      </Form>
      </div>
    );
}

export default LogIn;
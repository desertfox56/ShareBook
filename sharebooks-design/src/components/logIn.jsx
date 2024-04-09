import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../assets/css/login.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
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

function LogIn(){

  const onFinish = async (values) => {

    console.log('Form values:', values); // Добавляем эту строку
    try {
      // Отправляем запрос на Django API для получения токенов
      const response = await axios.post('http://localhost:8000/api/users/api/token/', values, { withCredentials: true });
      console.log('Login successful', response.data);

      // Получаем токен доступа из ответа
      const accessToken = response.data.access;

      // Декодируем токен доступа, чтобы извлечь id пользователя
      const decoded = jwtDecode(accessToken);
      console.log('User ID is: ', decoded.id);

      // Сохраняем токен доступа и id пользователя в localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', decoded.id);

      alert('Login successful!');
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
          label="Login"
          name={[ 'email']}
          rules={[{ required: true, message: 'Please input your email',type: 'email' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Password"
          name={[ 'password']}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
    
        <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="/Registration/">register now!</a>
        </Form.Item>
      </Form>
      </div>
    );
}

export default LogIn;
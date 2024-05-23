import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';

const { Option } = Select;
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
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

function Registration(){
  const navigate=useNavigate();
 const onFinish = async (values) => {

    console.log('Form values:', values); // Добавляем эту строку
    try {
        // Отправляем запрос на Django API для регистрации и получения токена
        const response = await axios.post('http://localhost:8000/api/users/register/', values, { withCredentials: true });
        
        if (response.status === 200) {
          console.log('Registration successful', response.data);
          
          // Получаем токен из ответа
          const accessToken = response.data.access;
      
          // Декодируем токен доступа, чтобы извлечь id пользователя
      const decoded = jwtDecode(accessToken);
      console.log('User ID is: ', decoded.id);

      // Сохраняем токен доступа и id пользователя в localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', decoded.id);
      
          // Выводим алерт об успешной регистрации
          alert('Вы успешно зарегистрировались!');
          navigate('/login');
        } else {
          // Обработка ошибок при регистрации
          console.error('Registration failed:', response.status, response.data);
          // Дополнительные операции при неудачной регистрации
        }
      } catch (error) {
        // Обработка ошибок
        console.error('Error during registration:', error);
      
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
        <div className='form'>
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
          rules={[{ required: true, message: 'Пожалуйста введите свою почту!',type: 'email' }]}
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
        label="Имя"
        name={[ 'first_name']}
        tooltip="Как бы вы хотели чтобы вас называли другие?"
        rules={[{ required: false, message: 'Пожалуйста введите имя!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name={[ 'second_name']}
        tooltip="Как бы вы хотели чтобы вас называли другие?"
        rules={[{ required: false, message: 'Пожалуйста введите фамилию', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Отчество"
        name={[ 'patronymic']}
        tooltip="Как бы вы хотели чтобы вас называли другие?"
        rules={[{ required: false, message: 'Пожалуйста введите отчество!', whitespace: true }]}
      >
        <Input />
      </Form.Item>


      <Form.Item label="Captcha" extra="Мы должны убедиться, что вы человек">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: false, message: 'Пожалуйста введите captcha!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Получить captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Вы должны ознакомиться с соглашением')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Я прочитал <a href="">соглашение</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" style={{textAlign:'center'}} htmlType="submit">
        Зарегистрироваться
        </Button>
      </Form.Item>
      </Form>
      </div>
    );

}

export default Registration;
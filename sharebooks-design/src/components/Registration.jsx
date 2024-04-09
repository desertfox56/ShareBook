import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
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
          alert('Registration successful!');
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
        label="First name"
        name={[ 'first_name']}
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Second name"
        name={[ 'second_name']}
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Patronymic"
        name={[ 'patronymic']}
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>


      <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: false, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      </Form>
      </div>
    );

}

export default Registration;
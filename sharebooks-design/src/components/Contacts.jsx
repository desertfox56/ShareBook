import React,{useState} from 'react';
import { Alert, Form, Input,Button,Checkbox } from 'antd';
import axios from 'axios';
import UserAgreementModal from './UserAgreement';
const { TextArea } = Input;
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

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

function AppContacts(){
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(`${process.env.REACT_APP_API_URL}/users/feedback/`, {
        name: values.user.name,
        email: values.user.email,
        subject: "Sharebook", // subject статичен
        message: values.user.introduction
    })
    .then(response => {
        alert('Сообщение успешно отправлено!');
        console.log('Response:', response.data);
    })
    .catch(error => {
        alert('Ошибка при отправке сообщения: ' + error.message);
        console.error('Error:', error);
    });
};

    return(
      <div className='Contacts'>
        <Form name="trigger"  layout="vertical" onFinish={onFinish} autoComplete="off" className='ContactsForm' validateMessages={validateMessages}>
    <Alert message="Напишите нам, если остались вопросы" style={{marginBottom:'2%'}} />

    <Form.Item
    className='ContactsItem'
      hasFeedback
      label="Ваше Имя"
      name={['user', 'name']}
      validateDebounce={1000}
      rules={[{ required: true, message: 'Введите ваше имя!', max: 50 }]}
    >
      <Input placeholder="Как к вам обращаться?" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Email"
      name={['user', 'email']}
      validateDebounce={1000}
      rules={[{ type: 'email', required: true, message: 'Введите корректный email!' }]}
    >
      <Input placeholder="Ваш email" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Вопрос"
      name={['user', 'introduction']}
      validateDebounce={1000}
      rules={[{ required: true, message: 'Введите ваш вопрос!', min: 5, max: 300 }]}
    >
       <TextArea rows={4} />
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
      ><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%' }}>
        
        <Checkbox onChange={e => setFormData({ ...formData, agreement: e.target.checked })}>
          Я прочитал <a onClick={() => setModalVisible(true)}>соглашение</a>
        </Checkbox>
        <Button type="primary" className="SubmitButton" htmlType="submit">
        Отправить
      </Button>
      <UserAgreementModal
          visible={modalVisible}
          setVisible={setModalVisible}
         
        />
      </div>
        </Form.Item>
  </Form></div>
    );
}

export default AppContacts;
import React from 'react';
import { Alert, Form, Input,InputNumber,Button } from 'antd';

const { TextArea } = Input;

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

function AppContacts(){
    return(
      <div className='Contacts'>
        <Form name="trigger"  layout="vertical" autoComplete="off" className='ContactsForm'>
    <Alert message="Напишите нам, если остались вопросы" style={{marginBottom:'2%'}} />

    {/*<Form.Item
      hasFeedback
      label="Field A"
      name="field_a"
      validateTrigger="onBlur"
      rules={[{ max: 3 }]}
    >
      <Input placeholder="Validate required onBlur" />
    </Form.Item>*/}

    <Form.Item
      hasFeedback
      label="Ваше Имя"
      name={['user', 'name']}
      validateDebounce={1000}
      rules={[{ max: 20,required: true }]}
    >
      <Input placeholder="Как к вам обращаться?" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Email"
      name={['user', 'email']}
      validateDebounce={1000}
      rules={[{ max: 3,type: 'email' }]}
    >
      <Input placeholder="Ваш email" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Вопрос"
      name={['user', 'introduction']}
      validateDebounce={1000}
      rules={[{ max: 3 }]}
    >
       <TextArea rows={4} />
    </Form.Item>

    
      <Button type="primary"  htmlType="submit">
        Отправить
      </Button>
    
    {/*<Form.Item
      hasFeedback
      label="Field C"
      name="field_c"
      validateFirst
      rules={[{ max: 6 }, { max: 3, message: 'Continue input to exceed 6 chars' }]}
    >
      <Input placeholder="Validate one by one" />
  </Form.Item>*/}
  </Form></div>
    );
}

export default AppContacts;
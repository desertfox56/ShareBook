//Пользователь нажимает на кнопку сбросить пароль, расположенную в card->срабатывает modal->пользователь вводит код otp->modal сбрасывает пароль и успешно уведомляет пользователя что пароль сброшен
import React,  { useState } from 'react';
import { Card,Button, Modal,Input,Alert } from 'antd';
import '../assets/css/ResetPassword.css';
import axios from 'axios';

const ResetPasswordForm=()=>{

    // Состояния компонента
    const [email, setEmail] = useState(''); // Почта
    const [otp, setOtp] = useState(''); // OTP 
    const [newPassword, setNewPassword] = useState(''); // Новый пароль
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для видимости модального окна
    const [open, setOpen] = useState(false); //Состояние для управления модальным окном
    const [step, setStep] = useState(1); //Состояние для отслеживания текущего шага (1 - ввод почты, 2 - ввод OTP и нового пароля)
    const [alertInfo, setAlertInfo] = useState({ type: '', message: '', visible: false }); // Состояние для отображения сообщений об ошибках и успехах
    // Функция для отображения модального окна
    const showModal = () => {
      setOpen(true);
    };
    // Функция для скрытия модального окна
    const handleCancel = () => {
      setOpen(false);
    };
    // Функция для отправки запроса на сброс пароля
    const sendResetRequest = async () => {
        try {
          const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log('No token found, user is not authorized');
                return;
            }
            const headers = { Authorization: `JWT ${token}` };
              
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset_password/`, { email },{headers});
          console.log(response.data);
          if (response.status === 200) {
            // Email отправлен успешно
            setAlertInfo({ type: 'success', message: 'Email sent successfully. Check your inbox for the OTP.', visible: true });
            setStep(2); // Переходим к следующему шагу
          }
          // Показать модальное окно для ввода OTP
          setIsModalVisible(true);
        } catch (error) {
          console.error(error);
          setAlertInfo({ type: 'error', message: 'Failed to send email. Try again later.', visible: true });
        }
      };

    // Функция для сброса пароля
    const resetPassword = async () => {
        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/reset_password/`, {
            email,
            otp,
            new_password: newPassword,
          });
          console.log(response.data);
          // Закрываем модальное окно и очищаем форму
          if (response.status === 200) {
            setAlertInfo({ type: 'success', message: 'Password has been reset successfully.', visible: true });
            setIsModalVisible(false);
            setEmail('');
            setOtp('');
            setNewPassword('');
          }
          
         }catch (error) {
          console.error(error);
          setAlertInfo({ type: 'error', message: 'Failed to reset password. Check the OTP and try again.', visible: true });
        }
      };
    return(
        
        <Card title="Сбросить пароль?" className='Card_title'>
             
    <Card type="inner" title="Привет, user" className='Card_content'>
    Нужно сбросить пароль? Без проблем!<br></br>Просто нажмите кнопку ниже и
    ты следуй дальнейшим шагам. Если вы не отправляли этот запрос, 
    проигнорируйте это письмо.
    </Card>
    
    <Button type="primary" className='Button_sbrosit' onClick={showModal}>Сбросить пароль</Button>
    {/* Модальное окно */}
    <Modal
  open={open}
  title={step === 1 ? "Забыли пароль?" : "Введите код из письма"}
  onOk={step === 1 ? sendResetRequest : resetPassword}
  onCancel={handleCancel}
  footer={null} 
> 
  {
    step === 1 ?
    (
      <div className='Step1'> {/* Шаг1 */}
        <p>Если вы забыли пароль, то можете легко восстановить его. Просто напишите ниже свою почту и мы отправим туда код восстановления</p>
        <Input placeholder="Ваш email" className='input_modal' onChange={(e) => setEmail(e.target.value)}/>
        <Button className='button_modal' onClick={sendResetRequest}>Отправить</Button>
        
      </div>
    ) : (
      <> {/* Шаг2 */}
        <Input placeholder="Enter OTP" className='input_modal' onChange={(e) => setOtp(e.target.value)} />
        <Input placeholder="Enter new password" type="password" className='input_modal' onChange={(e) => setNewPassword(e.target.value)} />
        <Button className='button_modal' onClick={resetPassword}>Сбросить пароль</Button>
      </>
    )
  }
</Modal> {/* Alert компонент*/}
{alertInfo.visible && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo({ ...alertInfo, visible: false })}
          showIcon
          closable
          style={{ marginBottom: '16px', zIndex: 1000, position: 'absolute', top: 0, right: 0 }} 
        />
      )}
  </Card>
    );
}
export default ResetPasswordForm;
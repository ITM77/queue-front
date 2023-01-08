import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
// import jwtDecode from 'jwt-decode';
// import { verifyApi } from '../../http/auth';
import { isAuthAC, isOtpAC, isSpinAC } from '../../store/reducers/appReducer';
import openNotification from '../../utils/openNotification';

const { Title, Text } = Typography;

function OtpCode() {
  const dispatch = useDispatch();
  const onFinish = async () => {
    try {
      dispatch(isSpinAC(true));
      // const query = {
      //   code: values.code,
      // };
      //
      // const data = await verifyApi(query);
      //
      // if (data.data) {
      //   const tokenData = jwtDecode(data.data.access);
      //   localStorage.setItem('at', data.data.access);
      //   localStorage.setItem('rt', data.data.refresh);
      //   dispatch(userAC(tokenData));
      //   dispatch(isAuthAC(true));
      // }
      setTimeout(() => {
        dispatch(isSpinAC(false))
      }, 2000)
    } catch (e) {
      openNotification('error', `Неправильный логин или пароль`);
    } finally {
      // dispatch(isSpinAC(false));
    }
  };

  return (
    <Form name='optCode' onFinish={onFinish} autoComplete='off'>
      <Title style={{ marginBottom: '30px', marginTop: '10px' }} level={2}>
        Код подтверждения
      </Title>

      <Form.Item name='code' rules={[{ required: true, message: 'Введите код подтверждения!' }]}>
        <Input placeholder='Код' />
      </Form.Item>

      <Form.Item>
        <Text type='secondary'>Для защиты Вашего профиля мы отправим код подтверждения на Ваш телефоный номер</Text>
      </Form.Item>

      <Form.Item>
        <div className='flex justify-end'>
          <Button type='primary' htmlType='submit'>
            Войти в систему
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default OtpCode;

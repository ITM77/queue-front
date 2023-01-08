import { Button, Checkbox, Form, Input, Typography } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
// import { loginApi } from '../../http/auth'
import { isSpinAC, isOtpAC } from '../../store/reducers/appReducer'
import openNotification from '../../utils/openNotification'

const { Title } = Typography
function Login() {
  const dispatch = useDispatch()

  const onFinish = async () => {
    try {
      dispatch(isSpinAC(true))
      // const query = {
      //   username: values.username,
      //   password: values.password,
      // }
      //
      // const data = await loginApi(query)
      //
      // if (data.data) {
      //   localStorage.setItem('at', data.data.access)
      //   dispatch(isOtpAC(true))
      // }
      setTimeout(() => {
        dispatch(isOtpAC(true))
        dispatch(isSpinAC(false))
      }, 2000)
    } catch (e) {
      openNotification('error', `Неправильный логин или пароль`)
    } finally {
      // dispatch(isSpinAC(false))
    }
  }

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title
        style={{ marginBottom: '30px', marginTop: '10px', textAlign: 'center' }}
        level={2}
      >
        Вход
      </Title>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Обязательное поле!' }]}
      >
        <Input placeholder="Логин" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Обязательное поле!' },
          { min: 8, message: 'Поле должно быть не менее 8 символов!' },
        ]}
      >
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Войти в систему
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default Login

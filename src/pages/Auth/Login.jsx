import { Button, Checkbox, Form, Input, Typography } from 'antd'
import React from 'react'
import {useDispatch} from 'react-redux'
import { loginApi } from '../../http/auth'

const { Title } = Typography
function Login() {
  const dispatch = useDispatch()

  const onFinish = async (value) => {

    const query = {
      username: value.username,
      password: value.password
    }

    dispatch(loginApi(query))
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
          { min: 4, message: 'Поле должно быть не менее 8 символов!' },
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

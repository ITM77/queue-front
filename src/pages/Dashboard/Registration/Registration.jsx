import React from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { createUserApi } from '../../../http/user'

function Registration() {
  const [form] = Form.useForm();
  const user = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  }

  const createUser = (value) => {
    const response = createUserApi(value)
    console.log(response);
  }
  return (
    <div>
      <h1 className='text-lg'>Регистрация</h1>
      <Divider />
      <Form
        form={form}
        onFinish={createUser}
        autoComplete="off"
      >
        <div>
          <div className='grid grid-cols-2 gap-7'>
            <div>
              <p>Имя:</p>
              <Form.Item
                name="firstname"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.firstname = e.target.value
                }} placeholder='Имя'/>
              </Form.Item>
            </div>

            <div>
              <p>Фамилия:</p>
              <Form.Item
                name="lastname"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.lastname = e.target.value
                }} placeholder='Имя'/>
              </Form.Item>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-7'>
            <div>
              <p>Имя пользователя:</p>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.username = e.target.value
                }} placeholder='Имя пользователя'/>
              </Form.Item>
            </div>

            <div>
              <p>Пароль:</p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.password = e.target.value
                }} placeholder='Пароль'/>
              </Form.Item>
            </div>
          </div>
          <Form.Item className="mt-5">
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
            </div>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
}

export default Registration;

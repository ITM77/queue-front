import React from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createUserApi } from '../../../http/user'

function Registration() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const user = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  }

  const createUser = (value) => {
    form.resetFields();
    dispatch(createUserApi(value))
  }
  return (
    <div>
      <Divider />
      <Form
        form={form}
        onFinish={createUser}
        autoComplete="off"
      >
        <div>
          <div className='grid grid-cols-2 gap-7'>
            <div>
              <p>{t('Name')}</p>
              <Form.Item
                name="firstname"
                rules={[{ required: true, message: t('Required') }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.firstname = e.target.value
                }} placeholder={t('Name')}/>
              </Form.Item>
            </div>
            <div>
              <p>{t('Username')}</p>
              <Form.Item
                name="username"
                rules={[{ required: true, message: t('Required') }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.username = e.target.value
                }} placeholder={t('Username')}/>
              </Form.Item>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-7'>
            <div>
              <p>{t('Lastname')}</p>
              <Form.Item
                name="lastname"
                rules={[{ required: true, message: t('Required') }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.lastname = e.target.value
                }} placeholder={t('Lastname')}/>
              </Form.Item>
            </div>

            <div>
              <p>{t('Password')}</p>
              <Form.Item
                name="password"
                rules={[{ required: true, message: t('Required') }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  user.password = e.target.value
                }} placeholder={t('Password')}/>
              </Form.Item>
            </div>
          </div>
          <Form.Item className="mt-5">
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                {t('Create')}
              </Button>
            </div>
          </Form.Item>
        </div>

      </Form>
    </div>
  );
}

export default Registration;

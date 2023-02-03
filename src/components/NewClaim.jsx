import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { newClaimApi } from '../http/claims';
import { isSpinAC } from '../store/reducers/appReducer';
import { getClaimTypesApi } from '../http/claimTypes';

function NewClaim() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  const claimTypes = useSelector(state => state.appReducer.claimTypes);
  const [claim, setClaim] = useState({
    name: '',
    formType: '',
    number: '',
    claimTypeId: ''
  })

  const newApplicationModalOpen = () => {
    setIsNewApplicationModalOpen(true);
  };

  const newApplicationModalOk = async () => {
    dispatch(isSpinAC(true))
    dispatch(newClaimApi(claim))
    setIsNewApplicationModalOpen(false)
    form.resetFields();
  }

  const newApplicationModalCancel = () => {
    setIsNewApplicationModalOpen(false)
  }

  const getClaimTypes = (value) => {
    setClaim({...claim,  formType: value })
    claim.claimTypeId = value
    dispatch(getClaimTypesApi(value))
  }

  return (
      <div>
        <Button onClick={newApplicationModalOpen}>Новая заявка</Button>
        <Modal footer={null} width={550} title="Новая заявка" okText='Создать' cancelText='Отмена' open={isNewApplicationModalOpen} onCancel={newApplicationModalCancel}>
          <Form
              form={form}
              onFinish={newApplicationModalOk}
              autoComplete="off"
          >
            <div>
              <p>ID:</p>
              <Form.Item
                name="id"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="number" onChange={(e) => {
                  setClaim({...claim,  number: e.target.value })
                }} placeholder='ID'/>
              </Form.Item>
            </div>
            <div>
              <p>Наименование компании:</p>
              <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Обязательное поле!' }]}
                  className="mb-2"
              >
                <Input onChange={(e) => {
                  setClaim({...claim,  name: e.target.value })
                }} placeholder='Наименование компании'/>
              </Form.Item>
            </div>
            <div>
              <p>Тип лица:</p>
              <Select className='w-full'
                options={[
                  {
                    value: '1',
                    label: 'Физическое лицо',
                  },
                  {
                    value: '2',
                    label: 'Юридическое лицо',
                  },
                ]}
                onChange={(value) => {
                  getClaimTypes(value)
                }}
              />
            </div>
            <div className='mt-3'>
              <p>Тип заявки:</p>
              <Select className='w-full'
                options={claimTypes}
                onChange={(value) => {
                  setClaim({...claim,  claimTypeId: value })
                }}
              />
            </div>
            <Form.Item className="mt-5">
              <div className="flex justify-end">
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default NewClaim;

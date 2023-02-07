import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { newClaimApi } from '../http/claims';
import { getClaimTypesApi } from '../http/claimTypes';

function NewClaim() {
  const { t } = useTranslation();
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
        <Button type='primary' onClick={newApplicationModalOpen}>{t('newClaim')}</Button>
        <Modal footer={null} width={550} title={t('newClaim')} okText={t('create')} cancelText={t('cancel')} open={isNewApplicationModalOpen} onCancel={newApplicationModalCancel}>
          <Form
              form={form}
              onFinish={newApplicationModalOk}
              autoComplete="off"
          >
            <div>
              <p>{t('claimNumber')}</p>
              <Form.Item
                name="number"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  setClaim({...claim,  number: e.target.value })
                }} placeholder={t('claimNumber')}/>
              </Form.Item>
            </div>
            <div>
              <p>{t('company')}</p>
              <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Обязательное поле!' }]}
                  className="mb-2"
              >
                <Input onChange={(e) => {
                  setClaim({...claim,  name: e.target.value })
                }} placeholder={t('company')}/>
              </Form.Item>
            </div>
            <div>
              <p>{t('formType')}</p>
              <Form.Item
                name="formType"
                className="mb-2"
              >
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
              </Form.Item>
            </div>
            <div className='mt-3'>
              {t('claimType')}
              <Form.Item
                name="claimType"
                className="mb-2"
              >
              <Select className='w-full'
                options={claimTypes}
                onChange={(value) => {
                  setClaim({...claim,  claimTypeId: value })
                }}
              />
              </Form.Item>
            </div>
            <Form.Item className="mt-5">
              <div className="flex justify-end">
                <Button type="primary" htmlType="submit">
                  {t('create')}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
}

export default NewClaim;

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
  const claimTypes = useSelector(state => state.claimTypes.claimTypes);
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
        <Button className='green-6' type='primary' onClick={newApplicationModalOpen}>{t('newClaim')}</Button>
        <Modal footer={null} width={550} title={t('newClaim')} okText={t('create')} cancelText={t('cancel')} open={isNewApplicationModalOpen} onCancel={newApplicationModalCancel}>
          <Form
              form={form}
              onFinish={newApplicationModalOk}
              autoComplete="off"
          >
            <div>
              <Form.Item
                name="number"
                rules={[{ required: true, message: t('required') }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  setClaim({...claim,  number: e.target.value })
                }} placeholder={t('claimNumber')}/>
              </Form.Item>
            </div>
            <div className='mt-5'>
              <Form.Item
                  name="name"
                  rules={[{ required: true, message: t('required') }]}
                  className="mb-2"
              >
                <Input onChange={(e) => {
                  setClaim({...claim,  name: e.target.value })
                }} placeholder={t('company')}/>
              </Form.Item>
            </div>
            <div className='mt-5'>
              <Form.Item
                name="formType"
                rules={[{ required: true, message: t('required') }]}
              >
              <Select className='w-full' placeholder={t('selectFormType')}
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
              <Form.Item
                name="claimType"
                rules={[{ required: true, message: t('required') }]}
              >
              <Select className='w-full'
                placeholder={t('selectClaimType')}
                options={claimTypes}
                onChange={(value) => {
                  setClaim({...claim,  claimTypeId: value })
                }}
              />
              </Form.Item>
            </div>
            <div className='flex justify-end mt-5'>
              <Button type="primary" htmlType="submit">
                {t('create')}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
  );
}

export default NewClaim;

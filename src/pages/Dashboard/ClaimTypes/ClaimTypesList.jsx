import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createClaimTypesApi, deleteClaimTypesApi, getClaimTypesApi } from '../../../http/claimTypes';

function ClaimTypesList() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const claimTypes = useSelector(state => state.appReducer.claimTypes);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteClaim, setDeleteClaim] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const claimType = {
    formType: '',
    label: '',
    name: ''
  }

  const showDeleteModal = (e, item) => {
    e.stopPropagation();
    setDeleteClaim(item)
    setIsDeleteModalOpen(true);
  };

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteClaimType = () => {
    dispatch(deleteClaimTypesApi(deleteClaim.value))
    setIsDeleteModalOpen(false);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const createClaimType = () => {
    dispatch(createClaimTypesApi(claimType))
    setIsModalOpen(false);
    form.resetFields();
  }

  const getClaimTypes = (type) => {
    dispatch(getClaimTypesApi(type))
  }

  const editClaim = (item) => {
    navigate(`edit/${item.value}`)
  }

  useEffect(() => {
    dispatch(getClaimTypesApi(1))
  }, [])

  const columns = [
    {
      title: t('title'),
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}><DeleteOutlined style={{fontSize: '18px'}}/></Button>,
    },
  ]

  return (
    <div>
      <div className='flex justify-between'>
        <Select className='w-full mb-5'
          onChange={(value) => {
            getClaimTypes(value)
          }}
          defaultValue="1"
          style={{
            width: '250px',
          }}
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
        />
        <Button type='primary' onClick={showModal}>{t('create')}</Button>
      </div>

      <Table
        rowKey="name"
        columns={columns}
        dataSource={claimTypes}
        onRow={(record) => ({
          onClick: () => {editClaim(record)}
        })}
      />
      <Modal footer={null} open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <div className='flex items-center'>
          <QuestionCircleOutlined
            style={{
              color: 'red',
              fontSize: '24px'
            }}
          /> <p className='ml-3 text-base font-bold'>{t('sure')}</p>
        </div>
        <p className='mt-5'>{t('confirmDelete')}</p>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={deleteClaimType}>{t('delete')}</Button>
        </div>
      </Modal>
      <Modal footer={null} title={t('createClaimType')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Form
            form={form}
            onFinish={createClaimType}
            autoComplete="off"
          >
            <div>
              <Form.Item
                name="formType"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Select className='w-full' defaultValue="1"
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
                    claimType.formType = value
                  }}
                />
              </Form.Item>
            </div>
            <div className='mt-7'>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  claimType.label = e.target.value
                }} placeholder={t('claimType')}/>
              </Form.Item>
            </div>
            <div className='flex justify-end mt-5'>
              <Button type="primary" htmlType="submit">
                {t('create')}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ClaimTypesList;

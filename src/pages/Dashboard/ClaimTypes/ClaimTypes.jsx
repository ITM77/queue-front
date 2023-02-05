import React, { useEffect, useState } from 'react';
import { Divider, Input, Select, Button, Modal, Table, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { selectedClaimTypesAC } from '../../../store/reducers/appReducer'
import {
  createClaimTypesApi,
  getClaimTypesApi,
  deleteClaimTypesApi, editClaimTypesApi, getClaimTypeByIdApi,
} from '../../../http/claimTypes';
import { getAllDocTypesApi } from '../../../http/docTypes';

function ClaimTypes() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteClaim, setDeleteClaim] = useState('')
  const claimTypes = useSelector(state => state.appReducer.claimTypes);
  const documentTypes = useSelector(state => state.appReducer.documentTypes);
  const selectedClaimTypes = useSelector(state => state.appReducer.selectedClaimTypes);

  const [selectedDocs, setSelectedDocs] = useState([])

  const [editedClaim, setEditedClaim] = useState({
    id: '',
    label: ''
  })

  const claimType = {
    formType: '',
    label: '',
    name: ''
  }

  const showEditModal = (item) => {
    setEditedClaim({ ...editedClaim, label: item.label, id: item.value } )
    setIsEditModalOpen(true);
    dispatch(getClaimTypeByIdApi(item.value))
  };
  const editHandleOk = () => {
    setIsEditModalOpen(false);
  };
  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };
  const editClaimType = () => {
    dispatch(editClaimTypesApi(editedClaim.id, { label: editedClaim.label, documentTypesIds: selectedDocs }))
    setIsEditModalOpen(false)
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
  }
  const getClaimTypes = (type) => {
    dispatch(getClaimTypesApi(type))
  }

  const handleChange = (value) => {
    dispatch(selectedClaimTypesAC(value))
    setSelectedDocs(value)
  };

  useEffect(() => {
    dispatch(getClaimTypesApi(1))
    dispatch(getAllDocTypesApi())
  }, [])

  const columns = [
    {
      title: t('claimType'),
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}>{t('delete')}</Button>,
    },
  ]

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>
          {t('claimType')}
        </h1>
        <Button type='primary' onClick={showModal}>{t('create')}</Button>
      </div>
      <Divider />

      <div>
        <Select className='w-full'
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
      </div>

      <div className='mt-5'>
        <Table
          rowKey="name"
          columns={columns}
          dataSource={claimTypes}
          onRow={(record) => ({
            onClick: () => {showEditModal(record)}
          })}
        />
      </div>

      <Modal footer={null} title={t('createClaimType')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Form
            form={form}
            onFinish={createClaimType}
            autoComplete="off"
          >
          <div>
            <p>{t('formType')}</p>
            <Form.Item
              name="formType"
              rules={[{ required: true, message: 'Обязательное поле!' }]}
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
                claimType.formType = value
              }}
            />
            </Form.Item>
          </div>
          <div className='mt-3'>
            <p>{t('claimType')}</p>
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
          <Form.Item>
            <div className='flex justify-end'>
              <Button type="primary" htmlType="submit">
                {t('create')}
              </Button>
            </div>
          </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal footer={null} title={t('editClaimType')} open={isEditModalOpen} onOk={editHandleOk} onCancel={editHandleCancel}>
        <div className='mt-5'>
          <p>{t('claimType')}</p>
          <Input
            value={editedClaim.label}
            onChange={(e) => {
              setEditedClaim({ ...editedClaim, label: e.target.value});
            }}
            placeholder={t('claimType')}
          />
        </div>
        <div className='mt-5'>
          <Select
            showArrow
            value={selectedClaimTypes}
            mode="multiple"
            style={{
              width: '100%',
            }}
            onChange={handleChange}
            options={documentTypes}
          />
        </div>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={editClaimType}>{t('edit')}</Button>
        </div>
      </Modal>

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
    </div>
  );
}

export default ClaimTypes;

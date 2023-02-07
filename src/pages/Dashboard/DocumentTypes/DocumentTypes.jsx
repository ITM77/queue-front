import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Table, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  createDocumentTypesApi,
  deleteDocumentTypesApi,
  editDocumentTypesApi,
  getAllDocTypesApi,
} from '../../../http/docTypes';

function DocumentTypes() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const documentTypes = useSelector(state => state.appReducer.documentTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletedDoc, setDeletedDoc] = useState('')

  const [editedDoc, setEditedDoc] = useState({
    id: '',
    label: ''
  })

  const [document, setDocument] = useState({
    name: '',
    label: '',
    claimTypeId: ''
  })

  const showEditModal = (item) => {
    setEditedDoc({ ...editedDoc, label: item.label, id: item.value } )
    setIsEditModalOpen(true);
  };
  const editHandleOk = () => {
    setIsEditModalOpen(false);
  };
  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (e, item) => {
    e.stopPropagation();
    setDeletedDoc(item)
    setIsDeleteModalOpen(true);
  };
  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteDocumentType = () => {
    dispatch(deleteDocumentTypesApi(deletedDoc.value))
    setIsDeleteModalOpen(false);
  }

  const createDocumentType = () => {
    dispatch(createDocumentTypesApi(document))
    setIsModalOpen(false);
    form.resetFields();
  }

  const editDocumentType = () => {
    dispatch(editDocumentTypesApi(editedDoc.id, { label: editedDoc.label }))
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    dispatch(getAllDocTypesApi())
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
        <h1 className='text-lg'>{t('documentType')}</h1>
        <Button type='primary' onClick={showModal}>{t('create')}</Button>
      </div>
      <Divider />
      <Table
        rowKey='name'
        columns={columns}
        dataSource={documentTypes}
        onRow={(record) => ({
          onClick: () => {showEditModal(record)}
        })}
      />

      <Modal centered width={700} footer={null} title={t('createDocumentType')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Form
            form={form}
            onFinish={createDocumentType}
            autoComplete="off"
          >
            <div>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  setDocument({...document,  label: e.target.value })
                }} placeholder={t('documentType')}/>
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

      <Modal width={700} footer={null} title={t('editDocumentType')} open={isEditModalOpen} onOk={editHandleOk} onCancel={editHandleCancel}>
        <div className='mt-5'>
          <Input
            value={editedDoc.label}
            onChange={(e) => {
              setEditedDoc({ ...editedDoc, label: e.target.value
            });
            }}
            placeholder={t('documentType')}
          />
        </div>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={editDocumentType}>{t('edit')}</Button>
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
          <Button type='primary' onClick={deleteDocumentType}>{t('delete')}</Button>
        </div>
      </Modal>

    </div>
  );
}

export default DocumentTypes;

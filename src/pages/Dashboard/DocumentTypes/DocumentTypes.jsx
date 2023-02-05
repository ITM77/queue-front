import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Table, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
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
      title: 'Название',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}>Delete</Button>,
    },
  ]

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Тип документа</h1>
        <Button type='primary' onClick={showModal}>Создать</Button>
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

      <Modal footer={null} title="Создать тип документа" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <Form
            form={form}
            onFinish={createDocumentType}
            autoComplete="off"
          >
            <div>
              <p>Название:</p>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input type="text" onChange={(e) => {
                  setDocument({...document,  label: e.target.value })
                }} placeholder='Название'/>
              </Form.Item>
            </div>
            <Form.Item>
              <div className='flex justify-end mt-5'>
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal footer={null} title="Редактирование типа документа" open={isEditModalOpen} onOk={editHandleOk} onCancel={editHandleCancel}>
        <div className='mt-5'>
          <p>Наименование документа:</p>
          <Input
            value={editedDoc.label}
            onChange={(e) => {
              setEditedDoc({ ...editedDoc, label: e.target.value
            });
            }}
            placeholder='Наименование документа'
          />
        </div>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={editDocumentType}>Редактировать</Button>
        </div>
      </Modal>

      <Modal footer={null}
        open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <div className='flex items-center'>
          <QuestionCircleOutlined
            style={{
              color: 'red',
              fontSize: '24px'
            }}
          /> <p className='ml-3 text-base font-bold'>Вы уверены ?</p>
        </div>
        <p className='mt-5'>Удалить тип документа ?</p>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={deleteDocumentType}>Удалить</Button>
        </div>
      </Modal>

    </div>
  );
}

export default DocumentTypes;

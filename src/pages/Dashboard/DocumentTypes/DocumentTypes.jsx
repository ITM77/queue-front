import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { deleteDocumentTypeAC, editDocumentTypesAC } from '../../../store/reducers/documents'
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
  const documentTypes = useSelector(state => state.documents.documentTypes);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedDocumentTypes, setEditedDocumentTypes] = useState([])
  const [deletedDocument, setDeletedDoc] = useState([])

  const [editedDocumentType, setEditedDocumentType] = useState({
    id: '',
    label: ''
  })

  const [createdDocument, setCreatedDocument] = useState({
    label: '',
    value: Math.random()
  })

  const showEditModal = (item) => {
    setEditedDocumentType({ ...editedDocumentType, label: item.label, id: item.value } )
    setIsEditModalOpen(true);
  };
  const editHandleOk = () => {
    setIsEditModalOpen(false);
  };
  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = (e, deletedItem) => {
    documentTypes.forEach((item, index) => {
      if (item.value === deletedItem.value) {
        editedDocumentTypes.splice(index, 1)
      }
    })

    e.stopPropagation();
    setDeletedDoc(deletedItem)
    setIsDeleteModalOpen(true);
  };
  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteDocumentType = () => {
    dispatch(deleteDocumentTypeAC(editedDocumentTypes))
    dispatch(deleteDocumentTypesApi(deletedDocument.value))
    setIsDeleteModalOpen(false);
  }

  const createDocumentType = () => {
    dispatch(createDocumentTypesApi(createdDocument))
    form.resetFields();
  }

  const editDocumentType = () => {
    documentTypes.forEach((item, index) => {
      if (item.value === editedDocumentType.id) {
        editedDocumentTypes.splice(index, 1,
          {value: item.value, label: editedDocumentType.label, name: item.name})
      }
    })
    dispatch(editDocumentTypesAC(editedDocumentTypes))
    dispatch(editDocumentTypesApi(editedDocumentType.id, { label: editedDocumentType.label }))
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    dispatch(getAllDocTypesApi())
  }, [])

  useEffect(() => {
    setEditedDocumentTypes([...documentTypes])
  }, [documentTypes])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('documentList')}</h1>
      </div>

      <div className='mt-5'>
        <Form
          form={form}
          onFinish={createDocumentType}
          autoComplete="off"
          className='w-full'
        >
          <div className='flex'>
            <div className='w-full'>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input className='w-full' type="text" onChange={(e) => {
                  setCreatedDocument({...createdDocument,  label: e.target.value })
                }} placeholder={t('documentName')}/>
              </Form.Item>
            </div>
            <div className='flex justify-end ml-3'>
              <Button type="primary" htmlType="submit">
                {t('create')}
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <ul className='mt-5 customList'>
        { documentTypes.map((item) =>
          <li key={item.value} role='presentation' className='p-4 cursor-pointer flex justify-between list-disc' onClick={() => showEditModal(item)}>
            <span>{item.label}</span>
            <DeleteOutlined className='deleteBasket' style={{fontSize: '15px'}} onClick={(e) => showDeleteModal(e, item)}/>
          </li>
          )
        }
      </ul>

      <Modal width={700} footer={null} title={t('editDocumentType')} open={isEditModalOpen} onOk={editHandleOk} onCancel={editHandleCancel}>
        <div className='mt-5'>
          <Input
            value={editedDocumentType.label}
            onChange={(e) => {
              setEditedDocumentType({ ...editedDocumentType, label: e.target.value
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

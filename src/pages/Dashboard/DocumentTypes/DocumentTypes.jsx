import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDocumentTypesApi,
  deleteDocumentTypesApi,
  editDocumentTypesApi,
  getAllDocTypesApi,
} from '../../../http/docTypes';

function DocumentTypes() {
  const dispatch = useDispatch();
  const documentTypes = useSelector(state => state.appReducer.documentTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteDoc, setDeleteDoc] = useState('')

  const [edittedDoc, setEdittedDoc] = useState({
    id: '',
    label: ''
  })

  const [document, setDocument] = useState({
    name: '',
    label: '',
    claimTypeId: ''
  })

  const showEditModal = (item) => {
    setEdittedDoc({ ...edittedDoc, label: item.label, id: item.id } )
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
    setDeleteDoc(item)
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
    dispatch(deleteDocumentTypesApi(deleteDoc.id))
    setIsDeleteModalOpen(false);
  }

  const createDocumentType = () => {
    dispatch(createDocumentTypesApi(document))
    setIsModalOpen(false);
  }

  const editDocumentType = () => {
    dispatch(editDocumentTypesApi(edittedDoc.id,{ label: edittedDoc.label }))
    setIsEditModalOpen(false)
  }

  useEffect(() => {
    dispatch(getAllDocTypesApi())
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Label',
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
        <Button onClick={showModal}>Создать</Button>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={documentTypes}
        onRow={(record) => ({
          onClick: () => {showEditModal(record)}
        })}
      />

      <Modal footer={null} title="Создать тип документа" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div>
            <p>Название:</p>
            <Input type="text" onChange={(e) => {
              setDocument({...document,  label: e.target.value })
            }} placeholder='Название'/>
          </div>
          <div className='mt-3'>
            <p>Название поля:</p>
            <Input type="text" onChange={(e) => {
              setDocument({...document,  name: e.target.value })
            }} placeholder='Название поля'/>
          </div>
          <div className='flex justify-end mt-5'>
            <Button type="primary" onClick={createDocumentType}>Создать</Button>
          </div>
        </div>
      </Modal>

      <Modal footer={null} title="Редактирование типа документа" open={isEditModalOpen} onOk={editHandleOk} onCancel={editHandleCancel}>
        <div className='mt-5'>
          <p>Наименование документа:</p>
          <Input
            value={edittedDoc.label}
            onChange={(e) => {
              setEdittedDoc({ ...edittedDoc, label: e.target.value
            });
            }}
            placeholder='Наименование документа'
          />
        </div>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={editDocumentType}>Редактировать</Button>
        </div>
      </Modal>

      <Modal footer={null} title="Вы Уверены ?" open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <p className='mt-5'>Удалить тип документа ?</p>
        <div className='flex justify-end mt-5'>
          <Button type='dashed' onClick={deleteDocumentType}>Удалить</Button>
        </div>
      </Modal>

    </div>
  );
}

export default DocumentTypes;

import React, { useEffect, useRef, useState } from 'react';
import { Divider, Table, Modal, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getClaimsByStateApi, getClaimByIdApi, deleteClaimApi } from '../../../http/claims';

import NewClaim from '../../../components/NewClaim'
import EditClaim from '../../../components/EditClaim'

function Claims() {
  const editRef = useRef()
  const dispatch = useDispatch();
  const [deletedClaim, setDeletedClaim] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const claims = useSelector(state => state.appReducer.claims);

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showDeleteModal = (e, item) => {
    console.log(item)
    e.stopPropagation();
    setDeletedClaim(item.id)
    setIsDeleteModalOpen(true);
  };

  const getApplication = (item) => {
    editRef.current.applicationModalShow()
    dispatch(getClaimByIdApi(item.id))
  }

  const deleteClaim = () => {
    dispatch(deleteClaimApi(deletedClaim))
    setIsDeleteModalOpen(false);
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование компании',
      dataIndex: 'name'
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}>Delete</Button>,
    },
  ];

  useEffect(() => {
    dispatch(getClaimsByStateApi(1))
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Действующие</h1>
        <NewClaim />
      </div>
      <Divider/>
      <Table
        onRow={(record) => ({
          onClick: () => {getApplication(record)}
        })}
        rowKey="id"
        columns={tableColumns}
        dataSource={claims}
      />
      <EditClaim ref={editRef} name='nameEdit' />

      <Modal footer={null} title="Вы Уверены ?" open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <p className='mt-5'>Удалить заявку ?</p>
        <div className='flex justify-end mt-5'>
          <Button type='dashed' onClick={deleteClaim}>Удалить</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Claims;

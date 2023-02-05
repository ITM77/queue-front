import React, { useEffect, useState } from 'react';
import { Divider, Table, Modal, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getClaimsByStateApi, getClaimByIdApi, deleteClaimApi } from '../../../http/claims';

import NewClaim from '../../../components/NewClaim'
import EditClaim from '../../../components/EditClaim'

function Claims() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [deletedClaim, setDeletedClaim] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showClaim, setShowClaim] = useState(false);

  const claims = useSelector(state => state.appReducer.claims);

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };
  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showDeleteModal = (e, item) => {
    e.stopPropagation();
    setDeletedClaim(item.id)
    setIsDeleteModalOpen(true);
  };

  const getApplication = (item) => {
    setShowClaim(true)
    dispatch(getClaimByIdApi(item.id))
  }

  const deleteClaim = () => {
    dispatch(deleteClaimApi(deletedClaim))
    setIsDeleteModalOpen(false);
  }

  const tableColumns = [
    {
      title: t('claimNumber'),
      dataIndex: 'number',
    },
    {
      title: t('company'),
      dataIndex: 'name'
    },
    {
      title: t('createdAt'),
      dataIndex: 'createdAt',
    },
    {
      title: t('expiresAt'),
      dataIndex: 'expiresAt'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}>{t('delete')}</Button>,
    },
  ];

  useEffect(() => {
    dispatch(getClaimsByStateApi(1))
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('current')}</h1>
        { showClaim
          ? <div>
              <Button onClick={ () => setShowClaim(false)}>{t('cancel')}</Button>
            </div>
          : <NewClaim />
        }
      </div>
      <Divider/>
      {showClaim
        ? <EditClaim />
        : <Table
          onRow={(record) => ({
            onClick: () => {getApplication(record)}
          })}
          rowKey="id"
          columns={tableColumns}
          dataSource={claims}
        />
      }
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
          <Button type='primary' onClick={deleteClaim}>{t('delete')}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Claims;

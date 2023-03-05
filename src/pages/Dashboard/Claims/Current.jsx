import React, { useEffect, useState } from 'react';
import { Button, Divider, Modal, Table, Input, DatePicker } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { deleteClaimApi, getClaimsByStateApi } from '../../../http/claims';
import NewClaim from '../../../components/NewClaim';
import { resetClaimsAC } from '../../../store/reducers/claims';

const { RangePicker } = DatePicker;

function Current() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const claims = useSelector(state => state.claims.claims);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedClaim, setDeletedClaim] = useState('')

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteClaim = () => {
    dispatch(deleteClaimApi(deletedClaim))
    setIsDeleteModalOpen(false);
  }

  const getApplication = (item) => {
    navigate(`${item.id}`)
  }

  const showDeleteModal = (e, item) => {
    setIsDeleteModalOpen(true)
    e.stopPropagation();
    setDeletedClaim(item.id)
  };

  const tableColumns = [
    {
      title: t('Claim Number'),
      dataIndex: 'number',
    },
    {
      title: t('Company Name'),
      dataIndex: 'name'
    },
    {
      title: t('Created At'),
      dataIndex: 'createdAt',
    },
    {
      title: t('Expires At'),
      dataIndex: 'expiresAt'
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button className='text-red-500' type='ghost' onClick={(e) => showDeleteModal(e, item)}><DeleteOutlined className='deleteBasket' style={{fontSize: '15px'}}/></Button>,
    },
  ];

  useEffect(() => {
    dispatch(resetClaimsAC())
    dispatch(getClaimsByStateApi(1))
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('Current')}</h1>
        <NewClaim />
      </div>
      <Divider/>
      <div className='my-5 grid grid-cols-5 gap-4'>
        <Input placeholder='По номеру заявки' />
        <Input placeholder='По названию' />
        <RangePicker placeholder={["Дата начала", "Дата окончания"]} className='col-span-2' />
        <Button style={{width: 120}} type='primary'>{t('Search')}</Button>
      </div>
      <Table
        onRow={(record) => ({
          onClick: () => {getApplication(record)}
        })}
        rowKey="id"
        columns={tableColumns}
        dataSource={claims}
      />
      <Modal footer={null} open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <div className='flex items-center'>
          <QuestionCircleOutlined
            style={{
              color: 'red',
              fontSize: '24px'
            }}
          /> <p className='ml-3 text-base font-bold'>{t('Sure')}</p>
        </div>
        <p className='mt-5'>{t('Confirm Delete')}</p>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={deleteClaim}>{t('Delete')}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Current;

import React, { useEffect, useState } from 'react';
import { Divider, Table, Modal, Input, Select, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getClaimsByStateApi } from '../../../http/claims';

function Approved() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const claims = useSelector(state => state.appReducer.claims);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const applicationModalOk = () => {
    setIsApplicationModalOpen(false)
  }
  const applicationModalCancel = () => {
    setIsApplicationModalOpen(false)
  }

  useEffect(() => {
    dispatch(getClaimsByStateApi(2))
  }, [])

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
      title: t('status'),
      dataIndex: 'status',
      render: () => (
        <Tag color='green'>
          {t('approved')}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Одобренные</h1>
      </div>
      <Divider/>
      <Table rowKey='id' columns={tableColumns} dataSource={claims} />

      <Modal title="Информация о заявке" width={550} open={isApplicationModalOpen} onOk={applicationModalOk} onCancel={applicationModalCancel}>
        <div className='mt-2'>
          <p>ID:</p>
          <Input placeholder='ID'/>
        </div>
        <div className='mt-2'>
          <p>Наименование компании:</p>
          <Input placeholder='Наименование компании'/>
        </div>
        <div className='mt-2'>
          <p>Тип заявки:</p>
          <Select className='w-full'
            defaultValue="lucy"
            options={[
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'bem',
                label: 'Bem',
              },
            ]}
          />
        </div>
      </Modal>

    </div>
  );
}

export default Approved;

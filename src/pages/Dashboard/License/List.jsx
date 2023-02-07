import React, { useEffect } from 'react';
import { Divider, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getClaimsByStateApi } from '../../../http/claims';

function List() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const claims = useSelector(state => state.appReducer.claims);

  const getApplication = (item) => {
    navigate(`license/${item.id}`)
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
  ];

  useEffect(() => {
    dispatch(getClaimsByStateApi(1))
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('license')}</h1>
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
    </div>
  );
}

export default List;

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

  const claims = useSelector(state => state.claims.claims);

  const getApplication = (item) => {
    navigate(`${item.id}`)
  }

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
  ];

  useEffect(() => {
    dispatch(getClaimsByStateApi(1))
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('License')}</h1>
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

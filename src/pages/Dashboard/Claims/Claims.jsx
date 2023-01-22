import React, { useEffect, useRef } from 'react';
import { Divider, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getClaimByIdApi, getClaimsApi } from '../../../http/claims';

import NewClaim from '../../../components/NewClaim'
import EditClaim from '../../../components/EditClaim'

function Claims() {
  const editRef = useRef()
  const dispatch = useDispatch();

  const claims = useSelector(state => state.appReducer.claims);

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
  ];

  const getApplication = (item) => {
    editRef.current.applicationModalShow()
    dispatch(getClaimByIdApi(item.id))
  }

  useEffect(() => {
    dispatch(getClaimsApi())
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
        dataSource={claims.data}
      />
      <EditClaim ref={editRef} name='nameEdit' />
    </div>
  );
}

export default Claims;

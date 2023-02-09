import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editClaimTypesApi, getClaimTypeByIdApi } from '../../../http/claimTypes';
import { getAllDocTypesApi } from '../../../http/docTypes';
import { claimTypeAC } from '../../../store/reducers/appReducer'

function EditClaimTypes() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const params = useParams();
  const selectedClaimTypes = useSelector(state => state.appReducer.selectedClaimTypes);
  const documentTypes = useSelector(state => state.appReducer.documentTypes);
  const claimType = useSelector(state => state.appReducer.claimType);
  const [selectedRowKeys, setSelectedRowKeys]  = useState([]);

  const editClaimType = () => {
    dispatch(editClaimTypesApi(claimType.id, { label: claimType.label, documentTypesIds: selectedRowKeys }))
  }

  useEffect(() => {
    dispatch(getAllDocTypesApi(1))
    dispatch(getClaimTypeByIdApi(params.id))
  }, [])

  const columns = [
    {
      title: t('documentList'),
      dataIndex: 'label',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selected) => {
      setSelectedRowKeys(selected)
    },
  };

  useEffect(() => {
    setSelectedRowKeys(selectedClaimTypes)
  }, [selectedClaimTypes])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>
          {t('editClaimType')}
        </h1>
        <Button onClick={ () => navigate('/claimTypes')}>{t('backToList')}</Button>
      </div>
      <Divider />
      <div className='mt-5'>
        <Input
          value={claimType.label}
          onChange={(e) => {
            dispatch(claimTypeAC({ ...claimType, label: e.target.value}));
          }}
          placeholder={t('claimType')}
        />
      </div>
      <div className='mt-5'>
        <Table
          pagination={false}
          rowKey='value'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={documentTypes}
          onRow={(record) => ({
            onClick: () => {setSelectedRowKeys([...selectedRowKeys, record.value])}
          })}
        />
      </div>
      <div className='flex justify-end mt-5'>
        <Button type='primary' onClick={editClaimType}>{t('edit')}</Button>
      </div>
    </div>
  );
}

export default EditClaimTypes;

import React, { useState } from 'react';
import { Button, Divider, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createDocumentTypesApi, getClaimTypesApi } from '../../../http/docTypes';

function DocumentTypes() {
  const dispatch = useDispatch();
  const claimTypes = useSelector(state => state.appReducer.claimTypes);
  const [document, setDocument] = useState({
    name: '',
    label: '',
    claimTypeId: ''
  })

  const getClaimTypes = (value) => {
    dispatch(getClaimTypesApi(value))
  }

  const createDocumentType = () => {
    dispatch(createDocumentTypesApi(document))
  }

  return (
    <div className='w-96'>
      <h1>Тип документа</h1>
      <Divider />
      <div>
        <p>Лицо:</p>
        <Select className='w-full'
          options={[
            {
              value: '1',
              label: 'Физическое лицо',
            },
            {
              value: '2',
              label: 'Юридическое лицо',
            },
          ]}
          onChange={(value) => {
            getClaimTypes(value)
          }}
        />
      </div>
      <div className='mt-3'>
        <p>Тип заявки:</p>
        <Select className='w-full'
          options={claimTypes}
          onChange={(value) => {
            setDocument({...document,  claimTypeId: value })
          }}
        />
      </div>
      <div className='mt-5'>
        <p>Название:</p>
        <Input type="text" onChange={(e) => {
          setDocument({...document,  label: e.target.value })
        }} placeholder='Название'/>
      </div>
      <div className='mt-5'>
        <p>Название поля:</p>
        <Input type="text" onChange={(e) => {
          setDocument({...document,  name: e.target.value })
        }} placeholder='Название поля'/>
      </div>
      <div className='flex justify-end mt-5'>
        <Button type="primary" onClick={createDocumentType}>Создать</Button>
      </div>
    </div>
  );
}

export default DocumentTypes;

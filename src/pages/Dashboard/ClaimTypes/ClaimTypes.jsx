import React from 'react';
import { Divider, Input, Select, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createClaimTypesApi } from '../../../http/docTypes';

function ClaimTypes() {
  const dispatch = useDispatch()
  const claimType = {
    formType: '',
    label: '',
    name: ''
  }

  const createClaimType = () => {
    dispatch(createClaimTypesApi(claimType))
  }
  return (
    <div>
      <h1 className='text-lg'>
        Тип заявки
      </h1>
      <Divider />
      <div className='w-96'>
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
              claimType.formType = value
            }}
          />
        </div>
        <div className='mt-5'>
          <p>Название:</p>
          <Input type="text" onChange={(e) => {
            claimType.label = e.target.value
          }} placeholder='Название'/>
        </div>
        <div className='mt-5'>
          <p>Название поля:</p>
          <Input type="text" onChange={(e) => {
            claimType.name = e.target.value
          }} placeholder='Название поля'/>
        </div>
        <div className='flex justify-end mt-5'>
          <Button type="primary" onClick={createClaimType}>Создать</Button>
        </div>
      </div>
    </div>
  );
}

export default ClaimTypes;

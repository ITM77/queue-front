import React, { useEffect } from 'react';
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getTicketsApi } from '../../http/cabinet';

const columns = [
  {
    title: 'Очередь №',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Дата',
    dataIndex: 'completed_at',
    key: 'completed_at',
  },
];

function Cabinet() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.app.user);
  const completedTickets = useSelector(state => state.cabinet.completedTickets);
  console.log(completedTickets);

  useEffect(() => {
    dispatch(getTicketsApi());
  }, []);

  return (
    <div>
      <h1 className='text-lg'>Кабинет сотрудника</h1>
      <Divider />
      <div className='w-2/4'>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>ФИО</p>
          <p>{user.full_name}</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Контакты</p>
          <p>-</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Должность</p>
          <p>-</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Место работы</p>
          <p>-</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Дата регистрации</p>
          <p>{user?.created_at?.slice(0, 10)}</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Статус</p>
          <p>Активный</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Логин</p>
          <p>ilonmask</p>
        </div>
        <div className='grid grid-cols-2 border-b py-2'>
          <p className='font-semibold'>Почта</p>
          <p>{user.email}</p>
        </div>
      </div>
      <h1 className='text-lg mt-6'>История принятых клиентов</h1>
      <Divider />
      <Table columns={columns} dataSource={completedTickets} bordered />
    </div>
  );
}

export default Cabinet;

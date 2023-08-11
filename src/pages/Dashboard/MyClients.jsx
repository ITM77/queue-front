import React, { useEffect } from 'react';
import { Divider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { acceptTicketApi, doneTicketApi, getTicketsApi, inviteTicketApi } from '../../http/cabinet';

function MyClients() {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.cabinet.tickets);
  const currentTicket = useSelector(state => state.cabinet.currentTicket);
  console.log(tickets);

  const inviteTicket = () => {
    dispatch(inviteTicketApi());
  };

  const acceptTicket = () => {
    dispatch(acceptTicketApi());
  };

  const doneTicket = () => {
    dispatch(doneTicketApi());
  };

  useEffect(() => {
    dispatch(getTicketsApi());
  }, []);

  return (
    <div>
      <h1 className='text-lg'>Мои клиенты</h1>
      <Divider />
      <div className='flex justify-between'>
        <div className='w-4/6'>
          <div className='grid grid-cols-5 border-b pb-2 gap-3'>
            <p className='font-semibold'>Очередь</p>
            <p className='font-semibold'>Тип клиента</p>
            <p className='font-semibold'>Продукт</p>
            <p className='font-semibold'>Под продукт</p>
            <p className='font-semibold'>Статус</p>
          </div>
          <div>
            {tickets.map(item => (
              <div className='grid grid-cols-5 mt-5 text-xs gap-3'>
                <p>{item.number}</p>
                <p>-</p>
                <p>-</p>
                <p>{item.client.phone}</p>
                <p>{item.status.display_name}</p>
              </div>
            ))}
          </div>
          <Divider />
          <div className='mt-5 flex justify-end'>
            {tickets.length > 0 && currentTicket.length < 1 && tickets[0]?.status.name !== 'invited' ? (
              <Button style={{ backgroundColor: '#59b039', color: '#fff' }} onClick={inviteTicket}>
                Пригласить
              </Button>
            ) : null}
          </div>
          <div className='mt-5 flex justify-end'>
            {tickets[0]?.status.name === 'invited' ? (
              <Button disabled style={{ backgroundColor: '#59b039', color: '#fff' }} onClick={inviteTicket}>
                Приглашен
              </Button>
            ) : null}
            <div className='ml-3'>
              {tickets[0]?.status.name === 'invited' ? (
                <Button style={{ backgroundColor: '#59b039', color: '#fff' }} onClick={acceptTicket}>
                  Принять
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className='w-72 bg-slate-100 rounded-lg h-64'>
          <p className='text-center text-3xl py-4'>{currentTicket[0]?.number}</p>
          {currentTicket.length > 0 ? (
            <div className='mt-5 px-5 pb-5'>
              <div className='flex justify-between pb-1'>
                <p className='font-bold'>Дата и время</p>
                <p>{currentTicket[0]?.created_at}</p>
              </div>
              <div className='flex justify-between pb-1'>
                <p className='font-bold'>Тип клиента</p>
                <p>-</p>
              </div>
              <div className='flex justify-between pb-1'>
                <p className='font-bold'>Тип продукта</p>
                <p>-</p>
              </div>
              <div className='flex justify-between pb-1'>
                <p className='font-bold'>Номер телефона</p>
                <p>{currentTicket[0]?.client.phone}</p>
              </div>
            </div>
          ) : null}

          <div className='px-5 flex justify-center mb-5'>
            {currentTicket.length > 0 ? (
              <Button type='primary' onClick={doneTicket}>
                Завершить
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyClients;

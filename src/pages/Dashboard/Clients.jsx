import React, { useEffect, useState } from 'react';
import { Divider, Table, Button, Modal, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsApi, createNewClientApi } from '../../http/clients';

const columns = [
  {
    title: 'ФИО',
    dataIndex: 'full_name',
    key: 'name',
  },
  {
    title: 'Паспорт',
    dataIndex: 'passport',
    key: 'passport',
  },
  {
    title: 'День рождения',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
];

function Clients() {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.app.clients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    surname: '',
    second_name: '',
    passport: '',
    tin: '',
    date_of_birth: '',
    address: '',
    phone: '',
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createNewClient = () => {
    dispatch(createNewClientApi(newClient));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllClientsApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Клиенты</h1>
        <Button type='primary' onClick={() => showModal()}>
          Добавить клиента
        </Button>
      </div>
      <Divider />
      <Table footer={null} columns={columns} dataSource={clients} bordered />
      <Modal footer={null} title='Добавить клиента' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='mt-5'>
          <Input
            placeholder='Имя'
            onChange={e => {
              setNewClient({ ...newClient, name: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            placeholder='Фамилия'
            onChange={e => {
              setNewClient({ ...newClient, surname: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            placeholder='Отчество'
            onChange={e => {
              setNewClient({ ...newClient, second_name: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            placeholder='Номер паспорта'
            onChange={e => {
              setNewClient({ ...newClient, passport: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            placeholder='ИНН'
            onChange={e => {
              setNewClient({ ...newClient, tin: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <DatePicker
            className='w-full'
            placeholder='Дата рождения'
            onChange={(_, date) => {
              setNewClient({ ...newClient, date_of_birth: date });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            placeholder='Адрес'
            onChange={e => {
              setNewClient({ ...newClient, address: e.target.value });
            }}
          />
        </div>
        <div className='mt-5'>
          <Input
            type='number'
            placeholder='Номер телефона'
            onChange={e => {
              setNewClient({ ...newClient, phone: e.target.value });
            }}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='primary' onClick={createNewClient}>
            Создать
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Clients;

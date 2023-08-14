import React, { useEffect, useState } from 'react';
import { Divider, Table, Button, Modal, Input, Select, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersApi } from '../../http/users';
import { getServiceCentersListApi } from '../../http/serviceCenters';
import { getServicesApi } from '../../http/services';

const columns = [
  {
    title: ' ФИО',
    dataIndex: 'full_name',
    key: 'full_name',
  },
  {
    title: 'Филиал',
    dataIndex: 'service_center_id',
    key: 'service_center_id',
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Статус',
    dataIndex: 'is_block',
    key: 'is_block',
    render: item => <Tag color={item === 1 ? 'green' : 'volcano'}>{item === 1 ? 'активный' : 'заблокирован'}</Tag>,
  },
  {
    title: 'Дата регистрации',
    dataIndex: 'created_at',
    key: 'created_at',
  },
];

function AllUsers() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector(state => state.app.users);
  const serviceCenters = useSelector(state => state.app.serviceCenters);
  const services = useSelector(state => state.app.services);

  console.log(serviceCenters);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = value => {
    console.log(value);
  };

  useEffect(() => {
    dispatch(getAllUsersApi());
    dispatch(getServiceCentersListApi());
    dispatch(getServicesApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Все сотрудники</h1>
        <Button type='primary' onClick={() => showModal()}>
          Добавить сотрудника
        </Button>
      </div>
      <Divider />
      <Table columns={columns} dataSource={users} bordered />
      <Modal
        style={{
          top: 20,
        }}
        title='Добавить сотрудника'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='mt-5'>
          <Input placeholder='Имя' />
        </div>
        <div className='mt-5'>
          <Input placeholder='Фамилия' />
        </div>
        <div className='mt-5'>
          <Input placeholder='Почта' />
        </div>
        <div className='mt-5'>
          <Input placeholder='Пароль' />
        </div>
        <div className='mt-5'>
          <Input placeholder='Подтвердите пароль' />
        </div>
        <div className='mt-3'>
          <p className='text-xs mb-1'>Выбор филиала</p>
          <Select placeholder='Выберите' className='w-full' options={serviceCenters} />
        </div>
        <div className='mt-3'>
          <p className='text-xs mb-1'>Доступы</p>
          <Select
            mode='multiple'
            placeholder='Выберите'
            onChange={handleChange}
            style={{ width: '100%' }}
            options={services}
          />
        </div>
        <div className='mt-3'>
          <p className='text-xs mb-1'>Статус</p>
          <Select
            defaultValue='active'
            className='w-full'
            options={[
              {
                value: 'active',
                label: 'Активен',
              },
              {
                value: 'blocked',
                label: 'заблокирован',
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}

export default AllUsers;

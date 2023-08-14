import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Modal, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesApi } from '../../http/services';
import { getServiceCategoriesApi } from '../../http/serviceCategories';
import { createQueueApi } from '../../http/reception';
import { getTicketsApi } from '../../http/cabinet';

const columns = [
  {
    title: 'Номер очереди',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Статус очереди',
    dataIndex: 'status',
    key: 'status',
    render: item => <p>{item.display_name}</p>,
  },
  {
    title: 'Создан',
    dataIndex: 'created_at',
    key: 'created_at',
    render: item => <p>{item.slice(0, 19)}</p>,
  },
];

function Queue() {
  const dispatch = useDispatch();
  const serviceCategories = useSelector(state => state.app.serviceCategories);
  const services = useSelector(state => state.app.services);
  const tickets = useSelector(state => state.cabinet.tickets);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickedCategory, setPickedCategory] = useState([]);
  const [newQueue, setNewQueue] = useState({
    phone: '',
    service_id: '',
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

  const createNewQueue = () => {
    setIsModalOpen(false);
    dispatch(createQueueApi(newQueue));
  };

  const getServices = categoryId => {
    const tempArr = [];
    services.forEach(item => {
      if (item.category_id === categoryId) {
        tempArr.push({ value: item.id, label: item.name });
      }
    });
    setPickedCategory(tempArr);
  };

  useEffect(() => {
    dispatch(getTicketsApi());
    dispatch(getServiceCategoriesApi());
    dispatch(getServicesApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Очередь</h1>
        <Button type='primary' onClick={() => showModal()}>
          Добавить очередь
        </Button>
      </div>
      <Divider />
      <Table columns={columns} dataSource={tickets} bordered />
      <Modal footer={null} title='Добавить очередь' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder='Номер телефона'
          onChange={e => {
            setNewQueue({ ...newQueue, phone: e.target.value });
          }}
        />
        <div className='mt-5'>
          <Select
            style={{
              width: '100%',
            }}
            placeholder='Выберите категорию'
            onChange={e => {
              getServices(e);
            }}
            options={serviceCategories}
          />
        </div>
        <div className='mt-5'>
          <Select
            style={{
              width: '100%',
            }}
            placeholder='Выберите услугу'
            onChange={e => {
              setNewQueue({ ...newQueue, service_id: e });
            }}
            options={pickedCategory}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='primary' onClick={createNewQueue}>
            Добавить очередь
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Queue;

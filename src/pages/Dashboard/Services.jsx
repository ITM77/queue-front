import React, { useState, useEffect } from 'react';
import { Divider, Table, Button, Modal, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesApi, createServiceApi, updateServiceApi, deleteServiceApi } from '../../http/services';
import { getServiceCategoriesApi } from '../../http/serviceCategories';

const columns = [
  {
    title: 'Названия продукта',
    dataIndex: 'name',
    key: 'name',
  },
];

function Services() {
  const dispatch = useDispatch();
  const services = useSelector(state => state.app.services);
  const serviceCategories = useSelector(state => state.app.serviceCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pickedServiceId, setPickedServiceId] = useState();
  const [newService, setNewService] = useState({
    name: '',
    code: 'PK',
    category_id: '',
  });
  const [editedService, setEditedService] = useState({
    name: '',
    code: 'PK',
    service_category_id: '',
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
  const showEditModal = item => {
    setPickedServiceId(item.id);
    setEditedService({ ...editedService, name: item.name, code: 'PK', service_category_id: item.category_id });
    setIsEditModalOpen(true);
  };
  const editHandleOk = () => {
    setIsEditModalOpen(false);
  };
  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };

  const createNewService = () => {
    dispatch(createServiceApi(newService));
    setIsModalOpen(false);
  };
  const editService = () => {
    dispatch(updateServiceApi(pickedServiceId, editedService));
    setIsEditModalOpen(false);
  };
  const deleteService = () => {
    dispatch(deleteServiceApi(pickedServiceId));
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    dispatch(getServiceCategoriesApi());
    dispatch(getServicesApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Продукты</h1>
        <Button type='primary' onClick={() => showModal()}>
          Добавить продукт
        </Button>
      </div>
      <Divider />
      <Table
        bordered
        onRow={item => ({
          onClick: () => {
            showEditModal(item);
          },
        })}
        columns={columns}
        dataSource={services}
      />
      <Modal footer={null} title='Добавить продукт' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder='Название'
          onChange={e => {
            setNewService({ ...newService, name: e.target.value });
          }}
        />
        <div className='mt-5'>
          <Select
            style={{
              width: '100%',
            }}
            placeholder='Выберите категорию'
            onChange={e => {
              console.log(e);
              setNewService({ ...newService, category_id: e });
            }}
            options={serviceCategories}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='primary' onClick={createNewService}>
            Добавить продукт
          </Button>
        </div>
      </Modal>
      <Modal
        footer={null}
        title='Редактировать продукт'
        open={isEditModalOpen}
        onOk={editHandleOk}
        onCancel={editHandleCancel}
      >
        <Input
          value={editedService.name}
          placeholder='Название'
          onChange={e => {
            setEditedService({ ...editedService, name: e.target.value });
          }}
        />
        <div className='mt-5'>
          <Select
            style={{
              width: '100%',
            }}
            placeholder='Выберите категорию'
            onChange={e => {
              setEditedService({ ...editedService, service_category_id: e });
            }}
            options={serviceCategories}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='dashed' danger className='mr-2' onClick={deleteService}>
            Удалить
          </Button>
          <Button type='primary' onClick={editService}>
            Редактировать продукт
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Services;

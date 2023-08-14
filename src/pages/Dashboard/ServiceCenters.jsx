import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createServiceCenterApi,
  deleteServiceCenterApi,
  editServiceCenterApi,
  getServiceCentersListApi,
} from '../../http/serviceCenters';

function ServiceCenters() {
  const dispatch = useDispatch();
  const serviceCenters = useSelector(state => state.app.serviceCenters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedServiceCenterId, setEditedServiceCenterId] = useState();

  const [serviceCenter, setServiceCenter] = useState([
    {
      name: '',
      address: '',
    },
  ]);

  const [editedServiceCenter, setEditedServiceCenter] = useState({
    name: '',
    address: '',
  });

  const showAddModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = item => {
    setEditedServiceCenterId(item.value);
    setEditedServiceCenter({ ...editedServiceCenter, name: item.label, address: item.address });
    setIsEditModalOpen(true);
  };
  const editModalOk = () => {
    setIsEditModalOpen(false);
  };
  const editModalCancel = () => {
    setIsEditModalOpen(false);
  };

  const createServiceCenter = () => {
    dispatch(createServiceCenterApi(serviceCenter));
    setIsModalOpen(false);
  };

  const editServiceCenter = () => {
    dispatch(editServiceCenterApi(editedServiceCenterId, editedServiceCenter));
    setIsEditModalOpen(false);
  };
  const deleteServiceCenter = () => {
    dispatch(deleteServiceCenterApi(editedServiceCenterId));
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    dispatch(getServiceCentersListApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Филиалы - мониторинг</h1>
        <Button type='primary' onClick={() => showAddModal()}>
          Добавить филиал
        </Button>
      </div>
      <Divider />
      <div className='grid grid-cols-3 gap-5'>
        {serviceCenters.map(item => (
          <div
            role='button'
            tabIndex={0}
            className='flex items-center justify-center border h-24 rounded-xl cursor-pointer'
            onClick={() => showEditModal(item)}
          >
            <div className='text-center'>
              <h2 className='font-bold'>{item.label}</h2>
              <p>{item.address}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal footer={null} title='Добавить филиал' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder='Название'
          onChange={e => {
            setServiceCenter({ ...serviceCenter, name: e.target.value });
          }}
        />
        <Input
          placeholder='Адрес филиала'
          className='mt-5'
          onChange={e => {
            setServiceCenter({ ...serviceCenter, address: e.target.value });
          }}
        />
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={createServiceCenter}>
            Добавить
          </Button>
        </div>
      </Modal>
      <Modal
        footer={null}
        title='Редактировать филиал'
        open={isEditModalOpen}
        onOk={editModalOk}
        onCancel={editModalCancel}
      >
        <Input
          value={editedServiceCenter.name}
          placeholder='Название'
          onChange={e => {
            setEditedServiceCenter({ ...editedServiceCenter, name: e.target.value });
          }}
        />
        <Input
          value={editedServiceCenter.address}
          placeholder='Адрес филиала'
          className='mt-5'
          onChange={e => {
            setEditedServiceCenter({ ...editedServiceCenter, address: e.target.value });
          }}
        />
        <div className='flex justify-end mt-5'>
          <Button type='dashed' danger className='mr-2' onClick={deleteServiceCenter}>
            Удалить
          </Button>
          <Button type='primary' onClick={editServiceCenter}>
            Добавить
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ServiceCenters;

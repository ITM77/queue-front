import React, { useEffect, useState } from 'react';
import { Divider, Table, Button, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  createServiceCategoriesApi,
  getServiceCategoriesApi,
  updateServiceCategoriesApi,
  deleteServiceCategoriesApi,
} from '../../http/serviceCategories';

const columns = [
  {
    title: 'Название категории',
    dataIndex: 'label',
    key: 'label',
  },
];

function ServiceCategories() {
  const dispatch = useDispatch();
  const serviceCategories = useSelector(state => state.app.serviceCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pickedServiceCategoryId, setPickedServiceId] = useState();
  const [serviceCategory, setServiceCategory] = useState({
    name: '',
    name_tj: '',
  });
  const [editedServiceCategory, setEditedServiceCategory] = useState({
    name: '',
    name_tj: '',
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
    console.log(item);
    setPickedServiceId(item.value);
    setEditedServiceCategory({ ...editedServiceCategory, name: item.label, name_tj: item.label_tj });
    setIsEditModalOpen(true);
  };
  const editHandleOk = () => {
    setIsEditModalOpen(false);
  };
  const editHandleCancel = () => {
    setIsEditModalOpen(false);
  };

  const editServiceCategory = () => {
    dispatch(updateServiceCategoriesApi(pickedServiceCategoryId, editedServiceCategory));
    setIsEditModalOpen(false);
  };
  const deleteServiceCategory = () => {
    dispatch(deleteServiceCategoriesApi(pickedServiceCategoryId));
    setIsEditModalOpen(false);
  };

  const createServiceCategory = () => {
    dispatch(createServiceCategoriesApi(serviceCategory));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getServiceCategoriesApi());
  }, []);

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Категории</h1>
        <Button type='primary' onClick={() => showModal()}>
          Добавить категорию
        </Button>
      </div>
      <Divider />

        footer={null}
        columns={columns}
        dataSource={serviceCategories}
        onRow={item => ({
          onClick: () => {
            showEditModal(item);
          },
        })}
      />
      <Modal footer={null} title='Добавить категорию' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder='Название'
          onChange={e => {
            setServiceCategory({ ...serviceCategory, name: e.target.value });
          }}
        />
        <div className='mt-5'>
          <Input
            placeholder='Название на таджикском'
            onChange={e => {
              setServiceCategory({ ...serviceCategory, name_tj: e.target.value });
            }}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='primary' onClick={createServiceCategory}>
            Создать
          </Button>
        </div>
      </Modal>
      <Modal
        footer={null}
        title='Редактировать категорию'
        open={isEditModalOpen}
        onOk={editHandleOk}
        onCancel={editHandleCancel}
      >
        <Input
          value={editedServiceCategory.name}
          placeholder='Название'
          onChange={e => {
            setEditedServiceCategory({ ...editedServiceCategory, name: e.target.value });
          }}
        />
        <div className='mt-5'>
          <Input
            value={editedServiceCategory.name_tj}
            placeholder='Название'
            onChange={e => {
              setEditedServiceCategory({ ...editedServiceCategory, name_tj: e.target.value });
            }}
          />
        </div>
        <div className='mt-5 flex justify-end'>
          <Button type='dashed' danger className='mr-2' onClick={deleteServiceCategory}>
            Удалить
          </Button>
          <Button type='primary' onClick={editServiceCategory}>
            Редактировать категорию
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ServiceCategories;

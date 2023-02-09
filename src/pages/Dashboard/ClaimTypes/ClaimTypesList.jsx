import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { createClaimTypesApi, deleteClaimTypesApi, getClaimTypesApi } from '../../../http/claimTypes';
import { deleteClaimTypeAC } from '../../../store/reducers/claimTypes'

function ClaimTypesList() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const claimTypes = useSelector(state => state.claimTypes.claimTypes);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteClaim, setDeleteClaim] = useState('')
  const [editedClaimTypes, setEditedClaimTypes] = useState([])

  const [claimType, setClaimType] = useState({
    formType: '1',
    label: '',
    name: ''
  })

  const showDeleteModal = (e, deletedItem) => {
    claimTypes.forEach((item, index) => {
      if (item.value === deletedItem.value) {
        editedClaimTypes.splice(index, 1)
      }
    })

    e.stopPropagation();
    setDeleteClaim(deletedItem)
    setIsDeleteModalOpen(true);
  };

  const deleteClaimType = () => {
    dispatch(deleteClaimTypesApi(deleteClaim.value))
    dispatch(deleteClaimTypeAC(editedClaimTypes))
    setIsDeleteModalOpen(false);
  }

  const createClaimType = () => {
    dispatch(createClaimTypesApi(claimType))
    form.resetFields();
  }

  const getClaimTypes = (type) => {
    setClaimType({...claimType, formType: type})
    dispatch(getClaimTypesApi(type))
  }

  const editClaim = (item) => {
    navigate(`edit/${item.value}`)
  }

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    dispatch(getClaimTypesApi(claimType.formType))
  }, [])

  useEffect(() => {
    setEditedClaimTypes([...claimTypes])
  }, [claimTypes])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>
          {t('claimTypes')}
        </h1>
        <Select className='w-full mb-5'
          onChange={(value) => {
            getClaimTypes(value)
          }}
          defaultValue="1"
          style={{
            width: '200px',
          }}
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
        />
      </div>
      <div className='flex mt-3'>
        <Form
          className='w-full'
          form={form}
          onFinish={createClaimType}
          autoComplete="off"
        >
          <div className='flex'>
            <div className='w-full'>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Обязательное поле!' }]}
                className="mb-2"
              >
                <Input
                  className='w-full'
                  type="text"
                   onChange={(e) => {
                      setClaimType({...claimType, label: e.target.value})
                    }}
                   placeholder={t('claimTypeName')}
                />
              </Form.Item>
            </div>
            <div className='ml-3'>
              <Button type="primary" htmlType="submit">
                {t('create')}
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <ul className='mt-5 customList'>
        { claimTypes.map((item) =>
          <li key={item.value} role='presentation' className='p-4 cursor-pointer flex justify-between list-disc' onClick={() => editClaim(item)}>
            <span>{item.label}</span>
            <DeleteOutlined className='deleteBasket' style={{fontSize: '15px'}} onClick={(e) => showDeleteModal(e, item)}/>
          </li>
        )
        }
      </ul>

      <Modal footer={null} open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <div className='flex items-center'>
          <QuestionCircleOutlined
            style={{
              color: 'red',
              fontSize: '24px'
            }}
          /> <p className='ml-3 text-base font-bold'>{t('sure')}</p>
        </div>
        <p className='mt-5'>{t('confirmDelete')}</p>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={deleteClaimType}>{t('delete')}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default ClaimTypesList;

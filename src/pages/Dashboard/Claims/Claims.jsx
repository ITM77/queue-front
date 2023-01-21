import React, { useEffect, useState } from 'react';
import { Divider, Button, Table, Modal, Input, Select, Upload, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { newClaimApi, getClaimsApi, getClaimByIdApi, uploadFileApi } from '../../../http/claims'
import { isSpinAC } from '../../../store/reducers/appReducer';

function Claims() {
  const dispatch = useDispatch();
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [form] = Form.useForm();
  const claims = useSelector(state => state.appReducer.claims);
  const claimInfo = useSelector(state => state.appReducer.claimInfo);

  const claim = {
    number: '',
    name: '',
    type: '1',
  }
  const editedClaim = {
    name: claimInfo.name,
    id: claimInfo.id,
    type: claimInfo.type
  }

  const newApplicationModalOpen = () => {
    setIsNewApplicationModalOpen(true);
  };
  const newApplicationModalOk = async () => {
    dispatch(isSpinAC(true))
    dispatch(newClaimApi(claim))
    setIsNewApplicationModalOpen(false)
    form.resetFields();
  }

  const applicationModalCancel = () => {
    setIsApplicationModalOpen(false)
  }
  const newApplicationModalCancel = () => {
    setIsNewApplicationModalOpen(false)
  }

  const getApplication = (item) => {
    dispatch(getClaimByIdApi(item.id))
    setIsApplicationModalOpen(true)
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование компании',
      dataIndex: 'name'
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
    },
  ];

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("type", '1');
    formData.append("document", file);
    dispatch(uploadFileApi(formData))
  }

  const handleChange = (file) => {
    console.log(file);
    uploadFile(file)
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  useEffect(() => {
    dispatch(getClaimsApi())
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Действующие</h1>
        <Button onClick={newApplicationModalOpen}>Новая заявка</Button>
      </div>
      <Divider/>
      <Table
        onRow={(record) => ({
          onClick: () => {getApplication(record)}
        })}
        rowKey="id"
        columns={tableColumns}
        dataSource={claims.data}
      />

      <Modal footer={null} width={550} title="Новая заявка" okText='Создать' cancelText='Отмена' open={isNewApplicationModalOpen} onCancel={newApplicationModalCancel}>
        <Form
          form={form}
          onFinish={newApplicationModalOk}
          autoComplete="off"
        >
          <div>
            <p>ID:</p>
            <Form.Item
              name="id"
              rules={[{ required: true, message: 'Обязательное поле!' }]}
              className="mb-2"
            >
              <Input type="number" onChange={(e) => {
                claim.number = e.target.value
              }} placeholder='ID'/>
            </Form.Item>
          </div>
          <div>
            <p>Наименование компании:</p>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Обязательное поле!' }]}
              className="mb-2"
            >
              <Input onChange={(e) => {
                claim.name = e.target.value
              }} placeholder='Наименование компании'/>
            </Form.Item>
          </div>
          <div>
            <p>Тип заявки:</p>
            <Select className='w-full'
              defaultValue="lucy"
              options={[
                {
                  value: '1',
                  label: 'Lucy',
                },
                {
                  value: '2',
                  label: 'Bem',
                },
              ]}
              onChange={(value) => {
                claim.type = value
              }}
            />
          </div>

          <Form.Item className="mt-5">
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        footer={null}
        style={{
          top: 20,
        }}
       title="Информация о заявке"
       cancelText='Отмена'
        width={550}
       open={isApplicationModalOpen}
       onCancel={applicationModalCancel}
        okText='Сохранить'
      >
        <div>
          <div className='mt-4'>
            <p>ID:</p>
            <Input
              value={editedClaim.id}
              placeholder='ID'
            />
          </div>
          <div className='mt-2'>
            <p>Наименование компании:</p>
            <Input
              value={editedClaim.name}
              onChange={(e) => {
                editedClaim.name = e.target.value;
              }}
              placeholder='Наименование компании'/>
          </div>
          <div className='mt-2'>
            <p>Тип заявки:</p>
            <Select className='w-full'
              defaultValue="lucy" value={editedClaim.type}
              options={[
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'bem',
                  label: 'Bem',
                },
              ]}
            />
          </div>
        </div>
        <div className='mt-5 border p-3'>
          <p className='mb-3 font-bold'>Загрузить файл</p>
          <div>
            <Upload
              customRequest={dummyRequest}
              action={handleChange}
              listType="picture"
              maxCount={1}
              openFileDialogOnClick
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default Claims;

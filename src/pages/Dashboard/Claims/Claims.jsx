import React, { useEffect, useState } from 'react';
import { Divider, Button, Table, Modal, Input, Select, Upload, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { newClaimApi, getClaimsApi, getClaimByIdApi } from '../../../http/claims'
import { isSpinAC } from '../../../store/reducers/appReducer';

function Claims() {
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
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

  const getBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загрузить
      </div>
    </div>
  );

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
          <p className='mb-3 font-bold'>Загрузить паспорт: (До 8 файлов)</p>
          <div className='flex justify-end'>
            <Upload
              accept=".png,.jpeg,.pdf"
                action="http://localhost:3000/"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
              />
            </Modal>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default Claims;

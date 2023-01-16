import React, { useState } from 'react';
import { Divider, Button, Table, Modal, Input, Select, Upload, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { claimsApi } from '../../../http/claims'
import openNotification from '../../../utils/openNotification';
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

  const [tableData, setTableData] = useState([
    {
      id: '1',
      name: 'Microsoft',
      extiration_date: '07-01-2023',
    },
    {
      id: '2',
      name: 'Apple',
      extiration_date: '08-02-2023',
    },
    {
      id: '3',
      name: 'Google',
      extiration_date: '01-04-2023',
    },
  ]);

  const claim = {
    number: '',
    name: '',
    type: '',
  }

  const newApplicationModalOpen = () => {
    setIsNewApplicationModalOpen(true);
  };
  const newApplicationModalOk = async () => {
    try {
      dispatch(isSpinAC(true))
      const response = await claimsApi(claim)
      console.log(response);
      setTableData(arr => [...arr, claim]);
      setIsNewApplicationModalOpen(false)
      form.resetFields();
    } catch (e) {
      openNotification('error', 'Ошибка')
    }
    finally {
      dispatch(isSpinAC(false))
    }

  }
  const newApplicationModalCancel = () => {
    setIsNewApplicationModalOpen(false)
  }

  const applicationModalOk = () => {
    setIsApplicationModalOpen(false)
  }
  const applicationModalCancel = () => {
    setIsApplicationModalOpen(false)
  }
  const getApplication = () => {
    setIsApplicationModalOpen(true)
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Наименование компании',
      dataIndex: 'name',
      render: (item) => (
        <button
          type="button"
          tabIndex={-42}
          onClick={getApplication}
        >
          {item}
        </button>
      ),
    },
    {
      title: 'Срок истечения',
      dataIndex: 'extiration_date',
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

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Действующие</h1>
        <Button onClick={newApplicationModalOpen}>Новая заявка</Button>
      </div>
      <Divider/>
      <Table rowKey="id" columns={tableColumns} dataSource={tableData} />

      <Modal footer={null} width={550} title="Новая заявка" okText='Создать' cancelText='Отмена' open={isNewApplicationModalOpen} onOk={newApplicationModalOk} onCancel={newApplicationModalCancel}>
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
        style={{
          top: 20,
        }}
       title="Информация о заявке"
       cancelText='Отмена'
        width={550}
       open={isApplicationModalOpen}
       onOk={applicationModalOk}
       onCancel={applicationModalCancel}
        okText='Сохранить'
      >
        <div>
          <div className='mt-4'>
            <p>ID:</p>
            <Input placeholder='ID'/>
          </div>
          <div className='mt-2'>
            <p>Наименование компании:</p>
            <Input placeholder='Наименование компании'/>
          </div>
          <div className='mt-2'>
            <p>Тип заявки:</p>
            <Select className='w-full'
              defaultValue="lucy"
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

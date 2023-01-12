import React, { useState } from 'react';
import { Divider, Button, Table, Modal, Input, Select, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

const data = [
  {
    id: '1',
    name: 'Microsoft',
    extiration_date: '07-01-2023',
    key: 1,
  },
  {
    id: '2',
    name: 'Apple',
    extiration_date: '08-02-2023',
    key: 2
  },
  {
    id: '3',
    name: 'Google',
    extiration_date: '01-04-2023',
    key: 3
  },
];

function Claims() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([])
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const newApplicationModalOpen = () => {
    setIsNewApplicationModalOpen(true);
  };
  const newApplicationModalOk = () => {
    setIsNewApplicationModalOpen(false)
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

  const columns = [
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
      <Table columns={columns} dataSource={data} />

      <Modal width={550} title="Новая заявка" okText='Создать' cancelText='Отмена' open={isNewApplicationModalOpen} onOk={newApplicationModalOk} onCancel={newApplicationModalCancel}>
        <div className='mt-2'>
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
        <div className='mt-5 border p-3'>
          <p className='mb-3 font-bold'>Загрузить документ: (До 8 файлов)</p>
          <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
      </Modal>

    </div>
  );
}

export default Claims;

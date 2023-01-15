import React, { useState } from 'react';
import { Divider, Table, Modal, Input, Select, Tag } from 'antd';

const data = [
  {
    id: '1',
    name: 'Microsoft',
    extiration_date: '07-01-2023',
    status: 'Rejected'
  },
  {
    id: '2',
    name: 'Apple',
    extiration_date: '08-02-2023',
    status: 'Rejected'
  },
  {
    id: '3',
    name: 'Google',
    extiration_date: '01-04-2023',
    status: 'Rejected'
  },
];

function Claims() {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

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
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      render: (tag) => (
        <Tag color='volcano' key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>Отклоненные</h1>
      </div>
      <Divider/>
      <Table rowKey="id" columns={columns} dataSource={data} />

      <Modal title="Информация о заявке" width={550} open={isApplicationModalOpen} onOk={applicationModalOk} onCancel={applicationModalCancel}>
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

    </div>
  );
}

export default Claims;

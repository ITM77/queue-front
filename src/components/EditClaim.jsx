import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Input, Modal, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileApi } from '../http/claims';

const EditClaim = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const uploadedFile = useSelector(state => state.appReducer.uploadedFile);
  const claimInfo = useSelector(state => state.appReducer.claimInfo);

  const editedClaim = {
    name: claimInfo.name,
    id: claimInfo.id,
    type: claimInfo.type
  }

  useImperativeHandle(ref, () => ({
      applicationModalShow() {
        setIsApplicationModalOpen(true)
      },
    }), []);

  const applicationModalCancel = () => {
    setIsApplicationModalOpen(false)
  }

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadFile = (file, item) => {
    const formData = new FormData();
    formData.append(item[0].name, file);
    formData.append('claimId', claimInfo.id);
    formData.append('claimTypeId', claimInfo.claimTypeId);
    dispatch(uploadFileApi(formData))
  }

  const handleChange = (file, item) => {
    uploadFile(file, item)
  };

  return (
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
              disabled
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
      { uploadedFile.map((item) => (
        <div className='mt-5 border p-3' key={item[0]?.uid}>
          <p className='mb-3 font-bold'>Загрузить файл ({item[0]?.label})</p>
          <div>
            <Upload
              customRequest={dummyRequest}
              action={(file) => handleChange(file, item)}
              listType="picture"
              maxCount={1}
              fileList={item}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </div>
        </div>
      )) }

    </Modal>
  );
})

export default EditClaim;

import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileApi, editClaimApi } from '../http/claims';

const EditClaim = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const uploads = useSelector(state => state.appReducer.uploads);
  const uploadDocumentTypes = useSelector(state => state.appReducer.uploadDocumentTypes);
  const claimInfo = useSelector(state => state.appReducer.claimInfo);

  const [editedClaim, setEditedClaim] = useState({
    name: claimInfo.name,
    number: claimInfo.number,
    type: claimInfo.claimTypeId
  })

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
    console.log(file)
    console.log(item)
    const formData = new FormData();
    formData.append(item[0].name, file);
    formData.append('claimId', claimInfo.id);
    formData.append('claimTypeId', claimInfo.claimTypeId);
    dispatch(uploadFileApi(formData))
    console.log(formData)
  }

  const handleChange = (file, item) => {
    uploadFile(file, item)
  };

  const editClaim = () => {
    dispatch(editClaimApi(claimInfo.id, {name: editedClaim.name}))
    setIsApplicationModalOpen(false)
  }

  useEffect(() => {
    setEditedClaim({ ...editedClaim, name: claimInfo.name, number: claimInfo.number, type: claimInfo.claimTypeId} )
  }, [claimInfo])

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
          <p>Номер заявки:</p>
          <Input
              disabled
            value={editedClaim.number}
            placeholder='Номер заявки'
          />
        </div>
        <div className='mt-2'>
          <p>Наименование компании:</p>
          <Input
            value={editedClaim.name}
            onChange={(e) => {
              setEditedClaim({ ...editedClaim, name: e.target.value })
            }}
            placeholder='Наименование компании'/>
        </div>
        <div className='mt-2'>
          <p>Тип заявки:</p>
          <Input
            disabled
            value={editedClaim.type}
            placeholder='Тип заявки'
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button type="primary" onClick={editClaim}>
          Редактировать
        </Button>
      </div>
      { uploadDocumentTypes.map((item) => (
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
      { uploads.map((item) => (
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

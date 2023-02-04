import React, { useState, useEffect } from 'react';
import { Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileApi, editClaimApi } from '../http/claims';

function EditClaim () {
  const dispatch = useDispatch();
  const uploads = useSelector(state => state.appReducer.uploads);
  const uploadDocumentTypes = useSelector(state => state.appReducer.uploadDocumentTypes);
  const claimInfo = useSelector(state => state.appReducer.claimInfo);

  console.log(uploads);

  const [editedClaim, setEditedClaim] = useState({
    name: '',
    number: '',
    type: ''
  })

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

  const editClaim = () => {
    dispatch(editClaimApi(claimInfo.id, {name: editedClaim.name}))
  }

  useEffect(() => {
    setEditedClaim({ ...editedClaim, name: claimInfo.name, number: claimInfo.number, type: claimInfo.claimTypeName} )
  }, [claimInfo])

  return (
    <div>
      <div className='grid grid-cols-3 gap-3 items-center'>
        <div>
          <p>Номер заявки:</p>
          <Input
            disabled
            value={editedClaim.number}
            placeholder='Номер заявки'
          />
        </div>
        <div>
          <p>Наименование компании:</p>
          <Input
            value={editedClaim.name}
            onChange={(e) => {
              setEditedClaim({ ...editedClaim, name: e.target.value })
            }}
            placeholder='Наименование компании'/>
        </div>
        <div>
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
      { uploadDocumentTypes.map((item, index) => (
        <div className='mt-5 border p-3' key={item[0]?.uid}>
          <p className='mb-3 font-bold'>Загрузить файл ({item[0]?.label})</p>
          <div>
            <Upload
              customRequest={dummyRequest}
              action={(file) => handleChange(file, item)}
              listType="picture"
              maxCount={1}
              fileList={uploads[index]}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </div>
        </div>
      )) }
    </div>
  );
}

export default EditClaim;

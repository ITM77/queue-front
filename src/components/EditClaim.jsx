import React, { useState, useEffect } from 'react';
import { Button, Input, Upload, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { uploadFileApi, editClaimApi, approveClaimApi, getClaimByIdApi } from '../http/claims';

function EditClaim () {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uploads = useSelector(state => state.appReducer.uploads);
  const uploadDocumentTypes = useSelector(state => state.appReducer.uploadDocumentTypes);
  const claimInfo = useSelector(state => state.appReducer.claimInfo);

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
    dispatch(uploadFileApi(formData, claimInfo.id))
  }

  const handleChange = (file, item) => {
    uploadFile(file, item)
  };

  const editClaim = () => {
    dispatch(editClaimApi(claimInfo.id, {name: editedClaim.name}))
  }

  const approveClaim = () => {
    dispatch(approveClaimApi(claimInfo.id))
  }

  useEffect(() => {
    dispatch(getClaimByIdApi(params.id))
  }, [])

  useEffect(() => {
    setEditedClaim({ ...editedClaim, name: claimInfo.name, number: claimInfo.number, type: claimInfo.claimTypeName} )
  }, [claimInfo])

  return (
    <div>
      <div className='grid grid-cols-3 gap-3 items-center'>
        <div>
          <p>{t('claimNumber')}</p>
          <Input
            disabled
            value={editedClaim.number}
            placeholder={t('claimNumber')}
          />
        </div>
        <div>
          <p>{t('company')}</p>
          <Input
            value={editedClaim.name}
            onChange={(e) => {
              setEditedClaim({ ...editedClaim, name: e.target.value })
            }}
            placeholder={t('company')}/>
        </div>
        <div>
          <p>{t('claimType')}</p>
          <Input
            disabled
            value={editedClaim.type}
            placeholder={t('claimType')}
          />
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button style={{backgroundColor: '#6391af', color: '#fff'}}  onClick={editClaim}>
          {t('edit')}
        </Button>
        <Button type='primary' onClick={approveClaim} className='ml-3'>{t('confirm')}</Button>
      </div>
      <Divider/>
      { uploadDocumentTypes.map((item, index) => (
        <div key={item[0]?.uid}>
          <div>
            <Upload
              className='w-16 h-16'
              customRequest={dummyRequest}
              action={(file) => handleChange(file, item)}
              listType="picture"
              maxCount={1}
              fileList={uploads[index]}
            >
              <div className='items-center mb-3'>
                <p className='text-base mb-3'>{item[0]?.label}</p>
                <Button icon={<UploadOutlined />}>{t('upload')}</Button>
              </div>
            </Upload>
          </div>
          <Divider/>
        </div>
      )) }
    </div>
  );
}

export default EditClaim;

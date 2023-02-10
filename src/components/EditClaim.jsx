import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { uploadFileApi, editClaimApi, approveClaimApi, getClaimByIdApi } from '../http/claims';
// import { editUploadsAC } from '../store/reducers/claims'
import fileIcon from '../assets/images/file.jpg';
import uploadIcon from '../assets/images/uploadIcon.png';

function EditClaim () {
  const filePicker = useRef()
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uploads = useSelector(state => state.claims.uploads);
  const uploadDocumentTypes = useSelector(state => state.claims.uploadDocumentTypes);
  const claimInfo = useSelector(state => state.claims.claimInfo);
  const [selectedDocumentName, setSelectedDocumentName] = useState('')
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState();

  const [editedClaim, setEditedClaim] = useState({
    name: '',
    number: '',
    type: ''
  })

  const editClaim = () => {
    dispatch(editClaimApi(claimInfo.id, {name: editedClaim.name}))
  }

  const customHandleChange = (event) => {
    const formData = new FormData();
    formData.append(selectedDocumentName, event.target.files[0]);
    formData.append('claimId', claimInfo.id);
    formData.append('claimTypeId', claimInfo.claimTypeId);
    dispatch(uploadFileApi(formData, selectedDocumentIndex))
  }

  const handlePick = async (item, index) => {
    setSelectedDocumentIndex(index)
    await setSelectedDocumentName(item[0].name)
    filePicker.current.click()
  }

  const checkFileFormat = (file) => {
    if (file.includes('png') || file.includes('jpg') || file.includes('svg')) {
      return file
    }
    return fileIcon
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
      <div>
        <p>{t('claimType')}</p>
        <Input
          disabled
          value={editedClaim.type}
          placeholder={t('claimType')}
        />
      </div>
      <div className='grid grid-cols-2 gap-3 items-center mt-5'>
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
      </div>

      <div className="flex justify-end mt-5">
        <Button style={{backgroundColor: '#6391af', color: '#fff'}}  onClick={editClaim}>
          {t('edit')}
        </Button>
        <Button type='primary' onClick={approveClaim} className='ml-3'>{t('confirm')}</Button>
      </div>
      <Divider/>

      { uploadDocumentTypes.map((item, index) => (
        <div>
          <h1 className='mb-3 text-base'>{item[0].label}</h1>
          <div className='flex mb-7'>
            <div className='mr-7'>
              <input ref={filePicker} className='hideFileInput' type='file' onChange={customHandleChange} />
              <button className='fileInputButton' type='button' onClick={() => handlePick(item, index)}>
                <div>
                  <span className='font-bold'>Загрузить</span>
                  <div className='flex justify-center mt-1'>
                    <img className='w-6 h-6' src={uploadIcon} alt='' />
                  </div>
                </div>
              </button>
            </div>
            <div className='flex'>
              {uploads[index].map((file) =>
                <div className='mr-7 border rounded-xl p-2' key={file.uid}>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    <img className='cursor-pointer w-16 h-16' src={checkFileFormat(file.url)} alt='' />
                  </a>
                </div>
              )}
            </div>
          </div>
          <Divider/>
        </div>
      )) }

    </div>
  );
}

export default EditClaim;

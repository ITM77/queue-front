import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Divider, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { uploadFileApi, editClaimApi, approveClaimApi, getClaimByIdApi } from '../http/claims';
import fileIcon from '../assets/images/file.jpg';
import uploadIcon from '../assets/images/uploadIcon.png';
import deleteIcon from '../assets/images/deleteIcon.svg'

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const deleteHandleOk = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteHandleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteDocument = () => {
    console.log('deleted');
    setIsDeleteModalOpen(false);
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
        <Input
          disabled
          value={editedClaim.type}
          placeholder={t('Claim Type')}
        />
      </div>
      <div className='grid grid-cols-2 gap-3 items-center mt-5'>
        <div>
          <Input
            disabled
            value={editedClaim.number}
            placeholder={t('Claim Number')}
          />
        </div>
        <div>
          <Input
            value={editedClaim.name}
            onChange={(e) => {
              setEditedClaim({ ...editedClaim, name: e.target.value })
            }}
            placeholder={t('Company Name')}/>
        </div>
      </div>

      <div className="flex mt-7">
        <Button style={{backgroundColor: '#9ba0a3', color: '#fff', border: 'none'}}  onClick={editClaim}>
          {t('Edit')}
        </Button>
        <Button type='primary' onClick={approveClaim} className='ml-3'>{t('Confirm')}</Button>
      </div>
      <Divider/>

      { uploadDocumentTypes.map((item, index) => (
        <div>
          <h1 className='mb-3'>{item[0].label}</h1>
          <div className='flex mb-3'>
            <div className='mr-4'>
              <input ref={filePicker} className='hideFileInput' type='file' onChange={customHandleChange} />
              <button className='fileInputButton' type='button' style={{
                padding: "15px"
              }} onClick={() => handlePick(item, index)}>
                <div>
                  <span>{ t('Upload') }</span>
                  <div className='flex justify-center mt-1'>
                    <img className='w-6 h-6' src={uploadIcon} alt='' />
                  </div>
                </div>
              </button>
            </div>
            <div className='flex'>
              {uploads[index].map((file) =>
                <div className='mr-4 border rounded-xl p-2' key={file.uid} style={{width: '82px', height: '82px'}}>
                  <div className='absolute'>
                    <a href={file.url} target="_blank" rel="noreferrer">
                      <img className='cursor-pointer w-16 h-16' src={checkFileFormat(file.url)} alt='' />
                    </a>
                    <button type='button' onClick={showDeleteModal}>
                      <img className='absolute cursor-pointer' src={deleteIcon} alt='' style={{ top: '-5px', right: '-5px'}}/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Divider/>
        </div>
      )) }

      <Modal footer={null} open={isDeleteModalOpen} onOk={deleteHandleOk} onCancel={deleteHandleCancel}>
        <div className='flex items-center'>
          <QuestionCircleOutlined
            style={{
              color: 'red',
              fontSize: '24px'
            }}
          /> <p className='ml-3 text-base font-bold'>{t('Sure')}</p>
        </div>
        <p className='mt-5'>{t('Confirm Delete')}</p>
        <div className='flex justify-end mt-5'>
          <Button type='primary' onClick={deleteDocument}>{t('Delete')}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default EditClaim;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { getClaimByIdApi } from '../../../http/claims';
import fileIcon from '../../../assets/images/file.jpg'
import { clearDocumentsAC } from '../../../store/reducers/claims'

function License() {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const claimInfo = useSelector(state => state.claims.claimInfo);
  const uploads = useSelector(state => state.claims.uploads);

  const checkFileFormat = (file) => {
    if (file.includes('png') || file.includes('jpg') || file.includes('svg')) {
      return file
    }
    return fileIcon
  }

  useEffect(() => {
    dispatch(getClaimByIdApi(params.id))
    dispatch(clearDocumentsAC())
  }, [])


  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>{t('license')}</h1>
        <Button onClick={ () => navigate('/license')}>{t('backToList')}</Button>
      </div>
      <Divider />
      <div className='grid grid-cols-2 gap-3 items-center'>
        <div>
          <p>{t('claimNumber')}</p>
          <Input
            disabled
            value={claimInfo.number}
            placeholder={t('claimNumber')}
          />
        </div>
        <div>
          <p>{t('company')}</p>
          <Input
            disabled
            value={claimInfo.name}
            placeholder={t('company')}/>
        </div>
      </div>
      <div className='mt-3'>
        <p>{t('claimType')}</p>
        <Input
          disabled
          value={claimInfo.claimTypeName}
          placeholder={t('claimType')}
        />
      </div>
      <Divider/>
      { uploads.map((item) => (
        <div key={item[0]?.uid}>
          <p className='mb-3 text-base'>{item[0]?.title}</p>
          <div className='flex'>
            {item.map((file) =>
              <div className='mr-7 border rounded p-2' key={file.uid}>
                <a href={file.url} target="_blank" rel="noreferrer">
                  <img className='cursor-pointer w-16 h-16' src={checkFileFormat(file.url)} alt='' />
                </a>
              </div>
            )}
          </div>
          <Divider/>
        </div>
      )) }
    </div>
  );
}

export default License;

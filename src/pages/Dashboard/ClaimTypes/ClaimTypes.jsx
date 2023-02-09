import React  from 'react';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import ClaimTypesList from './ClaimTypesList';
import EditClaimTypes from './EditClaimTypes';

function ClaimTypes() {
  const { t } = useTranslation();

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-lg'>
          {t('claimType')}
        </h1>
      </div>
      <Divider />

      <Routes>
        <Route
          element={<ClaimTypesList />}
          path="/"
        />
        <Route
          element={<EditClaimTypes />}
          path="/edit/:id"
        />
      </Routes>
    </div>
  );
}

export default ClaimTypes;

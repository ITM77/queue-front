import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import EditClaim from '../../../components/EditClaim'
import Current from './Current'
import { clearDocumentsAC } from '../../../store/reducers/claims'

function Claims() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearDocumentsAC())
  }, [])

  return (
    <div>
      <Routes>
        <Route
          element={<Current />}
          path="*"
        />
        <Route
          element={<EditClaim />}
          path="/:id"
        />
      </Routes>
    </div>
  );
}

export default Claims;

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EditClaim from '../../../components/EditClaim'
import Current from './Current'

function Claims() {
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

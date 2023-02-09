import React  from 'react';
import { Route, Routes } from 'react-router-dom';
import ClaimTypesList from './ClaimTypesList';
import EditClaimTypes from './EditClaimTypes';

function ClaimTypes() {
  return (
    <div>
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

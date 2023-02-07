import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Claim from '../../../components/Claim';
import List from './List'

function License() {

  return (
    <div>
      <Routes>
        <Route
          element={<List />}
          path="*"
        />
        <Route
          element={<Claim />}
          path="/license/:id"
        />
      </Routes>
    </div>
  );
}

export default License;

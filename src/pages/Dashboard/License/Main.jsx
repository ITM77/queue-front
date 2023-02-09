import React from 'react';
import { Route, Routes } from 'react-router-dom';
import License from './License';
import List from './List'

function Main() {

  return (
    <div>
      <Routes>
        <Route
          element={<List />}
          path="*"
        />
        <Route
          element={<License />}
          path="/:id"
        />
      </Routes>
    </div>
  );
}

export default Main;

import React, { useState } from 'react';

// const hostUrl = '/upload';

function Test() {
  const [selectedFile] = useState(null);
  // const [uploaded, setUploaded] = useState();

  const handleChange = (event) => {
    console.log(event.target.files);
  }
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('please select file!')

    }
  }
  return (
    <div>
      <input onChange={handleChange} type='file' />
      <button type='button' onChange={handleUpload}>Upload</button>
    </div>
  );
}

export default Test;

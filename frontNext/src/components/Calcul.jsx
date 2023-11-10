import React, { useState } from 'react';

const Calcul = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [volume, setVolume] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('model', selectedFile);

      fetch('/api/calculate-volume', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setVolume(data.volume);
        })
        .catch((error) => {
          console.error('Error calculating volume:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" accept=".stl" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {volume && (
        <div>
          <h3>Model Volume:</h3>
          <p>{volume} cm^3</p>
        </div>
      )}
    </div>
  );
};

export default Calcul;


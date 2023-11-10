import React, { useState } from 'react';

export default function ModelUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('stlFile', selectedFile);

    fetch('http://localhost:3000/api/events/upload-stl', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadStatus(data.message);
      })
      .catch((error) => {
        setUploadStatus('Failed to upload file');
        console.error(error);
      });
  };
  const doubledUploadStatus = uploadStatus * 22;
  return (
    <div className="text-center">
      <div className="text-center text-white text-4xl">Узнать стоимость печати ващей модели в формате STL</div>
      <input
        type="file"
        onChange={handleFileChange}

        className="w-full form-control pl-[20px] h-[75px] text-xl font-normal text-gray-700 bg-[#1E1F21] bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-[#1E1F21] focus:border-blue-600 focus:outline-none"
        id="exampleInput7"
      />
                <button onClick={handleUpload} className="w-full h-[50px] laptop:h-[75px] bg-[#26AAE1] text-white font-medium text-lg leading-tight uppercase rounded-full shadow-md hover:bg-[#26AAE1] hover:shadow-lg focus:bg-[#26AAE1] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#26AAE1]active:shadow-lg transition duration-150 ease-in-out mb-6 shadow-2xl shadow-[#0D5675B2] ">РАСЧИТАТЬ СТОИМОСТЬ </button>
      <p className="text-center text-white text-4xl">Обьем {uploadStatus} см куб, стоимость {doubledUploadStatus} рублей</p>
    </div>
  );
}

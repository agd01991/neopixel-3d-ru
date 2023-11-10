import React from 'react';
import Model from './Model';

const TextModel = () => {
  return (
    <div className="flex flex-row h-screen bg-[#1E1F21]">
      <div className="flex flex-col justify-center items-center w-1/2 max-h-200">
        <h1 className="text-white text-4xl">Демонстрационная модель</h1>
      </div>
      <div className="w-1/2">
        <Model />
      </div>
    </div>
  );
};

export default TextModel;
